/**
 * LiquidDoc Generator for BloxMania Theme
 * Generates comprehensive documentation for Liquid templates, snippets, and sections
 * Following LiquidDoc standards and Dawn theme documentation patterns
 */

const fs = require("fs-extra");
const path = require("path");
const glob = require("glob");

class LiquidDocGenerator {
  constructor(options = {}) {
    this.options = {
      inputDir: path.resolve(__dirname, ".."),
      outputDir: path.resolve(__dirname, "../../docs"),
      templateDir: path.resolve(__dirname, "../../docs/templates"),
      ...options,
    };

    this.documentation = {
      sections: [],
      snippets: [],
      templates: [],
      assets: [],
      config: [],
    };
  }

  /**
   * Generate complete documentation
   */
  async generate() {
    console.log("🔍 Generating LiquidDoc documentation...\n");

    try {
      // Ensure output directory exists
      await fs.ensureDir(this.options.outputDir);
      await fs.ensureDir(this.options.templateDir);

      // Parse all Liquid files
      await this.parseSections();
      await this.parseSnippets();
      await this.parseTemplates();
      await this.parseAssets();
      await this.parseConfig();

      // Generate documentation files
      await this.generateIndexPage();
      await this.generateSectionDocs();
      await this.generateSnippetDocs();
      await this.generateTemplateDocs();
      await this.generateAssetDocs();
      await this.generateConfigDocs();
      await this.generateAPIReference();
      await this.generateStyleGuide();

      console.log("✅ LiquidDoc documentation generated successfully!\n");
      console.log(`📄 Documentation available at: ${this.options.outputDir}`);
    } catch (error) {
      console.error("❌ LiquidDoc generation failed:", error);
      throw error;
    }
  }

  /**
   * Parse section files for documentation
   */
  async parseSections() {
    console.log("📊 Parsing sections...");

    const sectionFiles = glob.sync("sections/*.liquid", {
      cwd: this.options.inputDir,
    });

    for (const file of sectionFiles) {
      const filePath = path.join(this.options.inputDir, file);
      const content = await fs.readFile(filePath, "utf8");
      const sectionDoc = this.parseLiquidFile(content, file, "section");

      if (sectionDoc) {
        this.documentation.sections.push(sectionDoc);
      }
    }

    console.log(`   Found ${this.documentation.sections.length} sections\n`);
  }

  /**
   * Parse snippet files for documentation
   */
  async parseSnippets() {
    console.log("🧩 Parsing snippets...");

    const snippetFiles = glob.sync("snippets/*.liquid", {
      cwd: this.options.inputDir,
    });

    for (const file of snippetFiles) {
      const filePath = path.join(this.options.inputDir, file);
      const content = await fs.readFile(filePath, "utf8");
      const snippetDoc = this.parseLiquidFile(content, file, "snippet");

      if (snippetDoc) {
        this.documentation.snippets.push(snippetDoc);
      }
    }

    console.log(`   Found ${this.documentation.snippets.length} snippets\n`);
  }

  /**
   * Parse template files for documentation
   */
  async parseTemplates() {
    console.log("📄 Parsing templates...");

    const templateFiles = glob.sync("templates/*.liquid", {
      cwd: this.options.inputDir,
    });

    for (const file of templateFiles) {
      const filePath = path.join(this.options.inputDir, file);
      const content = await fs.readFile(filePath, "utf8");
      const templateDoc = this.parseLiquidFile(content, file, "template");

      if (templateDoc) {
        this.documentation.templates.push(templateDoc);
      }
    }

    console.log(`   Found ${this.documentation.templates.length} templates\n`);
  }

  /**
   * Parse asset files for documentation
   */
  async parseAssets() {
    console.log("🎨 Parsing assets...");

    const jsFiles = glob.sync("assets/*.js", { cwd: this.options.inputDir });
    const cssFiles = glob.sync("assets/*.css", { cwd: this.options.inputDir });

    for (const file of [...jsFiles, ...cssFiles]) {
      const filePath = path.join(this.options.inputDir, file);
      const content = await fs.readFile(filePath, "utf8");
      const assetDoc = this.parseAssetFile(content, file);

      if (assetDoc) {
        this.documentation.assets.push(assetDoc);
      }
    }

    console.log(`   Found ${this.documentation.assets.length} documented assets\n`);
  }

