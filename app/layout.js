import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from "./component/Footer";
import ErrorBoundary from './components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'URL Shortener - Create Short Links',
  description: 'Create short, memorable links for your long URLs. Free URL shortener with analytics and dashboard.',
  keywords: 'URL shortener, link shortener, short links, URL redirect',
  authors: [{ name: 'URL Shortener' }],
  openGraph: {
    title: 'URL Shortener - Create Short Links',
    description: 'Create short, memorable links for your long URLs',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3B82F6" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'} />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <Navbar />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
