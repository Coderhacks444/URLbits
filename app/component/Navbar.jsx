import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-400">bit</span>
              <span className="text-2xl font-bold text-white">URL</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link href="/" className="  border-2 border-blue-300 text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link href="/dashboard" className="border-2 border-blue-300 text-white hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </Link>
              <Link href="/about" className=" border-2 border-blue-300 text-white hover:text-cyan-500 px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;