  /**
   * Parse configuration files
   */
  async parseConfig() {
    console.log("⚙️  Parsing configuration...");

    const configFiles = [
      "config/settings_schema.json",
      "config/settings_data.json",
      "tailwind.config.js",
      "assets/theme.config.js",
    ];

    for (const file of configFiles) {
      const filePath = path.join(this.options.inputDir, file);

      if (await fs.pathExists(filePath)) {
        const content = await fs.readFile(filePath, "utf8");
        const configDoc = this.parseConfigFile(content, file);

        if (configDoc) {
          this.documentation.config.push(configDoc);
        }
      }
    }

    console.log(`   Found ${this.documentation.config.length} configuration files\n`);
  }

  /**
   * Parse Liquid file and extract documentation
   */
  parseLiquidFile(content, filename, type) {
    const doc = {
      filename,
      type,
      name: path.basename(filename, ".liquid"),
      description: "",
      parameters: [],
      usage: [],
      examples: [],
      dependencies: [],
      settings: [],
      blocks: [],
      presets: [],
    };

    // Extract comment block documentation
    const commentBlocks = content.match(/{% comment %}([\s\S]*?){% endcomment %}/g);

    if (commentBlocks && commentBlocks.length > 0) {
      const firstComment = commentBlocks[0]
        .replace(/{% comment %}/, "")
        .replace(/{% endcomment %}/, "")
        .trim();

      doc.description = this.parseDescription(firstComment);
      doc.parameters = this.parseParameters(firstComment);
      doc.usage = this.parseUsage(firstComment);
      doc.examples = this.parseExamples(firstComment);
    }

    // Extract schema for sections
    if (type === "section") {
      const schemaMatch = content.match(/{% schema %}([\s\S]*?){% endschema %}/);
      if (schemaMatch) {
        try {
          const schema = JSON.parse(schemaMatch[1]);
          doc.settings = schema.settings || [];
          doc.blocks = schema.blocks || [];
          doc.presets = schema.presets || [];
        } catch (error) {
          console.warn(`Warning: Could not parse schema for ${filename}`);
        }
      }
    }

    // Extract dependencies (render calls, includes, etc.)
    doc.dependencies = this.extractDependencies(content);

    return doc;
  }

