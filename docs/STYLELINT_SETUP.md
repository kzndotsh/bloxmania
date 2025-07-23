# Stylelint Setup for BloxMania Shopify Theme

## Overview

Stylelint has been configured for the BloxMania Shopify theme to ensure consistent CSS code quality while accommodating the specific needs of Shopify themes, BEM methodology, and Tailwind CSS.

## Installation

Stylelint was installed using the official init tool:

```bash
npm init stylelint
```

This automatically installed:
- `stylelint`
- `stylelint-config-standard`

## Configuration

The configuration is located in `.stylelintrc.json` and has been customized to work with:

### Shopify Theme Requirements
- BEM methodology class naming
- Liquid template integration
- Shopify-specific patterns

### Tailwind CSS Support
- `@tailwind` directives
- Utility classes
- Custom properties
- Responsive variants

### Disabled Rules

The following rules have been disabled to accommodate the theme's specific needs:

#### Class and Selector Patterns
- `selector-class-pattern`: Allows BEM notation and Tailwind utility classes
- `selector-no-vendor-prefix`: Allows vendor-prefixed selectors for browser compatibility
- `no-duplicate-selectors`: Allows duplicate selectors (common in large CSS files)

#### Color and Value Notation
- `color-function-notation`: Allows both `rgb()` and `rgba()` functions
- `alpha-value-notation`: Allows decimal alpha values (0.5) and percentage values (50%)
- `color-hex-length`: Allows both short (#fff) and long (#ffffff) hex values
- `color-function-alias-notation`: Allows `rgba()` function usage

#### Layout and Spacing
- `shorthand-property-no-redundant-values`: Allows redundant values in shorthand properties
- `length-zero-no-unit`: Allows units on zero values
- `custom-property-empty-line-before`: Allows custom properties without empty lines
- `declaration-empty-line-before`: Allows declarations without empty lines
- `rule-empty-line-before`: Allows rules without empty lines

#### Vendor Prefixes
- `property-no-vendor-prefix`: Allows vendor-prefixed properties
- `at-rule-no-vendor-prefix`: Allows vendor-prefixed at-rules
- `value-no-vendor-prefix`: Allows vendor-prefixed values

#### Specificity and Structure
- `no-descending-specificity`: Allows descending specificity (common in component-based CSS)
- `declaration-block-no-redundant-longhand-properties`: Allows redundant longhand properties
- `declaration-block-no-duplicate-properties`: Allows duplicate properties

#### Media and Animation
- `media-feature-range-notation`: Allows various media feature notations
- `media-feature-name-value-no-unknown`: Allows unknown media feature values
- `keyframes-name-pattern`: Allows camelCase animation names

#### Tailwind CSS
- `at-rule-no-unknown`: Allows Tailwind directives (`@tailwind`, `@apply`, etc.)
- `declaration-block-no-duplicate-custom-properties`: Allows duplicate custom properties (Tailwind generates these)

#### Other
- `comment-empty-line-before`: Allows comments without empty lines
- `number-max-precision`: Allows high precision decimal values

## Usage

### Basic Linting

```bash
# Lint all CSS files
npm run lint:css

# Or use npx directly
npx stylelint "**/*.css"
```

### Auto-fix Issues

```bash
# Fix automatically fixable issues
npm run lint:css:fix

# Or use npx directly
npx stylelint "**/*.css" --fix
```

### Performance Optimized Linting

```bash
# Use caching for faster subsequent runs
npm run lint:css:cache

# Profile rule performance (shows top 10 slowest rules)
npm run lint:css:performance

# Or use npx directly
TIMING=10 npx stylelint "**/*.css"
```

### Different Output Formats

```bash
# Verbose output with detailed information
npm run lint:css:verbose

# JSON output for programmatic processing
npm run lint:css:json

# Generate a text report
npm run lint:css:report
```

### Lint Specific Directories

```bash
# Lint only development files
npm run lint:css:dev

# Lint only theme files
npm run lint:css:theme

# Or use npx directly
npx stylelint "dev/**/*.css"
npx stylelint "theme/**/*.css"
```

### Advanced CLI Examples

```bash
# Lint specific file types
npx stylelint "**/*.{css,scss}"

# Exclude certain directories
npx stylelint "**/*.css" "!**/node_modules/**" "!**/build/**"

# Use custom config file
npx stylelint "**/*.css" --config custom-stylelint.json

# Print configuration for a specific file
npx stylelint "dev/css/styles.css" --print-config

# Lint stdin input
echo "a { color: pink; }" | npx stylelint

# Generate performance report
TIMING=all npx stylelint "**/*.css"

# Use specific formatter
npx stylelint "**/*.css" --formatter compact

# Set maximum warnings
npx stylelint "**/*.css" --max-warnings 10
```

## Integration with Development Workflow

### Pre-commit Hooks

Consider adding Stylelint to your pre-commit hooks:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint:css"
    }
  }
}
```

### VS Code Integration

Install the Stylelint extension for VS Code:

1. Install the "Stylelint" extension by Stylelint
2. Add to your VS Code settings:

```json
{
  "stylelint.validate": ["css"],
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false
}
```

### CI/CD Integration

Add Stylelint to your CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
- name: Lint CSS
  run: npm run lint:css
```

