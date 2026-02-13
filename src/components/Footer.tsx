'use client';

import { motion } from 'framer-motion';
import { Brain, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative bg-slate-900/50 border-t border-slate-700/30">
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Smart Interviewer</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              AI-powered interview preparation platform to help you land your dream job with confidence.
            </p>
            <div className="flex gap-4 mt-6">
              {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              {['Features', 'How It Works', 'Pricing', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-3">
              {['Interview Tips', 'Blog', 'Documentation', 'Support'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-700/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2026 Smart Interviewer. All Rights Reserved.
          </p>
          <p className="text-sm text-slate-500 flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> for Hackathon
          </p>
        </div>
      </div>
    </footer>
  );
}
