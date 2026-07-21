import React from 'react';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-card border-t border-white/5 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-start">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-display font-bold tracking-tighter text-primary">TIGER</span>
              <span className="text-sm font-medium tracking-widest text-white/50 uppercase mt-1">IPTV</span>
            </div>
            <p className="text-sm text-foreground/50 mt-2 max-w-xs">
              {language === 'en' 
                ? 'The ultimate premium IPTV experience for Apple devices.' 
                : 'أفضل تجربة IPTV متميزة لأجهزة آبل.'}
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <Link href="/" className="text-sm text-foreground/70 hover:text-primary transition-colors">
              {language === 'en' ? 'Home' : 'الرئيسية'}
            </Link>
            <Link href="/privacy" className="text-sm text-foreground/70 hover:text-primary transition-colors">
              {language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
            </Link>
            <Link href="/terms" className="text-sm text-foreground/70 hover:text-primary transition-colors">
              {language === 'en' ? 'Terms & Conditions' : 'الشروط والأحكام'}
            </Link>
            <Link href="/contact" className="text-sm text-foreground/70 hover:text-primary transition-colors">
              {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
            </Link>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-3">
            <a 
              href="https://wa.me/919154347808" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-foreground/70 hover:text-primary transition-colors"
            >
              WhatsApp: +919154347808
            </a>
            <a 
              href="mailto:aaaa35059@gmail.com" 
              className="text-sm text-foreground/70 hover:text-primary transition-colors"
            >
              Email: aaaa35059@gmail.com
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-foreground/40">
            &copy; 2026 TIGER IPTV. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
          </p>
          <p className="text-xs text-foreground/30 max-w-xl text-center md:text-right rtl:md:text-left">
            {language === 'en' 
              ? 'TIGER IPTV does not provide any content, subscriptions, or streams. Users must provide their own content.' 
              : 'تطبيق تايجر IPTV لا يوفر أي محتوى أو اشتراكات أو بث. يجب على المستخدمين توفير المحتوى الخاص بهم.'}
          </p>
        </div>
      </div>
    </footer>
  );
};
