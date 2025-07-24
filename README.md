# BloxMania Shopify Theme

A high-performance Shopify theme for digital goods marketplace.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Shopify
npm run push
```

## Development Commands

### 🚀 Development
| Command             | Description                                             |
| ------------------- | ------------------------------------------------------- |
| `npm run dev`       | Build and start development server (default hot-reload) |
| `npm run dev:hot`   | Hot reload CSS and sections only                        |
| `npm run dev:full`  | Full page refresh on changes                            |
| `npm run dev:off`   | No live reload (manual refresh)                         |
| `npm run dev:open`  | Auto-open browser on start                              |
| `npm run dev:watch` | Watch for changes and rebuild                           |

### 🔨 Build
| Command                  | Description                      |
| ------------------------ | -------------------------------- |
| `npm run build`          | Build for production             |
| `npm run build:dev`      | Build for development            |
| `npm run build:css:dev`  | Build CSS for development        |
| `npm run build:css:prod` | Build CSS for production         |
| `npm run build:js:dev`   | Build JavaScript for development |
| `npm run build:js:prod`  | Build JavaScript for production  |

### 📦 Deploy
| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run push`    | Build and deploy to Shopify    |
| `npm run pull`    | Pull latest theme from Shopify |
| `npm run package` | Create theme package           |

### ✅ Quality
| Command                | Description               |
| ---------------------- | ------------------------- |
| `npm run check`        | Check theme for issues    |
| `npm run check:fix`    | Auto-fix theme issues     |
| `npm run format`       | Format code with Prettier |
| `npm run lint:css`     | Lint CSS files            |
| `npm run lint:css:fix` | Auto-fix CSS issues       |

### 🧹 Cleanup
| Command               | Description                       |
| --------------------- | --------------------------------- |
| `npm run clean`       | Clean build and theme directories |
| `npm run clean:build` | Clean build directory only        |
| `npm run clean:theme` | Clean theme directory only        |

### ⚙️ Setup
| Command             | Description                            |
| ------------------- | -------------------------------------- |
| `npm run setup`     | Install dependencies                   |
| `npm run env:setup` | Set up environment file                |
| `npm run backfill`  | Guide for backfilling merchant changes |

## Project Structure

```
bloxmania/
├── dev/           # Source files
│   ├── css/       # CSS source
│   ├── js/        # JavaScript modules
│   ├── sections/  # Shopify sections
│   ├── snippets/  # Shopify snippets
│   └── templates/ # Shopify templates
├── build/         # Processed assets
├── theme/         # Final Shopify theme
└── docs/          # Documentation
```

## Development Workflow

1. **Start development**: `npm run dev`
2. **Make changes** in the `dev/` directory
3. **Build automatically** happens on file changes
4. **Live preview** updates in Shopify dev server

## Live Reload Modes

Shopify CLI provides different live reload behaviors:

- **`npm run dev`** (default): Hot reloads CSS and sections
- **`npm run dev:hot`**: Hot reloads CSS and sections only (fastest)
- **`npm run dev:full`**: Full page refresh on any change
- **`npm run dev:off`**: No live reload (manual refresh required)
- **`npm run dev:open`**: Auto-opens browser when server starts

### When to Use Each Mode:

- **Hot reload** (default): Best for most development work
- **Full page**: Use when making structural changes
- **Off**: Use when debugging or when hot reload causes issues
- **Auto-open**: Convenient for quick development sessions

## Build System

- **Development**: Fast builds with minimal processing
- **Production**: Optimized builds with minification
- **Auto-reload**: Changes trigger automatic rebuilds
- **Incremental**: Only rebuilds changed files

## Performance Optimizations

- Fast development builds (200ms intervals)
- Incremental file copying
- Optimized CSS compilation
- Minimal file system operations
