#!/bin/bash

echo "🚀 Building URL Shortener for GitHub Pages..."

# Install dependencies
npm install

# Build the project
npm run build

echo "✅ Build completed! Files are in the 'out' directory"
echo "📁 Upload the contents of the 'out' directory to your web server"
echo "🌐 Or push to GitHub and enable GitHub Pages in repository settings" 