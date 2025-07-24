import type { KnipConfig } from 'knip';
import { glob } from 'glob';
import path from 'path';

const config = async (): Promise<KnipConfig> => {
  // Dynamically find entry files based on common patterns
  const entryPatterns = [
    'dev/utils/*.js',
    'dev/js/core/*.js',
    'dev/js/helpers/*.js',
    'dev/js/features/*.js',
    'dev/js/ui/*.js',
    'dev/js/system/*.js',
    'dev/assets/*.js'
  ];

  // Collect all potential entry files
  const entryFiles: string[] = [];
  
  for (const pattern of entryPatterns) {
    try {
      const files = await glob(pattern, { ignore: ['node_modules/**'] });
      entryFiles.push(...files);
    } catch {
      // Pattern is invalid or directory doesn't exist
    }
  }

  // Filter out non-existent files and sort for consistency
  const existingEntryFiles = entryFiles
    .filter(file => {
      try {
        return require('fs').existsSync(file);
      } catch {
        return false;
      }
    })
    .sort();

  // Dynamically determine project files
  const projectPatterns = [
    'dev/**/*.{js,css,liquid,json}',
    'build/**/*.{js,css,liquid,json}',
    'theme/**/*.{js,css,liquid,json}'
  ];

  // Check which directories actually exist and contain files
  const validProjectPatterns: string[] = [];
  
  for (const pattern of projectPatterns) {
    try {
      const files = await glob(pattern, { 
        ignore: ['node_modules/**', '.git/**', '.vscode/**'],
        absolute: false
      });
      if (files.length > 0) {
        validProjectPatterns.push(pattern);
      }
    } catch {
      // Pattern is invalid or directory doesn't exist
    }
  }



  return {
    entry: existingEntryFiles,
    project: validProjectPatterns,
    ignoreDependencies: [
      'css-tree' // Only keep the one that's actually used
    ],
    ignoreBinaries: [],
    rules: {
      files: 'error',
      dependencies: 'warn',
      devDependencies: 'warn',
      exports: 'warn',
      types: 'warn',
      binaries: 'warn'
    }
  };
};

export default config; 