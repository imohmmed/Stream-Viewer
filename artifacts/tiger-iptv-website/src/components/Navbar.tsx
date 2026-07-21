import React from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const { language, setLanguage, dir } = useLanguage();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const navLinks = [
    { href: '/', label: language === 'en' ? 'Home' : 'الرئيسية' },
    { href: '/privacy', label: language === 'en' ? 'Privacy' : 'الخصوصية' },
    { href: '/terms', label: language === 'en' ? 'Terms' : 'الشروط' },
    { href: '/contact', label: language === 'en' ? 'Contact' : 'اتصل بنا' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <img
                src={`${import.meta.env.BASE_URL}tiger_logo.png`}
                alt="TIGER IPTV"
                className="h-10 w-10 object-contain"
              />
              <span className="text-2xl font-display font-bold tracking-tighter text-primary">TIGER</span>
              <span className="text-xs font-medium tracking-widest text-white/50 uppercase mt-1">IPTV</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8 rtl:space-x-reverse">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location === link.href ? 'text-primary' : 'text-foreground/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="w-px h-4 bg-white/10 mx-2"></div>
              
              <button 
                onClick={toggleLanguage}
                className="text-sm font-bold text-foreground/70 hover:text-white transition-colors"
              >
                {language === 'en' ? 'عربي' : 'EN'}
              </button>
            </div>
          </div>
          
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="text-sm font-bold text-foreground/70"
            >
              {language === 'en' ? 'عربي' : 'EN'}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground/80 hover:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-white/5 pb-4 px-4 animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-4 pt-2">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-medium py-2 ${
                  location === link.href ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
