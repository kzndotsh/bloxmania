const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

class CSSOptimizer {
  constructor() {
    this.buildDir = path.join(__dirname, "../../build");
    this.cssDir = path.join(this.buildDir, "css");
    this.srcDir = path.join(__dirname, "../css");
  }

  async extractCriticalCSS() {
    console.log("🎯 Extracting critical CSS...");

    try {
      const cssPath = path.join(this.cssDir, "main.css");
      const criticalPath = path.join(this.cssDir, "critical.css");

      if (!(await fs.pathExists(cssPath))) {
        throw new Error("main.css not found. Run CSS build first.");
      }

      const css = await fs.readFile(cssPath, "utf8");

      // Extract critical CSS rules (above-the-fold styles)
      const criticalCSS = this.extractCriticalRules(css);

      await fs.writeFile(criticalPath, criticalCSS);

      // Create a non-critical CSS file
      const nonCriticalCSS = this.extractNonCriticalRules(css);
      const nonCriticalPath = path.join(this.cssDir, "non-critical.css");
      await fs.writeFile(nonCriticalPath, nonCriticalCSS);

      // Generate optimization report
      await this.generateOptimizationReport(css, criticalCSS, nonCriticalCSS);

      console.log("✅ Critical CSS extracted successfully!");
      console.log(`📊 Critical CSS: ${(criticalCSS.length / 1024).toFixed(2)}KB`);
      console.log(`📊 Non-critical CSS: ${(nonCriticalCSS.length / 1024).toFixed(2)}KB`);
    } catch (error) {
      console.error("❌ Critical CSS extraction failed:", error.message);
    }
  }

  extractCriticalRules(css) {
    const criticalSelectors = [
      // Layout and structure
      "html",
      "body",
      "main",
      "header",
      "nav",
      "footer",
      // Typography
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "a",
      "span",
      // Navigation
      ".nav-link",
      ".nav-item",
      ".navbar",
      ".menu",
      // Hero section
      ".hero",
      ".hero-section",
      ".hero-content",
      ".hero-title",
      // Buttons
      ".btn",
      ".button",
      ".btn-primary",
      ".btn-secondary",
      // Cards
      ".card",
      ".product-card",
      ".card-widget",
      // Forms
      "input",
      "button",
      "select",
      "textarea",
      ".form",
      // Utilities
      ".container",
      ".page-width",
      ".visually-hidden",
      // Custom properties
      ":root",
      '[class*="bg-"]',
      '[class*="text-"]',
      '[class*="p-"]',
      '[class*="m-"]',
    ];

    const criticalRules = [];
    const lines = css.split("\n");
    let inCriticalRule = false;
    let currentRule = "";

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Check if this line contains a critical selector
      const isCritical = criticalSelectors.some(
        (selector) => trimmedLine.includes(selector) && !trimmedLine.startsWith("/*"),
      );

      if (isCritical || inCriticalRule) {
        currentRule += line + "\n";

        if (trimmedLine.includes("}")) {
          inCriticalRule = false;
          criticalRules.push(currentRule);
          currentRule = "";
        } else if (trimmedLine.includes("{")) {
          inCriticalRule = true;
        }
      }
    }

    return criticalRules.join("\n");
  }

  extractNonCriticalRules(css) {
    const criticalCSS = this.extractCriticalRules(css);
    return css.replace(criticalCSS, "");
  }

  async generateOptimizationReport(originalCSS, criticalCSS, nonCriticalCSS) {
    const report = {
      timestamp: new Date().toISOString(),
      originalSize: originalCSS.length,
      criticalSize: criticalCSS.length,
      nonCriticalSize: nonCriticalCSS.length,
      savings: originalCSS.length - criticalCSS.length,
      savingsPercentage: (((originalCSS.length - criticalCSS.length) / originalCSS.length) * 100).toFixed(2),
      recommendations: [],
    };

    // Add recommendations based on analysis
    if (report.savingsPercentage > 50) {
      report.recommendations.push("Consider lazy loading non-critical CSS");
    }

    if (criticalCSS.length > 50 * 1024) {
      // 50KB
      report.recommendations.push("Critical CSS is large, consider further optimization");
    }

    const reportPath = path.join(this.buildDir, "css-optimization-report.json");
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

    console.log("📊 Optimization report generated:", reportPath);
  }

  async optimizeCSS() {
    console.log("⚡ Optimizing CSS...");

    try {
      const cssPath = path.join(this.cssDir, "main.css");
      const optimizedPath = path.join(this.cssDir, "main-optimized.css");

      if (!(await fs.pathExists(cssPath))) {
        throw new Error("main.css not found");
      }

      // Use PostCSS for optimization
      const postcss = require("postcss");
      const cssnano = require("cssnano");
      const autoprefixer = require("autoprefixer");

      const css = await fs.readFile(cssPath, "utf8");

      const result = await postcss([
        autoprefixer,
        cssnano({
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
              normalizeWhitespace: false,
              mergeLonghand: true,
              mergeRules: true,
              minifyFontValues: true,
              minifyGradients: true,
              minifyParams: true,
              minifySelectors: true,
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
              uniqueSelectors: true,
              zindex: true,
            },
          ],
        }),
      ]).process(css, { from: cssPath, to: optimizedPath });

      await fs.writeFile(optimizedPath, result.css);

      const originalSize = css.length;
      const optimizedSize = result.css.length;
      const savings = originalSize - optimizedSize;
      const savingsPercentage = ((savings / originalSize) * 100).toFixed(2);

      console.log(`✅ CSS optimized!`);
      console.log(`📊 Original: ${(originalSize / 1024).toFixed(2)}KB`);
      console.log(`📊 Optimized: ${(optimizedSize / 1024).toFixed(2)}KB`);
      console.log(`📊 Savings: ${(savings / 1024).toFixed(2)}KB (${savingsPercentage}%)`);
    } catch (error) {
      console.error("❌ CSS optimization failed:", error.message);
    }
  }

  async createCSSManifest() {
    console.log("📋 Creating CSS manifest...");

    try {
      const manifest = {
        version: "1.0.0",
        timestamp: new Date().toISOString(),
        files: {
          critical: {
            path: "critical.css",
            inline: true,
            priority: "high",
          },
          main: {
            path: "main.css",
            inline: false,
            priority: "medium",
          },
          nonCritical: {
            path: "non-critical.css",
            inline: false,
            priority: "low",
            load: "lazy",
          },
        },
        optimization: {
          minify: true,
          autoprefixer: true,
          criticalExtraction: true,
        },
      };

      const manifestPath = path.join(this.cssDir, "css-manifest.json");
      await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));

      console.log("✅ CSS manifest created:", manifestPath);
    } catch (error) {
      console.error("❌ CSS manifest creation failed:", error.message);
    }
  }
}

// Export for use in other scripts
module.exports = CSSOptimizer;

// Run if called directly
if (require.main === module) {
  const optimizer = new CSSOptimizer();

  const command = process.argv[2];

  switch (command) {
    case "extract-critical":
      optimizer.extractCriticalCSS();
      break;
    case "optimize":
      optimizer.optimizeCSS();
      break;
    case "manifest":
      optimizer.createCSSManifest();
      break;
    default:
      console.log("Usage: node css-optimizer.js [extract-critical|optimize|manifest]");
  }
}
