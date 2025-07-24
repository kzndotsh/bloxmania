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
    this.isBuilding = false;
    this.buildTimeout = null;
    this.lastBuildTime = 0;
    this.minBuildInterval = this.mode === 'development' ? 200 : 5000; // Fast for dev
    this.fileHashes = new Map(); // Track file changes
  }

  async build() {
    const now = Date.now();
    
    // Prevent builds if one is already in progress
    if (this.isBuilding) {
      console.log('⏳ Build already in progress, skipping...');
      return;
    }

    // Enforce minimum interval between builds (much shorter for dev)
    if (now - this.lastBuildTime < this.minBuildInterval) {
      console.log('⏳ Build throttled - waiting for minimum interval...');
      return;
    }

    // Clear any pending build timeout
    if (this.buildTimeout) {
      clearTimeout(this.buildTimeout);
    }

    // Much shorter delay for development
    if (this.mode === 'development') {
      this.buildTimeout = setTimeout(() => {
        this.performBuild();
      }, 100); // Fast development mode
      return;
    }

    // Production builds run immediately
    await this.performBuild();
  }

  async performBuild() {
    this.isBuilding = true;
    this.lastBuildTime = Date.now();
    console.log(`🚀 Building theme from dev/ to theme/ (${this.mode} mode)...`);

    try {
      if (this.mode === 'development') {
        // Fast development build - direct copy with minimal processing
        await this.fastDevBuild();
      } else {
        // Full production build with optimization
        await this.fullProductionBuild();
      }

      console.log('✅ Theme build completed successfully!');
    } catch (error) {
      console.error('❌ Theme build failed:', error);
      // Don't exit process in development mode to keep server running
      if (this.mode === 'production') {
        process.exit(1);
      }
    } finally {
      this.isBuilding = false;
    }
  }



  async fastDevBuild() {
    console.log('⚡ Fast development build...');

    // Ensure theme directory exists
    await fs.ensureDir(this.themeDir);

    // Copy Shopify theme files directly (no processing)
    await this.copyThemeFiles();

    // Build CSS directly to theme directory
    console.log('  📝 Building CSS directly to theme...');
    const cssCommand = 'npm run build:css:dev';
    execSync(cssCommand, { cwd: this.devDir, stdio: 'inherit' });

    // Copy built CSS directly to theme
    const cssSrc = path.join(this.buildDir, 'css', 'main.css');
    const cssDest = path.join(this.themeDir, 'assets', 'main.css');
    if (await fs.pathExists(cssSrc)) {
      await fs.copy(cssSrc, cssDest);
      console.log('  ✅ CSS copied to theme');
    }

    // Build JS directly to theme directory
    console.log('  📝 Building JavaScript directly to theme...');
    execSync(`node ./utils/bundler.js --mode=development`, {
      cwd: this.devDir,
      stdio: 'inherit',
    });

    // Copy built JS directly to theme
    const jsSrc = path.join(this.buildDir, 'js', 'main.js');
    const jsDest = path.join(this.themeDir, 'assets', 'main.js');
    if (await fs.pathExists(jsSrc)) {
      await fs.copy(jsSrc, jsDest);
      console.log('  ✅ JavaScript copied to theme');
    }

    // Copy system JS files
    await this.copySystemFiles();

    // Copy images and assets
    await this.copyAssets();
  }

  async fullProductionBuild() {
    console.log('🏭 Full production build...');

    // Clean theme directory
    await this.cleanThemeDir();

    // Build assets in dev directory
    await this.buildAssets();

    // Copy Shopify theme files
    await this.copyThemeFiles();

    // Copy built assets
    await this.copyBuiltAssets();
  }

  async cleanThemeDir() {
    console.log('🧹 Cleaning theme directory...');
    
    // Don't delete the theme directory if it doesn't exist
    if (!(await fs.pathExists(this.themeDir))) {
      console.log('  📁 Theme directory does not exist, creating...');
      await fs.ensureDir(this.themeDir);
      return;
    }
    
    // Get list of files to preserve
    const preserveFiles = [
      'layout/theme.liquid',
      'config/settings_schema.json',
      'config/settings_data.json'
    ];
    
    // Create backup of essential files
    const backupDir = path.join(__dirname, '.theme-backup');
    await fs.ensureDir(backupDir);
    
    for (const file of preserveFiles) {
      const filePath = path.join(this.themeDir, file);
      const backupPath = path.join(backupDir, file);
      
      if (await fs.pathExists(filePath)) {
        await fs.copy(filePath, backupPath);
        console.log(`  💾 Backed up ${file}`);
      }
    }
    
    // Clean the theme directory
    await fs.emptyDir(this.themeDir);
    
    // Restore essential files
    for (const file of preserveFiles) {
      const backupPath = path.join(backupDir, file);
      const filePath = path.join(this.themeDir, file);
      
      if (await fs.pathExists(backupPath)) {
        await fs.copy(backupPath, filePath);
        console.log(`  🔄 Restored ${file}`);
      }
    }
    
    // Clean up backup
    await fs.remove(backupDir);
  }

  async buildAssets() {
    console.log('🔨 Building assets in dev directory...');

    // Build CSS
    console.log('  📝 Building CSS...');
    const cssCommand = 'npm run build:css:prod';
    execSync(cssCommand, { cwd: this.devDir, stdio: 'inherit' });

    // Build JS
    console.log('  📝 Building JavaScript...');
    execSync(`node ./utils/bundler.js --mode=production`, {
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

  async copySystemFiles() {
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
  }

  async copyAssets() {
    console.log('  📦 Copying assets...');

    // Copy images
    const imagesSrc = path.join(this.devDir, 'images');
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
    await this.copySystemFiles();

    // Copy images
    const imagesSrc = path.join(this.buildDir, 'images');
    const imagesDest = path.join(this.themeDir, 'assets');

    if (await fs.pathExists(imagesSrc)) {
      await fs.copy(imagesSrc, imagesDest);
      console.log('  ✅ Copied image files');
    }

    // Copy all other assets from dev/assets
    await this.copyAssets();
  }
}

// Run the builder
const builder = new ThemeBuilder();
builder.build().catch(console.error);
