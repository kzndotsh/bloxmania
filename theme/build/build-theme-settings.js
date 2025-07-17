#!/usr/bin/env node

/**
 * Theme Settings CSS Builder
 * Generates CSS custom properties from Shopify theme settings
 * Following Dawn's pattern of settings integration
 */

const fs = require('fs-extra');
const path = require('path');

const srcFile = path.join(__dirname, '../src/theme-settings.css');
const outputFile = path.join(__dirname, '../snippets/theme-settings-css.liquid');

/**
 * Convert CSS file to Liquid snippet
 */
async function buildThemeSettingsCSS() {
  try {
    console.log('Building theme settings CSS...');
    
    // Read the source CSS file
    const cssContent = await fs.readFile(srcFile, 'utf8');
    
    // Wrap in style tags for Liquid snippet
    const liquidContent = `{%- comment -%}
  Theme Settings CSS Integration
  Generated from src/theme-settings.css
  This snippet provides CSS custom properties based on theme settings
{%- endcomment -%}

<style>
${cssContent}
</style>`;
    
    // Ensure snippets directory exists
    await fs.ensureDir(path.dirname(outputFile));
    
    // Write the Liquid snippet
    await fs.writeFile(outputFile, liquidContent);
    
    console.log('✓ Built theme-settings-css.liquid snippet');
  } catch (error) {
    console.error('Error building theme settings CSS:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  buildThemeSettingsCSS();
}

module.exports = { buildThemeSettingsCSS };