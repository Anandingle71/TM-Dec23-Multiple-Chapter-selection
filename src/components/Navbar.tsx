import React, { useState } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import { AuthModal } from './AuthModal';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);

  return (
    <>
      <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">TeacherMate</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-indigo-600">Features</a>
              <a href="#benefits" className="text-gray-600 hover:text-indigo-600">Benefits</a>
              <a href="#curriculum" className="text-gray-600 hover:text-indigo-600">Curriculum</a>
              <button 
                onClick={() => setAuthModal('login')}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Login
              </button>
              <button 
                onClick={() => setAuthModal('signup')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Sign Up
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-indigo-600">Features</a>
              <a href="#benefits" className="block px-3 py-2 text-gray-600 hover:text-indigo-600">Benefits</a>
              <a href="#curriculum" className="block px-3 py-2 text-gray-600 hover:text-indigo-600">Curriculum</a>
              <button 
                onClick={() => {
                  setAuthModal('login');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-indigo-600 hover:text-indigo-800"
              >
                Login
              </button>
              <button 
                onClick={() => {
                  setAuthModal('signup');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>

      <AuthModal 
        isOpen={authModal !== null}
        onClose={() => setAuthModal(null)}
        type={authModal || 'login'}
      />
    </>
  );
}