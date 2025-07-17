#!/usr/bin/env node

/**
 * Component CSS Build System
 * Following Dawn theme patterns for component-specific CSS loading
 */

const fs = require('fs-extra');
const path = require('path');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const chokidar = require('chokidar');

const isProduction = process.env.NODE_ENV === 'production';
const isWatch = process.argv.includes('--watch');

// Paths
const srcDir = path.join(__dirname, '../src/components');
const assetsDir = path.join(__dirname, '../assets');

// PostCSS processor
const processor = postcss([
  tailwindcss({
    config: path.join(__dirname, '../tailwind.config.js'),
  }),
  autoprefixer(),
  ...(isProduction ? [cssnano({
    preset: ['default', {
      discardComments: { removeAll: true },
      normalizeWhitespace: false,
    }],
  })] : []),
]);

/**
 * Build a single component CSS file
 */
async function buildComponent(filePath) {
  try {
    const fileName = path.basename(filePath, '.css');
    const outputPath = path.join(assetsDir, `component-${fileName}.css`);
    
    console.log(`Building component: ${fileName}`);
    
    const css = await fs.readFile(filePath, 'utf8');
    const result = await processor.process(css, {
      from: filePath,
      to: outputPath,
    });
    
    await fs.writeFile(outputPath, result.css);
    
    if (result.map) {
      await fs.writeFile(`${outputPath}.map`, result.map.toString());
    }
    
    console.log(`✓ Built component-${fileName}.css`);
  } catch (error) {
    console.error(`Error building ${filePath}:`, error);
  }
}

/**
 * Build all component CSS files
 */
async function buildAllComponents() {
  try {
    // Ensure directories exist
    await fs.ensureDir(srcDir);
    await fs.ensureDir(assetsDir);
    
    // Get all CSS files in components directory
    const files = await fs.readdir(srcDir);
    const cssFiles = files.filter(file => file.endsWith('.css'));
    
    if (cssFiles.length === 0) {
      console.log('No component CSS files found in src/components/');
      return;
    }
    
    console.log(`Building ${cssFiles.length} component(s)...`);
    
    // Build each component
    for (const file of cssFiles) {
      const filePath = path.join(srcDir, file);
      await buildComponent(filePath);
    }
    
    console.log('✓ All components built successfully');
  } catch (error) {
    console.error('Error building components:', error);
    process.exit(1);
  }
}

/**
 * Watch for changes and rebuild
 */
function watchComponents() {
  console.log('Watching for component changes...');
  
  const watcher = chokidar.watch(path.join(srcDir, '*.css'), {
    ignored: /node_modules/,
    persistent: true,
  });
  
  watcher
    .on('add', buildComponent)
    .on('change', buildComponent)
    .on('unlink', async (filePath) => {
      const fileName = path.basename(filePath, '.css');
      const outputPath = path.join(assetsDir, `component-${fileName}.css`);
      
      try {
        await fs.remove(outputPath);
        await fs.remove(`${outputPath}.map`);
        console.log(`✓ Removed component-${fileName}.css`);
      } catch (error) {
        console.error(`Error removing ${outputPath}:`, error);
      }
    });
  
  watcher.on('ready', () => {
    console.log('Component watcher ready');
  });
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\nShutting down component watcher...');
    watcher.close();
    process.exit(0);
  });
}

// Main execution
async function main() {
  if (isWatch) {
    await buildAllComponents();
    watchComponents();
  } else {
    await buildAllComponents();
  }
}

main().catch(console.error);