'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-cyan-300 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              <span className="text-blue-500">URL</span> Shortener
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg transition-colors ${
                pathname === '/'
                  ? 'bg-blue-300 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`px-4 py-2 rounded-lg transition-colors ${
                pathname === '/about'
                  ? 'bg-amber-300 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              About
            </Link>
            <Link
              href="/dashboard"
              className={`px-4 py-2 rounded-lg transition-colors ${
                pathname === '/dashboard'
                  ? 'bg-cyan-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 