module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,  // Enable for better compression
          discardDuplicates: true,     // Remove duplicate CSS rules
          mergeRules: true,            // Merge adjacent rules
          minifySelectors: true,       // Optimize selectors
          reduceInitial: true,         // Use initial values where possible
          colormin: true,              // Minimize color values
          convertValues: true,         // Convert values to shorter equivalents
        }],
      },
    }),
  },
};
