# QR Code Generator - Static Version

This is a static, client-side version of the QR Code Generator that can be hosted on GitHub Pages.

## Features

- **Client-side QR generation** - No server required
- **Customizable parameters** - Width, margin, error correction level
- **Download functionality** - Save QR codes as PNG files
- **Open in new tab** - View QR codes in a separate window
- **Responsive design** - Works on desktop and mobile

## How it works

This static version uses:
- **QR Code Library**: [QRious](https://github.com/neocotic/qrious) - Pure JavaScript QR code generation
- **Client-side generation**: QR codes are generated in the browser using JavaScript
- **No backend dependencies**: Everything runs in the browser

## Usage

1. Enter your text or URL in the input field
2. Optionally adjust the width, margin, and error correction level
3. Click "Generate QR code"
4. Download or open the generated QR code in a new tab

## Deployment

This version is designed for GitHub Pages deployment:

1. Ensure the files are in the `/docs` directory
2. Enable GitHub Pages in repository settings
3. Set the source to "Deploy from a branch" and select `main` branch, `/docs` folder
4. Access your QR generator at `https://yourusername.github.io/repository-name`

## Differences from Server Version

- **No server required** - Runs entirely in the browser
- **Faster generation** - No network requests needed
- **Offline capable** - Works without internet after initial page load
- **GitHub Pages compatible** - Can be hosted for free

## Browser Compatibility

This version works in all modern browsers that support:
- ES6+ JavaScript features
- Canvas API (for QR code generation)
- File download APIs

## Files

- `index.html` - Main interface
- `script.js` - Client-side QR generation logic
- `styles.css` - Styling (copied from original)
- `images/` - Placeholder images

Built by [JP Carrascal](https://github.com/jpcarrascal), based on [node-qrcode](https://www.npmjs.com/package/qrcode).