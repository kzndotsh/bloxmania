#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

class ThemeBuilder {
  constructor() {
    this.devDir = path.join(__dirname, 'dev');
    this.buildDir = path.join(__dirname, 'build');
    this.themeDir = path.join(__dirname, 'theme');
    this.mode = process.argv.includes('--mode=production')
      ? 'production'
      : 'development';
  }

  async build() {
    console.log(`🚀 Building theme from dev/ to theme/ (${this.mode} mode)...`);

    try {
      // Clean theme directory
      await this.cleanThemeDir();

      // Build assets in dev directory
      await this.buildAssets();

      // Copy Shopify theme files
      await this.copyThemeFiles();

      // Copy built assets
      await this.copyBuiltAssets();

      console.log('✅ Theme build completed successfully!');
    } catch (error) {
      console.error('❌ Theme build failed:', error);
      process.exit(1);
    }
  }

  async cleanThemeDir() {
    console.log('🧹 Cleaning theme directory...');
    await fs.emptyDir(this.themeDir);
  }

  async buildAssets() {
    console.log('🔨 Building assets in dev directory...');

    // Build CSS
    console.log('  📝 Building CSS...');
    const cssCommand =
      this.mode === 'production'
        ? 'npm run build:css:prod'
        : 'npm run build:css:dev';
    execSync(cssCommand, { cwd: this.devDir, stdio: 'inherit' });

    // Build JS
    console.log('  📝 Building JavaScript...');
    execSync(`node ./utils/bundler.js --mode=${this.mode}`, {
      cwd: this.devDir,
      stdio: 'inherit',
    });

    // Copy images to build directory
    console.log('  📸 Copying images...');
    const imagesSrc = path.join(this.devDir, 'images');
    const imagesDest = path.join(this.buildDir, 'images');

    if (await fs.pathExists(imagesSrc)) {
      await fs.copy(imagesSrc, imagesDest);
      console.log('  ✅ Images copied to build directory');
    }
  }

  async copyThemeFiles() {
    console.log('📁 Copying Shopify theme files...');

    // Copy Shopify-specific directories
    const shopifyDirs = [
      'sections',
      'snippets',
      'templates',
      'layout',
      'config',
      'locales',
    ];

    for (const dir of shopifyDirs) {
      const srcPath = path.join(this.devDir, dir);
      const destPath = path.join(this.themeDir, dir);

      if (await fs.pathExists(srcPath)) {
        await fs.copy(srcPath, destPath);
        console.log(`  ✅ Copied ${dir}/`);
      }
    }

    // Copy Shopify-specific files
    const shopifyFiles = ['.shopifyignore', 'shopify.env.example'];

    for (const file of shopifyFiles) {
      const srcPath = path.join(this.devDir, file);
      const destPath = path.join(this.themeDir, file);

      if (await fs.pathExists(srcPath)) {
        await fs.copy(srcPath, destPath);
        console.log(`  ✅ Copied ${file}`);
      }
    }
  }

  async copyBuiltAssets() {
    console.log('📦 Copying built assets...');

    // Copy built CSS file
    const cssSrc = path.join(this.buildDir, 'css', 'main.css');
    const cssDest = path.join(this.themeDir, 'assets', 'main.css');

    if (await fs.pathExists(cssSrc)) {
      await fs.copy(cssSrc, cssDest);
      console.log('  ✅ Copied main.css');
    }

    // Copy built JS
    const jsSrc = path.join(this.buildDir, 'js', 'main.js');
    const jsDest = path.join(this.themeDir, 'assets', 'main.js');

    if (await fs.pathExists(jsSrc)) {
      await fs.copy(jsSrc, jsDest);
      console.log('  ✅ Copied JavaScript file');
    }

    // Copy system JavaScript files
    console.log('  📝 Copying system JavaScript files...');
    const systemJsSrc = path.join(this.devDir, 'js', 'system');
    const systemJsDest = path.join(this.themeDir, 'assets');

    if (await fs.pathExists(systemJsSrc)) {
      const systemFiles = await fs.readdir(systemJsSrc);
      for (const file of systemFiles) {
        if (file.endsWith('.js')) {
          const srcPath = path.join(systemJsSrc, file);
          const destPath = path.join(systemJsDest, file);
          await fs.copy(srcPath, destPath);
          console.log(`    ✅ Copied ${file}`);
        }
      }
    }

    // Copy images
    const imagesSrc = path.join(this.buildDir, 'images');
    const imagesDest = path.join(this.themeDir, 'assets');

    if (await fs.pathExists(imagesSrc)) {
      await fs.copy(imagesSrc, imagesDest);
      console.log('  ✅ Copied image files');
    }

    // Copy all other assets from dev/assets
    const assetsSrc = path.join(this.devDir, 'assets');
    const assetsDest = path.join(this.themeDir, 'assets');

    if (await fs.pathExists(assetsSrc)) {
      await fs.copy(assetsSrc, assetsDest);
      console.log('  ✅ Copied all assets');
    }
  }
}

// Run the builder
const builder = new ThemeBuilder();
builder.build().catch(console.error);
