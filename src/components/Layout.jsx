import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function Layout({ children }) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      
      <div className="min-h-screen bg-black text-white">
        <header className="border-b border-gray-800">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-4xl font-bold text-yellow-400">
                <span className="bg-gradient-to-r from-[#CC5500] via-[#722F37] to-[#355E3B] text-transparent bg-clip-text">LUDO COMEDY</span>
              </Link>
              <div className="space-x-6">
                <Link to="/" className="hover:text-yellow-400">Home</Link>
                <a href="/#shows" className="hover:text-yellow-400">Shows</a>
                <a href="/#contact" className="hover:text-yellow-400">Contact</a>
              </div>
            </div>
          </nav>
        </header>
        
        <main>{children}</main>
        
        <footer className="border-t border-gray-800 mt-20">
          <div className="container mx-auto px-4 py-8 text-center text-gray-400">
            <p>&copy; 2025 Ludo Comedy.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Layout;