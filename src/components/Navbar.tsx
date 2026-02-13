'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Brain } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#tutorials' },
    { label: 'Reviews', href: '#reviews' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Smart Interviewer
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-slate-300 hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm text-slate-300 hover:text-white transition-colors px-4 py-2"
          >
            Sign In
          </Link>
          <Link
            href="/interview"
            className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-slate-300 hover:text-white"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-slate-300 hover:text-white transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-slate-700/50 space-y-3">
                <Link
                  href="/login"
                  className="block text-center text-slate-300 hover:text-white transition-colors py-2"
                >
                  Sign In
                </Link>
                <Link
                  href="/interview"
                  className="block text-center font-semibold px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
