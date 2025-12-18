import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { APP_NAME, NAV_ITEMS } from '../../constants';
import Button from '../ui/Button';
import Logo from '../ui/Logo';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled ? 'bg-background/70 backdrop-blur-xl border-zinc-800 py-3' : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          {/* Logo Container */}
          <div className="text-white group-hover:scale-105 transition-transform duration-300">
            <Logo className="w-10 h-10" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-white">{APP_NAME}</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors tracking-wide"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
          <Button variant="outline" size="sm" onClick={() => scrollToSection('#waitlist')} className="rounded-full px-6">
            Join Waitlist
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-zinc-400 hover:text-white transition-colors p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#020204] border-b border-zinc-800 p-6 flex flex-col gap-6 animate-in slide-in-from-top-5">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              className="font-display text-2xl font-bold text-zinc-400 hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
          <Button className="w-full mt-4" onClick={() => scrollToSection('#waitlist')}>
            Join Waitlist
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;