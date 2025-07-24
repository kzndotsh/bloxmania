#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const { minify } = require("terser");

class SimpleBundler {
  constructor() {
    this.srcDir = path.join(__dirname, "../js");
    this.assetsDir = path.join(__dirname, "../../build");
    this.mode = process.argv.includes("--mode=production") ? "production" : "development";
  }

  async bundle() {
    console.log(`🚀 Creating single JavaScript bundle (${this.mode} mode)...`);

    try {
      // Collect all JavaScript files
      const files = await this.collectFiles();

      // Combine all files
      const combined = await this.combineFiles(files);

      // Minify if production
      const final = this.mode === "production" ? await this.minify(combined) : combined;

      // Write to assets
      await this.writeBundle(final);

      console.log("✅ Single JavaScript bundle created successfully!");
    } catch (error) {
      console.error("❌ Bundle creation failed:", error);
      process.exit(1);
    }
  }

  async collectFiles() {
    const files = [];

    // Core files (load first)
    const coreFiles = [
      "core/constants.js",
      "core/pubsub.js",
      "core/dom.js",
      "core/api.js",
      "core/global.js",
      "core/init.js",
    ];

    // Helper files
    const helperFiles = [
      "helpers/section-id.js",
      "helpers/html-update.js",
      "helpers/accessibility.js",
      "helpers/keyboard.js",
    ];

    // Feature files
    const featureFiles = [
      "features/cart.js",
      "features/product.js",
      "features/search.js",
      "features/collection.js",
      "features/customer.js",
      "features/gallery.js",
      "features/quick-add.js",
      "features/mobile-menu.js",
    ];

    // UI files
    const uiFiles = [
      "ui/cart-notification.js",
      "ui/quantity.js",
      "ui/modal.js",
      "ui/header.js",
      "ui/header-search-manager.js",
    ];

    // System files
    const systemFiles = [
      "system/system-performance.js",
      "system/system-theme-editor.js",
      "system/system-web-components.js",
    ];

    // Combine all files in order
    const allFiles = [...coreFiles, ...helperFiles, ...featureFiles, ...uiFiles, ...systemFiles];

    for (const file of allFiles) {
      const filePath = path.join(this.srcDir, file);
      if (await fs.pathExists(filePath)) {
        files.push({ path: filePath, name: file });
      } else {
        console.warn(`⚠️  Warning: ${file} not found`);
      }
    }

    return files;
  }

  async combineFiles(files) {
    const bundle = [];

    // Bundle header
    bundle.push(`/*
 * BloxMania Theme - Single JavaScript Bundle
 * Generated: ${new Date().toISOString()}
 * Mode: ${this.mode}
 */`);

    bundle.push("(function() {");
    bundle.push("  'use strict';");
    bundle.push("");

    // Add each file
    for (const file of files) {
      const content = await fs.readFile(file.path, "utf8");

      bundle.push(`  // ${file.name}`);
      bundle.push(content);
      bundle.push("");
    }

    // Bundle footer
    bundle.push('  console.log("✅ BloxMania theme JavaScript loaded");');
    bundle.push("})();");

    return bundle.join("\n");
  }

  async minify(code) {
    try {
      const result = await minify(code, {
        compress: {
          drop_console: false,
          drop_debugger: true,
        },
        mangle: {
          toplevel: false,
        },
      });

      return result.code;
    } catch (error) {
      console.warn("⚠️  Minification failed, using unminified code:", error.message);
      return code;
    }
  }

  async writeBundle(content) {
    const jsDir = path.join(this.assetsDir, "js");
    await fs.ensureDir(jsDir);
    const outputPath = path.join(jsDir, "main.js");
    await fs.writeFile(outputPath, content);
    console.log(`📦 Bundle written to: ${outputPath}`);
  }
}

// Run the bundler
const bundler = new SimpleBundler();
bundler.bundle().catch(console.error);
