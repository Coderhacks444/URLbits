'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [copySuccess, setCopySuccess] = useState(null);
  const [error, setError] = useState('');

  // Get base path for GitHub Pages
  const getBasePath = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.includes('/URLbits') ? '/URLbits' : '';
    }
    return '';
  };

  useEffect(() => {
    loadUrls();
  }, []);

  const loadUrls = () => {
    try {
      const storedUrls = JSON.parse(localStorage.getItem('shortenedUrls') || '{}');
      const urlList = Object.entries(storedUrls).map(([shortCode, data]) => {
        // Handle both old string format and new object format
        const urlData = typeof data === 'string' ? { url: data, clicks: 0, createdAt: new Date().toISOString() } : data;
        const basePath = getBasePath();
        
        return {
          shortCode,
          longUrl: urlData.url,
          clicks: urlData.clicks || 0,
          shortUrl: `${window.location.origin}${basePath}/${shortCode}/`,
          createdAt: urlData.createdAt || new Date().toISOString(),
          lastAccessed: urlData.lastAccessed || null
        };
      });
      setUrls(urlList);
    } catch (error) {
      console.error('Error loading URLs:', error);
      setError('Failed to load URLs. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const deleteUrl = (shortCode) => {
    if (window.confirm('Are you sure you want to delete this URL? This action cannot be undone.')) {
      try {
        const storedUrls = JSON.parse(localStorage.getItem('shortenedUrls') || '{}');
        delete storedUrls[shortCode];
        localStorage.setItem('shortenedUrls', JSON.stringify(storedUrls));
        loadUrls();
      } catch (error) {
        console.error('Error deleting URL:', error);
        setError('Failed to delete URL. Please try again.');
      }
    }
  };

  const copyToClipboard = async (text, shortCode) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(shortCode);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      setError('Failed to copy URL. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch (error) {
      return 'Invalid date';
    }
  };

  const filteredAndSortedUrls = urls
    .filter(url => 
      url.longUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      url.shortUrl.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'createdAt') {
        return sortOrder === 'desc' 
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortBy === 'clicks') {
        return sortOrder === 'desc' ? b.clicks - a.clicks : a.clicks - b.clicks;
      }
      return 0;
    });

  const toggleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">URL Dashboard</h1>
          <Link 
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create New URL
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center space-x-2">
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

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search URLs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        ) : filteredAndSortedUrls.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <p className="text-gray-600">
              {searchTerm ? 'No URLs found matching your search.' : 'No shortened URLs yet. Create one to get started!'}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleSort('createdAt')}
                  >
                    Created At {sortBy === 'createdAt' && (sortOrder === 'desc' ? '↓' : '↑')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short URL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original URL</th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleSort('clicks')}
                  >
                    Clicks {sortBy === 'clicks' && (sortOrder === 'desc' ? '↓' : '↑')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedUrls.map((url) => (
                  <tr key={url.shortCode} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(url.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <a 
                          href={url.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          {url.shortUrl}
                        </a>
                        <button
                          onClick={() => copyToClipboard(url.shortUrl, url.shortCode)}
                          className="text-gray-400 hover:text-gray-600"
                          title="Copy to clipboard"
                        >
                          {copySuccess === url.shortCode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 truncate max-w-xs" title={url.longUrl}>{url.longUrl}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {url.clicks || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => deleteUrl(url.shortCode)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
} 