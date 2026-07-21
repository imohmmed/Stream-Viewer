import * as React from "react"
import { useLanguage } from '@/contexts/LanguageContext'

export default function NotFound() {
  const { language } = useLanguage();
  const isEn = language === 'en';
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-display font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">{isEn ? "Page Not Found" : "الصفحة غير موجودة"}</h2>
        <p className="text-foreground/60 mb-8 max-w-sm mx-auto">
          {isEn 
            ? "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable." 
            : "الصفحة التي تبحث عنها ربما تمت إزالتها، أو تم تغيير اسمها، أو غير متاحة مؤقتاً."}
        </p>
        <a href="/" className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
          {isEn ? "Return Home" : "العودة للرئيسية"}
        </a>
      </div>
    </div>
  )
}
