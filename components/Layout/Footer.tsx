import React from 'react';
import { Twitter, Mail } from 'lucide-react';
import { APP_NAME } from '../../constants';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-zinc-800 bg-background">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4 text-zinc-50">
            <Logo className="w-6 h-6" />
            <span className="font-bold">{APP_NAME}</span>
          </div>
          <p className="text-zinc-500 text-sm max-w-xs font-medium">
            Built for practice sessions, not production sessions.
          </p>
        </div>

        <div className="flex gap-6">
          <a href="#" className="text-zinc-600 hover:text-white transition-colors" aria-label="Twitter">
            <Twitter size={18} />
          </a>
          <a href="mailto:hello@aeon.demo" className="text-zinc-600 hover:text-white transition-colors" aria-label="Email">
            <Mail size={18} />
          </a>
        </div>

        <div className="text-zinc-700 text-xs">
          &copy; {new Date().getFullYear()} {APP_NAME}.
        </div>
      </div>
    </footer>
  );
};

export default Footer;