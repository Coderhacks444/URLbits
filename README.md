# URL Shortener - URLbits

A modern, secure URL shortener built with Next.js 15, featuring a clean UI, analytics dashboard, and localStorage-based storage.

## Features

- 🔗 **URL Shortening**: Create short, memorable links for long URLs
- 📊 **Analytics Dashboard**: Track clicks and manage your shortened URLs
- 🔒 **Security**: Malicious URL detection and input sanitization
- 📱 **Responsive Design**: Works perfectly on all devices
- 🎨 **Modern UI**: Clean, intuitive interface with Tailwind CSS
- 💾 **Local Storage**: No server required - everything stored locally
- 🔍 **Search & Sort**: Find and organize your URLs easily

## Live Demo

Visit the live application: [https://Coderhacks444.github.io/URLbits](https://Coderhacks444.github.io/URLbits)

## Local Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Coderhacks444/URLbits.git
cd URLbits
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to GitHub Pages

### Automatic Deployment (Recommended)

1. **Fork or Clone** this repository to your GitHub account

2. **Update Repository Settings**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions"

3. **Update Configuration**:
   - Edit `package.json` and replace `Coderhacks444` with your actual GitHub username
   - Update `next.config.js` if your repository name is different from `URLbits`

4. **Push to Main Branch**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

5. **Check Deployment**:
   - Go to the "Actions" tab in your repository
   - The workflow will automatically build and deploy your site
   - Your site will be available at `https://Coderhacks444.github.io/URLbits`

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. The static files will be generated in the `out` directory

3. Upload the contents of the `out` directory to your web server

## Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, set:
```env
NEXT_PUBLIC_SITE_URL=https://Coderhacks444.github.io/URLbits
```

### Custom Domain

If you want to use a custom domain:

1. Update `next.config.js`:
```javascript
basePath: '',
assetPrefix: '',
```

2. Update `package.json`:
```json
"homepage": "https://yourdomain.com"
```

## Security Features

- **Input Sanitization**: Automatically adds HTTPS protocol if missing
- **Malicious URL Detection**: Blocks javascript:, data:, vbscript:, and other dangerous protocols
- **URL Validation**: Ensures valid hostnames and protocols
- **XSS Protection**: Sanitized input handling
- **Click Tracking**: Secure analytics without external dependencies

## Project Structure

```
URLbits/
├── app/
│   ├── components/          # Reusable components
│   ├── dashboard/          # Dashboard page
│   ├── [shortCode]/        # Dynamic route for short URLs
│   ├── layout.js           # Root layout
│   └── page.js             # Home page
├── .github/workflows/      # GitHub Actions
├── public/                 # Static assets
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies and scripts
```

## Technologies Used

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **localStorage**: Client-side data storage
- **GitHub Pages**: Static site hosting

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Coderhacks444/URLbits/issues) page
2. Create a new issue with detailed information
3. Include browser console errors if applicable

## Changelog

### v1.0.0
- Initial release
- URL shortening functionality
- Analytics dashboard
- Security features
- GitHub Pages deployment