## File Structure

### Ignored Files and Directories

The configuration uses both `.stylelintignore` and the `ignoreFiles` option in `.stylelintrc.json` to exclude files from linting:

#### `.stylelintignore` File
- `node_modules/` - Dependencies
- `build/`, `dist/` - Build outputs
- `*.min.css` - Minified files
- `theme/assets/main.css` - Generated theme files
- `.stylelintcache` - Cache files
- IDE and OS generated files
- Log files and temporary directories

#### Configuration `ignoreFiles`
- `**/node_modules/**`
- `**/dist/**`
- `**/build/**`

### Project Structure
```
bloxmania/
├── .stylelintrc.json          # Stylelint configuration
├── .stylelintignore           # Ignore patterns
├── dev/
│   └── css/
│       └── styles.css         # Main source CSS
├── theme/
│   └── assets/
│       └── main.css           # Generated CSS (ignored)
└── package.json               # NPM scripts
```

## Best Practices

### For This Project

1. **Use BEM methodology** for custom components
2. **Use Tailwind utility classes** for common styling
3. **Maintain vendor prefixes** for browser compatibility
4. **Use descriptive animation names** (camelCase is allowed)
5. **Keep color functions consistent** within components

### General CSS Guidelines

1. **Organize CSS logically** (base → components → utilities)
2. **Use meaningful class names**
3. **Comment complex CSS rules**
4. **Test across different browsers**
5. **Optimize for performance**

## Available Formatters

Stylelint provides several built-in formatters for different output styles:

### Formatter Options
- `compact` - Compact output (default)
- `json` - JSON format for programmatic processing
- `string` - String format
- `unix` - Unix format
- `verbose` - Verbose output with detailed information

### Usage Examples
```bash
# Compact output (default)
npx stylelint "**/*.css"

# Verbose output
npx stylelint "**/*.css" --formatter verbose

# JSON output
npx stylelint "**/*.css" --formatter json

# Custom formatter
npx stylelint "**/*.css" --custom-formatter ./my-formatter.js
```

## Exit Codes

Stylelint uses the following exit codes:
- `0` - Success (no linting errors)
- `1` - Fatal error
- `2` - Lint problem found
- `64` - Invalid CLI usage
- `78` - Invalid configuration file

### Usage in Scripts
```bash
# Check if linting passed
if npx stylelint "**/*.css"; then
  echo "CSS linting passed"
else
  echo "CSS linting failed"
  exit 1
fi
```

## Troubleshooting

### Common Issues

1. **"Unexpected unknown at-rule"**: Add the at-rule to the `ignoreAtRules` array
2. **"Unexpected vendor-prefixed"**: Disable vendor prefix rules if needed for browser support
3. **"Unexpected duplicate selector"**: This is often intentional in large CSS files
4. **"No files matching the pattern"**: Check your glob patterns and `.stylelintignore` file

### Performance Optimization

For large CSS files, consider:
- Using the `--cache` flag for faster subsequent runs
- Running Stylelint only on changed files
- Excluding generated files from linting
- Using performance profiling with `TIMING=10`

### Debugging Configuration

```bash
# Print configuration for a specific file
npx stylelint "dev/css/styles.css" --print-config

# Validate configuration
npx stylelint "dev/css/styles.css" --validate

# Check which files are being processed
npx stylelint "**/*.css" --formatter verbose
```

## Resources

- [Stylelint Documentation](https://stylelint.io/)
- [Stylelint Rules](https://stylelint.io/user-guide/rules/)
- [BEM Methodology](http://getbem.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shopify Theme Development](https://shopify.dev/themes)

## Configuration File

The complete configuration can be found in `.stylelintrc.json`:

```json
{
  "extends": ["stylelint-config-standard"],
  "rules": {
    "selector-class-pattern": null,
    "color-function-notation": null,
    "alpha-value-notation": null,
    "shorthand-property-no-redundant-values": null,
    "no-descending-specificity": null,
    "property-no-vendor-prefix": null,
    "length-zero-no-unit": null,
    "custom-property-empty-line-before": null,
    "declaration-empty-line-before": null,
    "media-feature-range-notation": null,
    "no-duplicate-selectors": null,
    "color-function-alias-notation": null,
    "color-hex-length": null,
    "keyframes-name-pattern": null,
    "selector-no-vendor-prefix": null,
    "media-feature-name-value-no-unknown": null,
    "comment-empty-line-before": null,
    "declaration-block-no-redundant-longhand-properties": null,
    "declaration-block-no-duplicate-properties": null,
    "at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": ["tailwind", "apply", "variants", "responsive", "screen"]
      }
    ],
    "at-rule-no-vendor-prefix": null,
    "value-no-vendor-prefix": null,
    "value-keyword-case": null,
    "number-max-precision": null,
    "declaration-block-no-duplicate-custom-properties": null,
    "rule-empty-line-before": null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        "ignorePseudoClasses": ["global"]
      }
    ],
    "selector-pseudo-element-no-unknown": [
      true,
      {
        "ignorePseudoElements": ["v-deep", "v-global", "v-slotted"]
      }
    ]
  },
  "ignoreFiles": ["**/node_modules/**", "**/dist/**", "**/build/**"]
}
``` 