  /**
   * Parse asset file for documentation
   */
  parseAssetFile(content, filename) {
    const doc = {
      filename,
      type: path.extname(filename).slice(1),
      name: path.basename(filename),
      description: "",
      functions: [],
      classes: [],
      dependencies: [],
    };

    // Extract JSDoc comments for JavaScript files
    if (filename.endsWith(".js")) {
      const jsdocBlocks = content.match(/\/\*\*([\s\S]*?)\*\//g);

      if (jsdocBlocks && jsdocBlocks.length > 0) {
        const firstComment = jsdocBlocks[0];
        doc.description = this.parseJSDocDescription(firstComment);
        doc.functions = this.parseJSDocFunctions(content);
        doc.classes = this.parseJSDocClasses(content);
      }
    }

    // Extract CSS documentation
    if (filename.endsWith(".css")) {
      doc.description = this.parseCSSDescription(content);
      doc.classes = this.extractCSSClasses(content);
    }

    return doc.description || doc.functions.length || doc.classes.length ? doc : null;
  }

  /**
   * Parse configuration file
   */
  parseConfigFile(content, filename) {
    const doc = {
      filename,
      type: "config",
      name: path.basename(filename),
      description: "",
      structure: null,
    };

    if (filename.endsWith(".json")) {
      try {
        doc.structure = JSON.parse(content);
        doc.description = this.generateConfigDescription(filename, doc.structure);
      } catch (error) {
        console.warn(`Warning: Could not parse JSON config ${filename}`);
      }
    } else if (filename.endsWith(".js")) {
      doc.description = this.parseJSConfigDescription(content);
    }

    return doc;
  }

  /**
   * Generate main index page
   */
  async generateIndexPage() {
    const indexContent = `# BloxMania Theme Documentation

## Overview
BloxMania is a modern Shopify theme designed for digital goods marketplaces, with a focus on gaming items and virtual products.

## Quick Navigation

### 📄 [Templates](./templates/README.md)
Page templates that define the structure of different page types.
- ${this.documentation.templates.map((t) => `[${t.name}](./templates/${t.name}.md)`).join("\n- ")}

### 🧩 [Snippets](./snippets/README.md)
Reusable components that can be included in templates and sections.
- ${this.documentation.snippets.map((s) => `[${s.name}](./snippets/${s.name}.md)`).join("\n- ")}

### 📊 [Sections](./sections/README.md)
Customizable content blocks that can be added to pages through the theme editor.
- ${this.documentation.sections.map((s) => `[${s.name}](./sections/${s.name}.md)`).join("\n- ")}

### 🎨 [Assets](./assets/README.md)
JavaScript, CSS, and other static files.
- ${this.documentation.assets.map((a) => `[${a.name}](./assets/${a.name}.md)`).join("\n- ")}

### ⚙️ [Configuration](./config/README.md)
Theme settings and configuration files.
- ${this.documentation.config.map((c) => `[${c.name}](./config/${c.name}.md)`).join("\n- ")}

### 📚 [API Reference](./api/README.md)
Complete reference for all theme functions, classes, and utilities.

### 🎨 [Style Guide](./style-guide/README.md)
Design system, components, and styling guidelines.

## Getting Started

1. **Installation**: Upload the theme to your Shopify store
2. **Configuration**: Use the theme editor to customize settings
3. **Customization**: Refer to individual component documentation for advanced customization

## Development

- **Build System**: [BUILD_SYSTEM.md](../BUILD_SYSTEM.md)
- **Tailwind Setup**: [TAILWIND_SETUP.md](../TAILWIND_SETUP.md)
- **Theme Configuration**: [THEME_CONFIGURATION.md](../THEME_CONFIGURATION.md)

## Support

For technical support and customization help, refer to the troubleshooting section in each component's documentation.
`;

    await fs.writeFile(path.join(this.options.outputDir, "README.md"), indexContent);
  }

  /**
   * Generate section documentation
   */
  async generateSectionDocs() {
    const sectionsDir = path.join(this.options.outputDir, "sections");
    await fs.ensureDir(sectionsDir);

    // Generate index for sections
    const sectionIndex = `# Sections

Sections are customizable content blocks that can be added to pages through the Shopify theme editor.

## Available Sections

${this.documentation.sections
  .map(
    (section) => `
### [${section.name}](${section.name}.md)
${section.description}
`,
  )
  .join("")}
`;

    await fs.writeFile(path.join(sectionsDir, "README.md"), sectionIndex);

    // Generate individual section docs
    for (const section of this.documentation.sections) {
      const sectionDoc = this.generateSectionDoc(section);
      await fs.writeFile(path.join(sectionsDir, `${section.name}.md`), sectionDoc);
    }
  }

  /**
   * Generate snippet documentation
   */
  async generateSnippetDocs() {
    const snippetsDir = path.join(this.options.outputDir, "snippets");
    await fs.ensureDir(snippetsDir);

    // Generate index for snippets
    const snippetIndex = `# Snippets

Snippets are reusable components that can be included in templates and sections.

## Available Snippets

${this.documentation.snippets
  .map(
    (snippet) => `
### [${snippet.name}](${snippet.name}.md)
${snippet.description}
`,
  )
  .join("")}
`;

    await fs.writeFile(path.join(snippetsDir, "README.md"), snippetIndex);

    // Generate individual snippet docs
    for (const snippet of this.documentation.snippets) {
      const snippetDoc = this.generateSnippetDoc(snippet);
      await fs.writeFile(path.join(snippetsDir, `${snippet.name}.md`), snippetDoc);
    }
  }

  /**
   * Generate template documentation
   */
  async generateTemplateDocs() {
    const templatesDir = path.join(this.options.outputDir, "templates");
    await fs.ensureDir(templatesDir);

    // Generate index for templates
    const templateIndex = `# Templates

Templates define the structure of different page types in the theme.

## Available Templates

${this.documentation.templates
  .map(
    (template) => `
### [${template.name}](${template.name}.md)
${template.description}
`,
  )
  .join("")}
`;

    await fs.writeFile(path.join(templatesDir, "README.md"), templateIndex);

    // Generate individual template docs
    for (const template of this.documentation.templates) {
      const templateDoc = this.generateTemplateDoc(template);
      await fs.writeFile(path.join(templatesDir, `${template.name}.md`), templateDoc);
    }
  }

  /**
   * Generate asset documentation
   */
  async generateAssetDocs() {
    const assetsDir = path.join(this.options.outputDir, "assets");
    await fs.ensureDir(assetsDir);

    // Generate index for assets
    const assetIndex = `# Assets

JavaScript, CSS, and other static files used by the theme.

## JavaScript Files

${this.documentation.assets
  .filter((a) => a.type === "js")
  .map(
    (asset) => `
### [${asset.name}](${asset.name}.md)
${asset.description}
`,
  )
  .join("")}

## CSS Files

${this.documentation.assets
  .filter((a) => a.type === "css")
  .map(
    (asset) => `
### [${asset.name}](${asset.name}.md)
${asset.description}
`,
  )
  .join("")}
`;

    await fs.writeFile(path.join(assetsDir, "README.md"), assetIndex);

    // Generate individual asset docs
    for (const asset of this.documentation.assets) {
      const assetDoc = this.generateAssetDoc(asset);
      await fs.writeFile(path.join(assetsDir, `${asset.name}.md`), assetDoc);
    }
  }

  /**
   * Generate configuration documentation
   */
  async generateConfigDocs() {
    const configDir = path.join(this.options.outputDir, "config");
    await fs.ensureDir(configDir);

    // Generate index for config
    const configIndex = `# Configuration

Theme settings and configuration files.

## Configuration Files

${this.documentation.config
  .map(
    (config) => `
### [${config.name}](${config.name}.md)
${config.description}
`,
  )
  .join("")}
`;

    await fs.writeFile(path.join(configDir, "README.md"), configIndex);

    // Generate individual config docs
    for (const config of this.documentation.config) {
      const configDoc = this.generateConfigDoc(config);
      await fs.writeFile(path.join(configDir, `${config.name}.md`), configDoc);
    }
  }

  /**
   * Generate API reference
   */
  async generateAPIReference() {
    const apiDir = path.join(this.options.outputDir, "api");
    await fs.ensureDir(apiDir);

    const apiContent = `# API Reference

## JavaScript Utilities

${this.documentation.assets
  .filter((a) => a.type === "js" && a.functions.length > 0)
  .map(
    (asset) => `
### ${asset.name}

${asset.functions
  .map(
    (func) => `
#### ${func.name}
${func.description}

**Parameters:**
${func.parameters.map((p) => `- \`${p.name}\` (${p.type}): ${p.description}`).join("\n")}

**Returns:** ${func.returns}

**Example:**
\`\`\`javascript
${func.example}
\`\`\`
`,
  )
  .join("")}
`,
  )
  .join("")}

## CSS Classes

${this.documentation.assets
  .filter((a) => a.type === "css" && a.classes.length > 0)
  .map(
    (asset) => `
### ${asset.name}

${asset.classes
  .map(
    (cls) => `
#### .${cls.name}
${cls.description}

**Usage:**
\`\`\`html
${cls.example}
\`\`\`
`,
  )
  .join("")}
`,
  )
  .join("")}
`;

