#!/bin/bash

# BloxMania Shopify Theme Deployment Script

echo "🚀 Starting BloxMania theme deployment..."

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

# Create ZIP file
print_status "Creating ZIP archive..."
cd "${TEMP_DIR}"
zip -r "${ZIP_NAME}" "${THEME_NAME}" -x "*.DS_Store" "*/.*" > /dev/null

# Move ZIP to current directory
mv "${ZIP_NAME}" "$(pwd)/../"

# Clean up
cd ..
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

echo ""
print_status "Deployment script completed!"