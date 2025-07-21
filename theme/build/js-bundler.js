#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

class JSBundler {
  constructor() {
    this.assetsDir = path.join(__dirname, '../assets');
    this.buildDir = path.join(__dirname, '../build');
    this.bundles = {
      core: [
        'core-constants.js',
        'core-dom.js',
        'core-api.js',
        'core-global.js',
        'core-init.js',
      ],
      features: [
        'feature-cart.js',
        'feature-product.js',
        'feature-search.js',
        'feature-collection.js',
        'feature-customer.js',
        'feature-gallery.js',
      ],
      ui: [
        'ui-cart-notification.js',
        'ui-quantity.js',
        'ui-header.js',
        'ui-modal.js',
        'ui-search-modal.js',
      ],
      helpers: [
        'helper-section-id.js',
        'helper-html-update.js',
        'helper-screen-reader.js',
        'helper-accessibility.js',
        'helper-keyboard.js',
      ],
      system: [
        'system-dawn.js',
        'system-service-worker.js',
        'system-performance.js',
        'system-theme-editor.js',
        'system-web-components.js',
      ],
    };
  }

  async bundle() {
    const mode = process.argv.includes('--mode=production')
      ? 'production'
      : 'development';
    const watch = process.argv.includes('--watch');

    console.log(`🚀 Starting JS bundling in ${mode} mode...`);

    // Create build directory if it doesn't exist
    await fs.ensureDir(this.buildDir);

    // Bundle each group
    for (const [bundleName, files] of Object.entries(this.bundles)) {
      await this.createBundle(bundleName, files, mode);
    }

    // Create a main bundle that imports all others
    await this.createMainBundle(mode);

    console.log('✅ JavaScript bundling completed!');

    if (watch) {
      console.log('👀 Watching for changes...');
      this.watchFiles();
    }
  }

  async createBundle(bundleName, files, mode) {
    const bundleContent = [];
    const bundleHeader = this.getBundleHeader(bundleName, mode);

    bundleContent.push(bundleHeader);

    for (const file of files) {
      const filePath = path.join(this.assetsDir, file);

      if (await fs.pathExists(filePath)) {
        const content = await fs.readFile(filePath, 'utf8');
        bundleContent.push(`\n// ${file}\n${content}\n`);
      } else {
        console.warn(`⚠️  Warning: ${file} not found`);
      }
    }

    const bundleFooter = this.getBundleFooter(bundleName, mode);
    bundleContent.push(bundleFooter);

    const outputPath = path.join(this.assetsDir, `${bundleName}.bundle.js`);
    await fs.writeFile(outputPath, bundleContent.join('\n'));

    console.log(`📦 Created ${bundleName}.bundle.js`);

    // Minify in production mode
    if (mode === 'production') {
      await this.minifyBundle(outputPath);
    }
  }

  async createMainBundle(mode) {
    const mainContent = [
      this.getBundleHeader('main', mode),
      '// Main application bundle',
      '// This file loads all other bundles',
      '',
      '// Load bundles sequentially for better performance',
      'var loadBundle = function(src) {',
      '  return new Promise(function(resolve, reject) {',
      '    var script = document.createElement("script");',
      '    script.src = src;',
      '    script.onload = resolve;',
      '    script.onerror = reject;',
      '    document.head.appendChild(script);',
      '  });',
      '};',
      '',
      '// Load all bundles',
      'Promise.all([',
      ...Object.keys(this.bundles).map(
        (bundleName, index) =>
          `  loadBundle("${bundleName}.bundle.js")${
            index < Object.keys(this.bundles).length - 1 ? ',' : ''
          }`
      ),
      ']).then(function() {',
      '  console.log("🚀 BloxMania theme loaded successfully!");',
      '}).catch(function(error) {',
      '  console.error("Failed to load theme bundles:", error);',
      '});',
      '',
      this.getBundleFooter('main', mode),
    ];

    const outputPath = path.join(this.assetsDir, 'main.bundle.js');
    await fs.writeFile(outputPath, mainContent.join('\n'));

    console.log('📦 Created main.bundle.js');

    if (mode === 'production') {
      await this.minifyBundle(outputPath);
    }
  }

  getBundleHeader(bundleName, mode) {
    return [
      `/*`,
      ` * BloxMania Theme - ${bundleName.toUpperCase()} Bundle`,
      ` * Generated: ${new Date().toISOString()}`,
      ` * Mode: ${mode}`,
      ` */`,
      '',
      `(function() {`,
      `  'use strict';`,
      '',
      `  // Bundle: ${bundleName}`,
      `  const BUNDLE_NAME = '${bundleName}';`,
      `  const BUNDLE_VERSION = '1.0.0';`,
      '',
      `  // Bundle initialization`,
      `  if (window.BloxMania && window.BloxMania.bundles) {`,
      `    window.BloxMania.bundles[BUNDLE_NAME] = {`,
      `      version: BUNDLE_VERSION,`,
      `      loaded: true,`,
      `      timestamp: Date.now()`,
      `    };`,
      `  }`,
      '',
    ].join('\n');
  }

  getBundleFooter(bundleName, mode) {
    return [
      '',
      `  // Bundle completion`,
      `  if (window.BloxMania && window.BloxMania.bundles && window.BloxMania.bundles[BUNDLE_NAME]) {`,
      `    window.BloxMania.bundles[BUNDLE_NAME].initialized = true;`,
      `  }`,
      '',
      `  console.log(\`✅ \${BUNDLE_NAME} bundle loaded\`);`,
      `})();`,
    ].join('\n');
  }

  async minifyBundle(filePath) {
    try {
      // Use terser for minification if available
      const terserPath = path.join(__dirname, '../../node_modules/.bin/terser');

      if (await fs.pathExists(terserPath)) {
        const outputPath = filePath.replace('.js', '.min.js');
        const command = `${terserPath} ${filePath} --compress --mangle --output ${outputPath}`;

        execSync(command, { stdio: 'pipe' });

        // Replace original with minified version
        await fs.move(outputPath, filePath, { overwrite: true });
        console.log(`🔧 Minified ${path.basename(filePath)}`);
      } else {
        console.log(
          `⚠️  Terser not found, skipping minification for ${path.basename(
            filePath
          )}`
        );
      }
    } catch (error) {
      console.warn(
        `⚠️  Minification failed for ${path.basename(filePath)}:`,
        error.message
      );
    }
  }

  watchFiles() {
    const chokidar = require('chokidar');

    const watcher = chokidar.watch(
      [
        path.join(this.assetsDir, '*.js'),
        '!' + path.join(this.assetsDir, '*.bundle.js'),
        '!' + path.join(this.assetsDir, '*.min.js'),
      ],
      {
        ignored: /(^|[\/\\])\../,
        persistent: true,
      }
    );

    watcher.on('change', (filePath) => {
      console.log(`🔄 File changed: ${path.basename(filePath)}`);
      this.bundle();
    });

    watcher.on('error', (error) => {
      console.error('❌ Watcher error:', error);
    });
  }
}

// Run the bundler
const bundler = new JSBundler();
bundler.bundle().catch(console.error);