    await fs.writeFile(path.join(apiDir, "README.md"), apiContent);
  }

  /**
   * Generate style guide
   */
  async generateStyleGuide() {
    const styleDir = path.join(this.options.outputDir, "style-guide");
    await fs.ensureDir(styleDir);

    const styleGuideContent = `# Style Guide

## Design System

### Colors
- **Primary**: #ffd800 (Gaming Yellow)
- **Secondary**: #4791f0 (Gaming Blue)
- **Background**: #1d1e26 (Dark Background)
- **Surface**: #252730 (Card Background)

### Typography
- **Font Family**: Inter, system-ui, sans-serif
- **Headings**: Bold weights (600-800)
- **Body**: Regular weight (400)

### Spacing
- **Section Padding**: 52px
- **Grid Vertical**: 32px
- **Grid Horizontal**: 32px
- **Page Width**: 1200px max

### Components

#### Buttons
- **Primary**: Yellow background, black text
- **Secondary**: Transparent background, yellow border
- **Border Radius**: 8px
- **Padding**: 12px 24px

#### Cards
- **Background**: Semi-transparent white (5% opacity)
- **Border**: 1px solid white (10% opacity)
- **Border Radius**: 16px
- **Backdrop Filter**: blur(4px)

#### Animations
- **Duration**: 300ms standard
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **Hover Effects**: Transform and shadow changes

### Responsive Design
- **Mobile First**: Base styles for mobile
- **Breakpoints**: 
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

### Accessibility
- **Focus States**: Visible focus rings
- **Color Contrast**: WCAG AA compliant
- **Screen Readers**: Proper ARIA labels
- **Keyboard Navigation**: Full keyboard support
`;

    await fs.writeFile(path.join(styleDir, "README.md"), styleGuideContent);
  }

  // Helper methods for parsing different types of documentation
  parseDescription(comment) {
    const lines = comment.split("\n").map((line) => line.trim());
    const descriptionLines = [];

    for (const line of lines) {
      if (line.startsWith("Accepts:") || line.startsWith("Usage:") || line.startsWith("Example:")) {
        break;
      }
      if (line && !line.startsWith("Renders")) {
        descriptionLines.push(line);
      }
    }

    return descriptionLines.join(" ").trim();
  }

  parseParameters(comment) {
    const parameters = [];
    const lines = comment.split("\n");
    let inAccepts = false;

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith("Accepts:")) {
        inAccepts = true;
        continue;
      }

      if (inAccepts && (trimmed.startsWith("Usage:") || trimmed.startsWith("Example:"))) {
        break;
      }

      if (inAccepts && trimmed.startsWith("- ")) {
        const paramMatch = trimmed.match(/- (\w+):\s*\{([^}]+)\}\s*(.*)/);
        if (paramMatch) {
          parameters.push({
            name: paramMatch[1],
            type: paramMatch[2],
            description: paramMatch[3],
          });
        }
      }
    }

    return parameters;
  }

  parseUsage(comment) {
    const usage = [];
    const lines = comment.split("\n");
    let inUsage = false;

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith("Usage:")) {
        inUsage = true;
        continue;
      }

      if (inUsage && trimmed.startsWith("Example:")) {
        break;
      }

      if (inUsage && trimmed) {
        usage.push(trimmed);
      }
    }

    return usage;
  }

  parseExamples(comment) {
    const examples = [];
    const lines = comment.split("\n");
    let inExample = false;
    let currentExample = [];

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith("Example:")) {
        inExample = true;
        continue;
      }

      if (inExample) {
        if (trimmed === "" && currentExample.length > 0) {
          examples.push(currentExample.join("\n"));
          currentExample = [];
        } else if (trimmed) {
          currentExample.push(trimmed);
        }
      }
    }

    if (currentExample.length > 0) {
      examples.push(currentExample.join("\n"));
    }

    return examples;
  }

  extractDependencies(content) {
    const dependencies = [];

    // Extract render calls
    const renderMatches = content.match(/{% render ['"]([^'"]+)['"]/g);
    if (renderMatches) {
      renderMatches.forEach((match) => {
        const snippetName = match.match(/['"]([^'"]+)['"]/)[1];
        dependencies.push({
          type: "snippet",
          name: snippetName,
        });
      });
    }

    // Extract asset references
    const assetMatches = content.match(/{{ ['"]([^'"]+\.(css|js|png|jpg|svg))['"]/g);
    if (assetMatches) {
      assetMatches.forEach((match) => {
        const assetName = match.match(/['"]([^'"]+)['"]/)[1];
        dependencies.push({
          type: "asset",
          name: assetName,
        });
      });
    }

    return dependencies;
  }

  parseJSDocDescription(comment) {
    const lines = comment.split("\n").map((line) => line.replace(/^\s*\*\s?/, "").trim());
    const descriptionLines = [];

    for (const line of lines) {
      if (line.startsWith("@")) {
        break;
      }
      if (line && line !== "/**" && line !== "*/") {
        descriptionLines.push(line);
      }
    }

    return descriptionLines.join(" ").trim();
  }

  parseJSDocFunctions(content) {
    const functions = [];
    const functionMatches = content.match(/\/\*\*([\s\S]*?)\*\/\s*(?:static\s+)?(\w+)\s*\([^)]*\)/g);

    if (functionMatches) {
      functionMatches.forEach((match) => {
        const [, comment, name] = match.match(/\/\*\*([\s\S]*?)\*\/\s*(?:static\s+)?(\w+)\s*\([^)]*\)/);
        const func = {
          name,
          description: this.parseJSDocDescription(comment),
          parameters: this.parseJSDocParams(comment),
          returns: this.parseJSDocReturns(comment),
          example: this.parseJSDocExample(comment),
        };
        functions.push(func);
      });
    }

    return functions;
  }

  parseJSDocClasses(content) {
    const classes = [];
    const classMatches = content.match(/\/\*\*([\s\S]*?)\*\/\s*class\s+(\w+)/g);

    if (classMatches) {
      classMatches.forEach((match) => {
        const [, comment, name] = match.match(/\/\*\*([\s\S]*?)\*\/\s*class\s+(\w+)/);
        const cls = {
          name,
          description: this.parseJSDocDescription(comment),
        };
        classes.push(cls);
      });
    }

    return classes;
  }

  parseJSDocParams(comment) {
    const params = [];
    const paramMatches = comment.match(/@param\s+\{([^}]+)\}\s+(\w+)\s*-?\s*(.*)/g);

    if (paramMatches) {
      paramMatches.forEach((match) => {
        const [, type, name, description] = match.match(/@param\s+\{([^}]+)\}\s+(\w+)\s*-?\s*(.*)/);
        params.push({ name, type, description });
      });
    }

    return params;
  }

  parseJSDocReturns(comment) {
    const returnMatch = comment.match(/@returns?\s+\{([^}]+)\}\s*-?\s*(.*)/);
    return returnMatch ? `${returnMatch[1]} - ${returnMatch[2]}` : "";
  }

  parseJSDocExample(comment) {
    const exampleMatch = comment.match(/@example\s+([\s\S]*?)(?=@|\*\/)/);
    return exampleMatch ? exampleMatch[1].trim() : "";
  }

  parseCSSDescription(content) {
    const commentMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
    return commentMatch ? commentMatch[1].replace(/\*/g, "").trim() : "";
  }

  extractCSSClasses(content) {
    const classes = [];
    const classMatches = content.match(/\.([a-zA-Z][a-zA-Z0-9_-]*)\s*{/g);

    if (classMatches) {
      classMatches.forEach((match) => {
        const className = match.match(/\.([a-zA-Z][a-zA-Z0-9_-]*)/)[1];
        classes.push({
          name: className,
          description: `CSS class: ${className}`,
          example: `<div class="${className}">...</div>`,
        });
      });
    }

    return classes;
  }

  generateConfigDescription(filename, structure) {
    if (filename.includes("settings_schema")) {
      return "Theme settings schema defining customizable options in the Shopify theme editor.";
    } else if (filename.includes("settings_data")) {
      return "Current theme settings data with default values.";
    } else if (filename.includes("tailwind.config")) {
      return "Tailwind CSS configuration with custom theme settings and design tokens.";
    } else if (filename.includes("theme.config")) {
      return "Centralized theme configuration with colors, typography, and component settings.";
    }
    return "Configuration file";
  }

  parseJSConfigDescription(content) {
    const commentMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
    return commentMatch ? this.parseJSDocDescription(commentMatch[0]) : "";
  }

  generateSectionDoc(section) {
    return `# ${section.name}

${section.description}

## Settings

${
  section.settings.length > 0
    ? section.settings
        .map(
          (setting) => `
### ${setting.label || setting.id}
- **Type**: ${setting.type}
- **ID**: ${setting.id}
${setting.info ? `- **Info**: ${setting.info}` : ""}
${setting.default !== undefined ? `- **Default**: ${setting.default}` : ""}
`,
        )
        .join("")
    : "No settings available."
}

## Blocks

${
  section.blocks.length > 0
    ? section.blocks
        .map(
          (block) => `
### ${block.name}
- **Type**: ${block.type}
- **Settings**: ${block.settings ? block.settings.length : 0}
`,
        )
        .join("")
    : "No blocks available."
}

## Dependencies

${
  section.dependencies.length > 0
    ? section.dependencies
        .map(
          (dep) => `
- **${dep.type}**: ${dep.name}
`,
        )
        .join("")
    : "No dependencies."
}

## Usage

This section can be added to any template through the Shopify theme editor.

${
  section.examples.length > 0
    ? `
## Examples

${section.examples
  .map(
    (example) => `
\`\`\`liquid
${example}
\`\`\`
`,
  )
  .join("")}
`
    : ""
}
`;
  }

  generateSnippetDoc(snippet) {
    return `# ${snippet.name}

${snippet.description}

## Parameters

${
  snippet.parameters.length > 0
    ? snippet.parameters
        .map(
          (param) => `
### ${param.name}
- **Type**: ${param.type}
- **Description**: ${param.description}
`,
        )
        .join("")
    : "No parameters."
}

## Dependencies

${
  snippet.dependencies.length > 0
    ? snippet.dependencies
        .map(
          (dep) => `
- **${dep.type}**: ${dep.name}
`,
        )
        .join("")
    : "No dependencies."
}

## Usage

${
  snippet.usage.length > 0
    ? snippet.usage
        .map(
          (usage) => `
\`\`\`liquid
${usage}
\`\`\`
`,
        )
        .join("")
    : "No usage examples available."
}

