#!/usr/bin/env node

/**
 * CSS Bundle Optimizer - Advanced CSS optimization for BloxMania theme
 * Implements CSS purging, compression, critical CSS extraction, and performance optimization
 */

const fs = require('fs-extra');
const path = require('path');
const postcss = require('postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

class CSSBundleOptimizer {
  constructor(options = {}) {
    this.options = {
      inputDir: path.join(__dirname, '../assets'),
      outputDir: path.join(__dirname, '../assets'),
      srcDir: path.join(__dirname, '../src'),
      templatesDir: path.join(__dirname, '../'),
      criticalCSSSize: 50000, // 50KB limit for critical CSS
      enablePurging: process.env.NODE_ENV === 'production',
      enableCompression: process.env.NODE_ENV === 'production',
      enableSourceMaps: process.env.NODE_ENV !== 'production',
      ...options
    };

    this.stats = {
      originalSize: 0,
      optimizedSize: 0,
      criticalCSSSize: 0,
      purgedRules: 0,
      compressionRatio: 0
    };

    this.usedClasses = new Set();
    this.criticalSelectors = [
      // Above-the-fold selectors
      'html', 'body', ':root',
      '.header', '.header-wrapper', '.header__logo', '.header__nav',
      '.hero', '.hero__content', '.hero__title', '.hero__subtitle',
      '.btn', '.btn--primary', '.btn--secondary',
      '.skip-link', '.visually-hidden',
      // Critical layout utilities
      '.container', '.grid', '.flex',
      // Loading states
      '.lazy-loading', '.lazy-loaded',
      // Accessibility
      '*:focus', '[tabindex]'
    ];
  }

  /**
   * Main optimization process
   */
  async optimize() {
    console.log('🎨 Starting CSS Bundle Optimization...\n');

    try {
      // Step 1: Analyze template files for used CSS classes
      await this.analyzeTemplateFiles();

      // Step 2: Process main CSS file
      await this.processMainCSS();

      // Step 3: Extract and optimize critical CSS
      await this.extractCriticalCSS();

      // Step 4: Optimize component CSS files
      await this.optimizeComponentCSS();

      // Step 5: Generate performance report
      this.generateReport();

      console.log('✅ CSS Bundle Optimization completed successfully!\n');
    } catch (error) {
      console.error('❌ CSS Bundle Optimization failed:', error);
      process.exit(1);
    }
  }

  /**
   * Analyze template files to find used CSS classes
   */
  async analyzeTemplateFiles() {
    console.log('📊 Analyzing template files for used CSS classes...');

    const templateExtensions = ['.liquid', '.js'];
    const templateDirs = ['layout', 'sections', 'snippets', 'templates', 'assets'];

    for (const dir of templateDirs) {
      const dirPath = path.join(this.options.templatesDir, dir);
      if (await fs.pathExists(dirPath)) {
        await this.scanDirectory(dirPath, templateExtensions);
      }
    }

    console.log(`   Found ${this.usedClasses.size} used CSS classes\n`);
  }

  /**
   * Recursively scan directory for template files
   */
  async scanDirectory(dirPath, extensions) {
    const files = await fs.readdir(dirPath);

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        await this.scanDirectory(filePath, extensions);
      } else if (extensions.some(ext => file.endsWith(ext))) {
        await this.extractClassesFromFile(filePath);
      }
    }
  }

  /**
   * Extract CSS classes from template file
   */
  async extractClassesFromFile(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    
    // Match class attributes and JavaScript class manipulations
    const classPatterns = [
      /class\s*=\s*["']([^"']+)["']/g, // HTML class attributes
      /className\s*=\s*["']([^"']+)["']/g, // React className
      /classList\.add\(['"]([^'"]+)['"]\)/g, // JavaScript classList.add
      /classList\.remove\(['"]([^'"]+)['"]\)/g, // JavaScript classList.remove
      /classList\.toggle\(['"]([^'"]+)['"]\)/g, // JavaScript classList.toggle
      /\.classList\.contains\(['"]([^'"]+)['"]\)/g, // JavaScript classList.contains
      /querySelector\(['"]\.([^'"]+)['"]\)/g, // querySelector with class
      /querySelectorAll\(['"]\.([^'"]+)['"]\)/g, // querySelectorAll with class
    ];

    classPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const classString = match[1];
        // Split multiple classes and clean them
        classString.split(/\s+/).forEach(className => {
          const cleanClass = className.trim();
          if (cleanClass && !cleanClass.includes('{') && !cleanClass.includes('}')) {
            this.usedClasses.add(cleanClass);
          }
        });
      }
    });

    // Also look for Tailwind-style utility classes in template logic
    const tailwindPattern = /['"]((?:hover:|focus:|active:|sm:|md:|lg:|xl:|2xl:)?[a-z-]+(?:-[a-z0-9]+)*)['"]/g;
    let match;
    while ((match = tailwindPattern.exec(content)) !== null) {
      const className = match[1];
      if (this.isTailwindClass(className)) {
        this.usedClasses.add(className);
      }
    }
  }

  /**
   * Check if a class name looks like a Tailwind utility class
   */
  isTailwindClass(className) {
    const tailwindPrefixes = [
      'bg-', 'text-', 'border-', 'p-', 'm-', 'px-', 'py-', 'mx-', 'my-',
      'w-', 'h-', 'min-', 'max-', 'flex', 'grid', 'block', 'inline',
      'absolute', 'relative', 'fixed', 'sticky', 'top-', 'bottom-', 'left-', 'right-',
      'z-', 'opacity-', 'shadow-', 'rounded-', 'font-', 'leading-', 'tracking-',
      'hover:', 'focus:', 'active:', 'sm:', 'md:', 'lg:', 'xl:', '2xl:'
    ];

    return tailwindPrefixes.some(prefix => className.startsWith(prefix)) ||
           /^[a-z-]+-(xs|sm|md|lg|xl|2xl|\d+)$/.test(className);
  }

  /**
   * Process main CSS file with optimization
   */
  async processMainCSS() {
    console.log('🔧 Processing main CSS file...');

    const inputFile = path.join(this.options.inputDir, 'base.css');
    const outputFile = path.join(this.options.outputDir, 'base.css');

    if (!(await fs.pathExists(inputFile))) {
      console.log('   ⚠️  base.css not found, skipping main CSS processing');
      return;
    }

    const originalCSS = await fs.readFile(inputFile, 'utf8');
    this.stats.originalSize += Buffer.byteLength(originalCSS, 'utf8');

    let optimizedCSS = originalCSS;

    // Apply CSS purging if enabled
    if (this.options.enablePurging) {
      optimizedCSS = await this.purgeUnusedCSS(optimizedCSS);
    }

    // Apply compression if enabled
    if (this.options.enableCompression) {
      optimizedCSS = await this.compressCSS(optimizedCSS);
    }

    this.stats.optimizedSize += Buffer.byteLength(optimizedCSS, 'utf8');

    await fs.writeFile(outputFile, optimizedCSS);
    console.log(`   ✅ Processed base.css (${this.formatBytes(Buffer.byteLength(optimizedCSS, 'utf8'))})\n`);
  }

  /**
   * Extract and optimize critical CSS
   */
  async extractCriticalCSS() {
    console.log('⚡ Extracting critical CSS...');

    const inputFile = path.join(this.options.inputDir, 'base.css');
    
    if (!(await fs.pathExists(inputFile))) {
      console.log('   ⚠️  base.css not found, skipping critical CSS extraction');
      return;
    }

    const css = await fs.readFile(inputFile, 'utf8');
    const criticalCSS = await this.extractCriticalRules(css);

    // Write critical CSS to separate file for analysis
    const criticalFile = path.join(this.options.outputDir, 'critical.css');
    await fs.writeFile(criticalFile, criticalCSS);

    this.stats.criticalCSSSize = Buffer.byteLength(criticalCSS, 'utf8');

    console.log(`   ✅ Extracted critical CSS (${this.formatBytes(this.stats.criticalCSSSize)})`);
    
    if (this.stats.criticalCSSSize > this.options.criticalCSSSize) {
      console.log(`   ⚠️  Critical CSS size exceeds recommended limit of ${this.formatBytes(this.options.criticalCSSSize)}`);
    }
    
    console.log('');
  }

  /**
   * Extract critical CSS rules based on selectors
   */
  async extractCriticalRules(css) {
    const root = postcss.parse(css);
    const criticalRules = [];

    root.walkRules(rule => {
      const selector = rule.selector;
      
      // Check if rule matches critical selectors
      const isCritical = this.criticalSelectors.some(criticalSelector => {
        if (criticalSelector.includes('*')) {
          // Handle wildcard selectors
          const pattern = criticalSelector.replace('*', '.*');
          return new RegExp(pattern).test(selector);
        }
        return selector.includes(criticalSelector);
      });

      // Also include media queries for responsive critical styles
      const isResponsiveCritical = rule.parent && 
        rule.parent.type === 'atrule' && 
        rule.parent.name === 'media' &&
        (rule.parent.params.includes('max-width: 767px') || 
         rule.parent.params.includes('prefers-reduced-motion') ||
         rule.parent.params.includes('prefers-contrast'));

      if (isCritical || isResponsiveCritical) {
        criticalRules.push(rule.toString());
      }
    });

    // Include critical @font-face and @keyframes rules
    root.walkAtRules(rule => {
      if (rule.name === 'font-face' || 
          (rule.name === 'keyframes' && this.isCriticalKeyframe(rule.params))) {
        criticalRules.push(rule.toString());
      }
    });

    return criticalRules.join('\n');
  }

  /**
   * Check if keyframe animation is critical
   */
  isCriticalKeyframe(name) {
    const criticalAnimations = ['fadeInUp', 'slideInLeft', 'slideInRight', 'float'];
    return criticalAnimations.includes(name);
  }

  /**
   * Optimize component CSS files
   */
  async optimizeComponentCSS() {
    console.log('🧩 Optimizing component CSS files...');

    const componentFiles = await this.findComponentCSSFiles();

    for (const file of componentFiles) {
      await this.optimizeComponentFile(file);
    }

    console.log(`   ✅ Optimized ${componentFiles.length} component CSS files\n`);
  }

  /**
   * Find all component CSS files
   */
  async findComponentCSSFiles() {
    const files = await fs.readdir(this.options.inputDir);
    return files.filter(file => 
      file.startsWith('component-') && 
      file.endsWith('.css') &&
      file !== 'component-critical.css'
    );
  }

  /**
   * Optimize individual component CSS file
   */
  async optimizeComponentFile(filename) {
    const inputFile = path.join(this.options.inputDir, filename);
    const css = await fs.readFile(inputFile, 'utf8');

    let optimizedCSS = css;

    // Apply purging if enabled
    if (this.options.enablePurging) {
      optimizedCSS = await this.purgeUnusedCSS(optimizedCSS);
    }

    // Apply compression if enabled
    if (this.options.enableCompression) {
      optimizedCSS = await this.compressCSS(optimizedCSS);
    }

    await fs.writeFile(inputFile, optimizedCSS);
  }

  /**
   * Purge unused CSS rules
   */
  async purgeUnusedCSS(css) {
    const root = postcss.parse(css);
    let purgedRules = 0;

    root.walkRules(rule => {
      const selector = rule.selector;
      
      // Don't purge critical selectors
      const isCritical = this.criticalSelectors.some(criticalSelector => 
        selector.includes(criticalSelector)
      );

      if (isCritical) {
        return; // Keep critical rules
      }

      // Check if any class in the selector is used
      const classMatches = selector.match(/\.[a-zA-Z0-9_-]+/g);
      if (classMatches) {
        const hasUsedClass = classMatches.some(classMatch => {
          const className = classMatch.substring(1); // Remove the dot
          return this.usedClasses.has(className);
        });

        if (!hasUsedClass) {
          rule.remove();
          purgedRules++;
        }
      }
    });

    this.stats.purgedRules += purgedRules;
    return root.toString();
  }

  /**
   * Compress CSS using cssnano
   */
  async compressCSS(css) {
    const result = await postcss([
      autoprefixer(),
      cssnano({
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
          mergeLonghand: true,
          mergeRules: true,
          minifySelectors: true,
          minifyParams: true,
          minifyFontValues: true,
          colormin: true,
          convertValues: true,
          discardDuplicates: true,
          discardEmpty: true,
          discardOverridden: true,
          discardUnused: true,
          normalizeCharset: true,
          normalizeDisplayValues: true,
          normalizePositions: true,
          normalizeRepeatStyle: true,
          normalizeString: true,
          normalizeTimingFunctions: true,
          normalizeUnicode: true,
          normalizeUrl: true,
          orderedValues: true,
          reduceIdents: true,
          reduceInitial: true,
          reduceTransforms: true,
          svgo: true,
          uniqueSelectors: true
        }]
      })
    ]).process(css, { from: undefined });

    return result.css;
  }

  /**
   * Generate optimization report
   */
  generateReport() {
    this.stats.compressionRatio = this.stats.originalSize > 0 
      ? ((this.stats.originalSize - this.stats.optimizedSize) / this.stats.originalSize * 100)
      : 0;

    console.log('📊 CSS Bundle Optimization Report');
    console.log('=====================================');
    console.log(`Original Size:      ${this.formatBytes(this.stats.originalSize)}`);
    console.log(`Optimized Size:     ${this.formatBytes(this.stats.optimizedSize)}`);
    console.log(`Critical CSS Size:  ${this.formatBytes(this.stats.criticalCSSSize)}`);
    console.log(`Compression Ratio:  ${this.stats.compressionRatio.toFixed(1)}%`);
    console.log(`Purged Rules:       ${this.stats.purgedRules}`);
    console.log(`Used CSS Classes:   ${this.usedClasses.size}`);
    console.log('=====================================\n');

    // Write detailed report to file
    this.writeDetailedReport();
  }

  /**
   * Write detailed optimization report to file
   */
  async writeDetailedReport() {
    const report = {
      timestamp: new Date().toISOString(),
      stats: this.stats,
      usedClassesCount: this.usedClasses.size,
      usedClasses: Array.from(this.usedClasses).sort(),
      criticalSelectors: this.criticalSelectors,
      recommendations: this.generateRecommendations()
    };

    const reportFile = path.join(this.options.outputDir, 'css-optimization-report.json');
    await fs.writeJson(reportFile, report, { spaces: 2 });
    
    console.log(`📄 Detailed report saved to: ${reportFile}`);
  }

  /**
   * Generate optimization recommendations
   */
  generateRecommendations() {
    const recommendations = [];

    if (this.stats.criticalCSSSize > this.options.criticalCSSSize) {
      recommendations.push({
        type: 'warning',
        message: `Critical CSS size (${this.formatBytes(this.stats.criticalCSSSize)}) exceeds recommended limit of ${this.formatBytes(this.options.criticalCSSSize)}`,
        suggestion: 'Consider reducing critical CSS by moving non-essential styles to deferred CSS files'
      });
    }

    if (this.stats.compressionRatio < 30) {
      recommendations.push({
        type: 'info',
        message: `Compression ratio is ${this.stats.compressionRatio.toFixed(1)}%`,
        suggestion: 'Consider enabling additional CSS optimization techniques'
      });
    }

    if (this.usedClasses.size < 100) {
      recommendations.push({
        type: 'warning',
        message: `Only ${this.usedClasses.size} CSS classes detected`,
        suggestion: 'Verify that all template files are being scanned correctly'
      });
    }

    if (this.stats.purgedRules > 1000) {
      recommendations.push({
        type: 'success',
        message: `Successfully purged ${this.stats.purgedRules} unused CSS rules`,
        suggestion: 'Great! CSS purging is working effectively'
      });
    }

    return recommendations;
  }

  /**
   * Format bytes to human readable format
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// CLI execution
if (require.main === module) {
  const optimizer = new CSSBundleOptimizer();
  optimizer.optimize().catch(console.error);
}

module.exports = CSSBundleOptimizer;