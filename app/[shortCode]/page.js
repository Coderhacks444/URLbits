'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function ShortUrlRedirect({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const shortCode = unwrappedParams.shortCode;

  useEffect(() => {
    const redirectToLongUrl = () => {
      try {
        // Validate shortCode format
        if (!/^[A-Za-z0-9]{6}$/.test(shortCode)) {
          router.push('/?error=' + encodeURIComponent('Invalid URL format'));
          return;
        }

        const urls = JSON.parse(localStorage.getItem('shortenedUrls') || '{}');
        const urlData = urls[shortCode];
        
        if (urlData) {
          // Update click count and last accessed time
          urlData.clicks = (urlData.clicks || 0) + 1;
          urlData.lastAccessed = new Date().toISOString();
          urls[shortCode] = urlData;
          localStorage.setItem('shortenedUrls', JSON.stringify(urls));
          
          // Redirect to the original URL
          const longUrl = typeof urlData === 'string' ? urlData : urlData.url;
          window.location.href = longUrl;
        } else {
          router.push('/?error=' + encodeURIComponent('Invalid or expired short URL'));
        }
      } catch (error) {
        console.error('Error redirecting:', error);
        router.push('/?error=' + encodeURIComponent('Failed to redirect. Please try again.'));
      }
    };

    redirectToLongUrl();
  }, [shortCode, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Redirecting...</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Please wait while we redirect you to your destination.</p>
      </div>
    </div>
  );
} 