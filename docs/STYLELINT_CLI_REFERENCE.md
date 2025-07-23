# Stylelint CLI Quick Reference

## Basic Commands

```bash
# Lint all CSS files
stylelint "**/*.css"

# Lint with auto-fix
stylelint "**/*.css" --fix

# Lint specific directories
stylelint "dev/**/*.css"
stylelint "theme/**/*.css"
```

## Performance Options

```bash
# Use caching for faster runs
stylelint "**/*.css" --cache

# Profile rule performance
TIMING=10 stylelint "**/*.css"
TIMING=all stylelint "**/*.css"

# Custom cache location
stylelint "**/*.css" --cache --cache-location "/path/to/cache"
```

## Output Formats

```bash
# Compact output (default)
stylelint "**/*.css"

# Verbose output
stylelint "**/*.css" --formatter verbose

# JSON output
stylelint "**/*.css" --formatter json

# Unix format
stylelint "**/*.css" --formatter unix

# String format
stylelint "**/*.css" --formatter string
```

## File Management

```bash
# Exclude patterns
stylelint "**/*.css" "!**/node_modules/**" "!**/build/**"

# Multiple file types
stylelint "**/*.{css,scss,sass}"

# Use custom ignore file
stylelint "**/*.css" --ignore-path .customignore

# Disable default ignores
stylelint "**/*.css" --disable-default-ignores
```

## Configuration

```bash
# Use custom config file
stylelint "**/*.css" --config custom-stylelint.json

# Print config for a file
stylelint "dev/css/styles.css" --print-config

# Validate configuration
stylelint "**/*.css" --validate

# Custom syntax
stylelint "**/*.css" --custom-syntax path/to/syntax.js
```

## Reporting

```bash
# Generate report file
stylelint "**/*.css" --output-file report.txt

# JSON report
stylelint "**/*.css" --formatter json --output-file report.json

# Set maximum warnings
stylelint "**/*.css" --max-warnings 10

# Quiet mode (errors only)
stylelint "**/*.css" --quiet
```

## Advanced Options

```bash
# Lint stdin
echo "a { color: pink; }" | stylelint

# Allow empty input
stylelint "**/*.css" --allow-empty-input

# Ignore stylelint-disable comments
stylelint "**/*.css" --ignore-disables

# Report descriptionless disables
stylelint "**/*.css" --report-descriptionless-disables

# Report needless disables
stylelint "**/*.css" --report-needless-disables
```

## NPM Scripts (Project Specific)

```bash
# Basic linting
npm run lint:css

# Auto-fix
npm run lint:css:fix

# With caching
npm run lint:css:cache

# Performance profiling
npm run lint:css:performance

# Verbose output
npm run lint:css:verbose

# JSON report
npm run lint:css:json

# Text report
npm run lint:css:report

# Lint specific directories
npm run lint:css:dev
npm run lint:css:theme
```

## Exit Codes

- `0` - Success (no linting errors)
- `1` - Fatal error
- `2` - Lint problem found
- `64` - Invalid CLI usage
- `78` - Invalid configuration file

## Common Patterns

### Development Workflow
```bash
# Quick check during development
npm run lint:css:dev

# Full check before commit
npm run lint:css

# Auto-fix issues
npm run lint:css:fix
```

### CI/CD Integration
```bash
# Check with exit code
if npm run lint:css; then
  echo "CSS linting passed"
else
  echo "CSS linting failed"
  exit 1
fi

# Generate report for CI
npm run lint:css:json
```

### Performance Optimization
```bash
# First run (creates cache)
npm run lint:css:cache

# Subsequent runs (uses cache)
npm run lint:css:cache

# Profile performance
npm run lint:css:performance
```

## Tips

1. **Always quote glob patterns**: `"**/*.css"` not `**/*.css`
2. **Use caching for large projects**: `--cache` flag
3. **Profile performance**: `TIMING=10` for slow rules
4. **Exclude generated files**: Use `.stylelintignore`
5. **Use appropriate formatters**: `verbose` for debugging, `json` for automation 