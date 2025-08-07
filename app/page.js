'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const searchParams = useSearchParams();

  // Get base path for GitHub Pages
  const getBasePath = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.includes('/URLbits') ? '/URLbits' : '';
    }
    return '';
  };

  // Function to generate a short code
  const generateShortCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortCode = '';
    for (let i = 0; i < 6; i++) {
      shortCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return shortCode;
  };

  // Function to sanitize and validate URL
  const sanitizeUrl = (inputUrl) => {
    let url = inputUrl.trim();
    
    // Add protocol if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    return url;
  };

  // Function to check for malicious URLs
  const isMaliciousUrl = (url) => {
    const maliciousPatterns = [
      /javascript:/i,
      /data:/i,
      /vbscript:/i,
      /file:/i,
      /ftp:/i,
      /mailto:/i,
      /tel:/i,
      /sms:/i
    ];
    
    return maliciousPatterns.some(pattern => pattern.test(url));
  };

  // Function to save URL to localStorage with proper structure
  const saveUrlToStorage = (longUrl, shortCode) => {
    try {
      const urls = JSON.parse(localStorage.getItem('shortenedUrls') || '{}');
      urls[shortCode] = {
        url: longUrl,
        clicks: 0,
        createdAt: new Date().toISOString(),
        lastAccessed: null
      };
      localStorage.setItem('shortenedUrls', JSON.stringify(urls));
    } catch (error) {
      console.error('Error saving URL to localStorage:', error);
      setError('Failed to save URL. Please try again.');
    }
  };

  // Function to get URL from localStorage
  const getUrlFromStorage = (shortCode) => {
    try {
      const urls = JSON.parse(localStorage.getItem('shortenedUrls') || '{}');
      return urls[shortCode];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      setError('Failed to retrieve URL. Please try again.');
      return null;
    }
  };

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
    }
  }, [searchParams]);

  const validateUrl = (url) => {
    try {
      const urlObj = new URL(url);
      // Check for valid protocols
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        return false;
      }
      // Check for valid hostname
      if (!urlObj.hostname || urlObj.hostname.length === 0) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (!url.trim()) {
      setError('Please enter a URL');
      setLoading(false);
      return;
    }

    // Sanitize URL
    const sanitizedUrl = sanitizeUrl(url);
    
    // Check for malicious URLs
    if (isMaliciousUrl(sanitizedUrl)) {
      setError('This type of URL is not allowed for security reasons');
      setLoading(false);
      return;
    }

    if (!validateUrl(sanitizedUrl)) {
      setError('Please enter a valid URL');
      setLoading(false);
      return;
    }

    if (sanitizedUrl.length > 2048) {
      setError('URL is too long. Maximum length is 2048 characters');
      setLoading(false);
      return;
    }
    
    try {
      // Generate short code and save to localStorage
      const shortCode = generateShortCode();
      saveUrlToStorage(sanitizedUrl, shortCode);
      
      // Create the full short URL using the current domain and base path
      const basePath = getBasePath();
      const fullShortUrl = `${window.location.origin}${basePath}/${shortCode}/`;
      setShortUrl(fullShortUrl);
      setUrl(''); // Clear the input after successful shortening
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      setError('Failed to copy URL');
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow max-w-4xl mx-auto px-4 py-20 w-full">
        <div className="text-center mb-12">
          <div className="flex justify-end mb-4">
            <Link 
              href="/dashboard/"
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              View Dashboard
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
           <span className="text-blue-500">Shorten</span> Your <span className="text-blue-500">URLs</span>
          </h1>
          <p className="text-cyan-700 text-lg">
            Create short, memorable links for your long URLs
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your long URL here"
                className="w-full px-6 py-4 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                maxLength={2048}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-3 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 shadow-md flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Shortening...
                  </>
                ) : (
                  'Shorten URL'
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="flex-1">{error}</span>
              <button
                onClick={() => setError('')}
                className="text-red-700 hover:text-red-800"
                aria-label="Dismiss error"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}

          {shortUrl && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Your Short URL:</h2>
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={shortUrl}
                  readOnly
                  className="flex-1 px-6 py-4 text-lg bg-white border border-gray-300 rounded-lg"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-8 py-4 bg-gray-800 text-white text-lg font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {copySuccess ? 'Copied!' : 'Copy'}
                </button>
              </div>
              {copySuccess && (
                <div className="mt-3 text-sm text-green-600">
                  URL copied to clipboard!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
}
