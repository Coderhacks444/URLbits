'use client';
import Link from 'next/link';

export default function About() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow max-w-4xl mx-auto px-4 py-20 w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            About <span className="text-blue-500">URL</span> Shortener
          </h1>
          
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Do</h2>
              <p className="leading-relaxed">
                URL Shortener is a free service that helps you create short, memorable links from long URLs. 
                Our platform makes it easy to share links across social media, emails, and other platforms 
                where character count matters.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Features</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Instant URL shortening</li>
                <li>Custom short codes</li>
                <li>Click tracking and analytics</li>
                <li>Secure and reliable service</li>
                <li>Free to use</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Enter your long URL in the input field</li>
                <li>Click the &quot;Shorten URL&quot; button</li>
                <li>Get your shortened URL instantly</li>
                <li>Share your shortened URL anywhere</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Privacy &amp; Security</h2>
              <p className="leading-relaxed">
                We take your privacy seriously. Our service doesn&apos;t store any personal information, 
                and we use industry-standard security measures to protect your data. All URLs are 
                encrypted and stored securely.
              </p>
            </section>

            <div className="pt-6">
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Shortening URLs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
