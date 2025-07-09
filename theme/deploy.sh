#!/bin/bash

# BloxMania Shopify Theme Deployment Script
# Supports both manual deployment and Shopify CLI integration

echo "🚀 Starting BloxMania theme deployment..."

# Check for command line arguments
DEPLOY_METHOD="manual"
if [ "$1" = "--cli" ] || [ "$1" = "-c" ]; then
    DEPLOY_METHOD="cli"
elif [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    echo "Usage: $0 [OPTION]"
    echo ""
    echo "Options:"
    echo "  --cli, -c     Use Shopify CLI for deployment"
    echo "  --manual, -m  Use manual ZIP package (default)"
    echo "  --help, -h    Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0              # Create ZIP package for manual upload"
    echo "  $0 --cli        # Deploy using Shopify CLI"
    echo "  $0 -c           # Deploy using Shopify CLI (short form)"
    exit 0
fi

# Set variables
THEME_NAME="bloxmania-theme"
VERSION="1.0.0"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
ZIP_NAME="${THEME_NAME}-v${VERSION}-${TIMESTAMP}.zip"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "config/settings_schema.json" ]; then
    print_error "Please run this script from the shopify-theme directory"
    exit 1
fi

print_status "Creating theme package..."

# Create temporary directory for packaging
TEMP_DIR=$(mktemp -d)
THEME_DIR="${TEMP_DIR}/${THEME_NAME}"

# Copy theme files to temporary directory
print_status "Copying theme files..."
mkdir -p "${THEME_DIR}"
cp -r assets config layout sections snippets templates "${THEME_DIR}/" 2>/dev/null || true

# Copy README if it exists
if [ -f "README.md" ]; then
    cp README.md "${THEME_DIR}/"
fi

# Create theme info file
cat > "${THEME_DIR}/theme_info.txt" << EOF
BloxMania Shopify Theme
Version: ${VERSION}
Build Date: $(date)
Author: BloxMania
Description: Modern dark gaming theme for digital goods marketplace
EOF

# Save current directory before changing to temp dir
ORIGINAL_DIR=$(pwd)

# Create ZIP file
print_status "Creating ZIP archive..."
cd "${TEMP_DIR}"
zip -r "${ZIP_NAME}" "${THEME_NAME}" -x "*.DS_Store" "*/.*" > /dev/null

# Move ZIP to original directory
mv "${ZIP_NAME}" "${ORIGINAL_DIR}/"

# Clean up
cd "${ORIGINAL_DIR}"
rm -rf "${TEMP_DIR}"

# Verify the ZIP was created
if [ -f "${ZIP_NAME}" ]; then
    print_success "Theme package created successfully: ${ZIP_NAME}"
    
    # Show file size
    FILE_SIZE=$(du -h "${ZIP_NAME}" | cut -f1)
    print_status "Package size: ${FILE_SIZE}"
    
    # Show contents
    print_status "Package contents:"
    unzip -l "${ZIP_NAME}" | head -20
    
    echo ""
    print_success "🎉 Theme is ready for upload!"
    echo ""
    echo "Next steps:"
    echo "1. Go to your Shopify admin panel"
    echo "2. Navigate to Online Store > Themes"
    echo "3. Click 'Add theme' > 'Upload theme'"
    echo "4. Upload the file: ${ZIP_NAME}"
    echo "5. Click 'Publish' to activate the theme"
    echo ""
    print_warning "Remember to:"
    echo "- Configure theme settings in the theme editor"
    echo "- Upload your logo and images"
    echo "- Set up your collections and products"
    echo "- Test the theme thoroughly before going live"
    
else
    print_error "Failed to create theme package"
    exit 1
fi

# Shopify CLI Deployment
if [ "$DEPLOY_METHOD" = "cli" ]; then
    echo ""
    print_status "🔄 Switching to Shopify CLI deployment..."
    
    # Check if Shopify CLI is installed
    if ! command -v shopify &> /dev/null; then
        print_error "Shopify CLI is not installed. Please install it first:"
        echo "npm install -g @shopify/cli @shopify/theme"
        echo ""
        echo "Or visit: https://shopify.dev/docs/themes/tools/cli/installation"
        exit 1
    fi
    
    # Check if user is authenticated
    if ! shopify auth list &> /dev/null; then
        print_warning "You need to authenticate with Shopify first:"
        echo "shopify auth login"
        exit 1
    fi
    
    # Check if store is selected
    if ! shopify store list &> /dev/null; then
        print_warning "You need to select a store first:"
        echo "shopify store select"
        exit 1
    fi
    
    print_status "Running theme check..."
    if shopify theme check; then
        print_success "Theme check passed!"
    else
        print_warning "Theme check found issues. Consider fixing them before deployment."
        read -p "Continue with deployment anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_status "Deployment cancelled."
            exit 0
        fi
    fi
    
    print_status "Deploying theme using Shopify CLI..."
    if shopify theme push; then
        print_success "🎉 Theme deployed successfully using Shopify CLI!"
        echo ""
        echo "Your theme is now live on your development store."
        echo "To make it the live theme:"
        echo "shopify theme push --live"
        echo ""
        echo "To check theme status:"
        echo "shopify theme list"
    else
        print_error "Failed to deploy theme using Shopify CLI"
        exit 1
    fi
fi

echo ""
print_status "Deployment script completed!"