#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const postcss = require("postcss");
const discardDuplicates = require("postcss-discard-duplicates");

class CSSDeduplicator {
  constructor() {
    this.devDir = path.join(__dirname, "../css");
    this.buildDir = path.join(__dirname, "../../build/css");
    this.stylesPath = path.join(this.devDir, "main.css");
  }

  async deduplicateCSS() {
    console.log("🧹 Removing duplicate CSS rules from main.css...");

    try {
      // Check if styles.css exists
      if (!(await fs.pathExists(this.stylesPath))) {
        throw new Error(`main.css not found at ${this.stylesPath}`);
      }

      // Read the CSS file
      const css = await fs.readFile(this.stylesPath, "utf8");
      const originalSize = css.length;

      console.log(`📊 Original CSS size: ${(originalSize / 1024).toFixed(2)}KB`);

      // Process with postcss-discard-duplicates
      const result = await postcss([
        discardDuplicates({
          // Optional: Configure specific options
          removeDuplicates: true,
          removeDuplicatedProperties: true,
          removeDuplicatedSelectors: true,
        }),
      ]).process(css, {
        from: this.stylesPath,
        to: this.stylesPath,
      });

      // Write the deduplicated CSS back
      await fs.writeFile(this.stylesPath, result.css);

      const finalSize = result.css.length;
      const savings = originalSize - finalSize;
      const savingsPercent = ((savings / originalSize) * 100).toFixed(2);

      console.log(`✅ CSS deduplication completed!`);
      console.log(`📊 Final CSS size: ${(finalSize / 1024).toFixed(2)}KB`);
      console.log(`💾 Size reduction: ${(savings / 1024).toFixed(2)}KB (${savingsPercent}%)`);

      // Generate a backup
      const backupPath = path.join(this.devDir, `styles.backup.${Date.now()}.css`);
      await fs.writeFile(backupPath, css);
      console.log(`💾 Backup created: ${path.basename(backupPath)}`);

      return {
        originalSize,
        finalSize,
        savings,
        savingsPercent,
        backupPath,
      };
    } catch (error) {
      console.error("❌ CSS deduplication failed:", error.message);
      throw error;
    }
  }

  async analyzeDuplicates() {
    console.log("🔍 Analyzing duplicate CSS rules...");

    try {
      const css = await fs.readFile(this.stylesPath, "utf8");

      // Parse CSS properly using PostCSS
      const result = await postcss().process(css, {
        from: this.stylesPath,
      });

      const ruleMap = new Map();
      const duplicates = [];
      let ruleIndex = 0;

      // Walk through all rules in the CSS
      result.root.walkRules((rule) => {
        const selector = rule.selector;
        const properties = new Map();

        // Extract all properties from this rule
        rule.walkDecls((decl) => {
          properties.set(decl.prop, decl.value);
        });

        // Create a unique key for this rule
        const ruleKey = `${selector}|${Array.from(properties.entries()).sort().join(";")}`;

        if (ruleMap.has(ruleKey)) {
          duplicates.push({
            selector,
            properties: Array.from(properties.entries()),
            firstOccurrence: ruleMap.get(ruleKey),
            duplicateOccurrence: ruleIndex,
            line: rule.source.start.line,
          });
        } else {
          ruleMap.set(ruleKey, ruleIndex);
        }

        ruleIndex++;
      });

      console.log(`📊 Found ${duplicates.length} duplicate rules`);

      if (duplicates.length > 0) {
        console.log("🔍 Duplicate rules found:");
        duplicates.slice(0, 10).forEach((dup, index) => {
          console.log(`  ${index + 1}. Rule "${dup.selector}" at line ${dup.line}`);
          console.log(`     First occurrence: rule #${dup.firstOccurrence + 1}`);
          console.log(`     Duplicate occurrence: rule #${dup.duplicateOccurrence + 1}`);
          console.log(`     Properties: ${dup.properties.length} properties`);
        });

        if (duplicates.length > 10) {
          console.log(`  ... and ${duplicates.length - 10} more`);
        }
      } else {
        console.log("✅ No duplicate rules found!");
      }

      return duplicates;
    } catch (error) {
      console.error("❌ Duplicate analysis failed:", error.message);
      throw error;
    }
  }

  async restoreFromBackup(backupPath) {
    console.log(`🔄 Restoring from backup: ${backupPath}`);

    try {
      if (!(await fs.pathExists(backupPath))) {
        throw new Error(`Backup file not found: ${backupPath}`);
      }

      const backupCSS = await fs.readFile(backupPath, "utf8");
      await fs.writeFile(this.stylesPath, backupCSS);

      console.log("✅ CSS restored from backup successfully!");
    } catch (error) {
      console.error("❌ Restore failed:", error.message);
      throw error;
    }
  }
}

// CLI interface
if (require.main === module) {
  const deduplicator = new CSSDeduplicator();
  const command = process.argv[2];

  switch (command) {
    case "deduplicate":
    case "remove":
      deduplicator
        .deduplicateCSS()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
      break;

    case "analyze":
      deduplicator
        .analyzeDuplicates()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
      break;

    case "restore":
      const backupPath = process.argv[3];
      if (!backupPath) {
        console.error("❌ Please provide backup file path");
        process.exit(1);
      }
      deduplicator
        .restoreFromBackup(backupPath)
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
      break;

    default:
      console.log("📖 CSS Deduplicator Usage:");
      console.log("  node css-deduplicator.js analyze     - Analyze for duplicates");
      console.log("  node css-deduplicator.js deduplicate - Remove duplicates");
      console.log("  node css-deduplicator.js restore <path> - Restore from backup");
      process.exit(0);
  }
}

module.exports = CSSDeduplicator;