${
  snippet.examples.length > 0
    ? `
## Examples

${snippet.examples
  .map(
    (example) => `
\`\`\`liquid
${example}
\`\`\`
`,
  )
  .join("")}
`
    : ""
}
`;
  }

  generateTemplateDoc(template) {
    return `# ${template.name}

${template.description}

## Dependencies

${
  template.dependencies.length > 0
    ? template.dependencies
        .map(
          (dep) => `
- **${dep.type}**: ${dep.name}
`,
        )
        .join("")
    : "No dependencies."
}

## Usage

This template is automatically used for ${template.name} pages in Shopify.

${
  template.examples.length > 0
    ? `
## Examples

${template.examples
  .map(
    (example) => `
\`\`\`liquid
${example}
\`\`\`
`,
  )
  .join("")}
`
    : ""
}
`;
  }

  generateAssetDoc(asset) {
    return `# ${asset.name}

${asset.description}

${
  asset.functions.length > 0
    ? `
## Functions

${asset.functions
  .map(
    (func) => `
### ${func.name}
${func.description}

**Parameters:**
${func.parameters.map((p) => `- \`${p.name}\` (${p.type}): ${p.description}`).join("\n")}

**Returns:** ${func.returns}

${
  func.example
    ? `
**Example:**
\`\`\`javascript
${func.example}
\`\`\`
`
    : ""
}
`,
  )
  .join("")}
`
    : ""
}

${
  asset.classes.length > 0
    ? `
## Classes

${asset.classes
  .map(
    (cls) => `
### .${cls.name}
${cls.description}

**Example:**
\`\`\`html
${cls.example}
\`\`\`
`,
  )
  .join("")}
`
    : ""
}
`;
  }

  generateConfigDoc(config) {
    return `# ${config.name}

${config.description}

${
  config.structure
    ? `
## Structure

\`\`\`json
${JSON.stringify(config.structure, null, 2)}
\`\`\`
`
    : ""
}
`;
  }
}

module.exports = LiquidDocGenerator;

// CLI usage
if (require.main === module) {
  const generator = new LiquidDocGenerator();
  generator.generate().catch(console.error);
}
