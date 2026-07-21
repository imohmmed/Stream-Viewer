import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageSquare, Mail, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    const form = e.target as HTMLFormElement;
    const data = {
      name:    (form.elements.namedItem('name')    as HTMLInputElement).value,
      email:   (form.elements.namedItem('email')   as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('server');
      setSubmitted(true);
    } catch {
      setError(isEn ? 'Failed to send. Please try WhatsApp or email directly.' : 'فشل الإرسال. تواصل عبر واتساب أو البريد مباشرةً.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-20 min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {isEn ? "Get in Touch" : "تواصل معنا"}
          </h1>
          <p className="text-foreground/60 text-lg">
            {isEn ? "We're here to help. Reach out via form, email, or WhatsApp." : "نحن هنا للمساعدة. تواصل معنا عبر النموذج أو البريد الإلكتروني أو واتساب."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Direct Contact Info */}
          <div className="col-span-1 flex flex-col gap-6">
            <div className="bg-card border border-white/10 p-6 rounded-2xl">
              <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
              <p className="text-foreground/60 text-sm mb-4">
                {isEn ? "Fastest response time for direct support." : "أسرع وقت استجابة للدعم المباشر."}
              </p>
              <a 
                href="https://wa.me/919154347808"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary font-semibold hover:underline"
              >
                +919154347808 &rarr;
              </a>
            </div>
            
            <div className="bg-card border border-white/10 p-6 rounded-2xl">
              <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-foreground/60 text-sm mb-4">
                {isEn ? "For formal inquiries and copyright claims." : "للاستفسارات الرسمية ومطالبات حقوق النشر."}
              </p>
              <a 
                href="mailto:aaaa35059@gmail.com"
                className="inline-flex items-center text-primary font-semibold hover:underline"
              >
                aaaa35059@gmail.com &rarr;
              </a>
            </div>
            
            <div className="p-6">
              <p className="text-sm font-medium text-foreground/50 text-center flex items-center justify-center gap-2">
                <CheckCircle2 size={16} className="text-primary" />
                {isEn ? "We respond within 24 hours" : "نرد خلال 24 ساعة"}
              </p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="col-span-1 md:col-span-2">
            <div className="bg-card border border-white/10 p-8 rounded-3xl shadow-xl">
              {submitted ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
                  <div className="h-20 w-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {isEn ? "Message Sent!" : "تم إرسال الرسالة!"}
                  </h3>
                  <p className="text-foreground/60 mb-8 max-w-sm">
                    {isEn ? "Thank you for reaching out. We will get back to you shortly." : "شكراً لتواصلك معنا. سنقوم بالرد عليك قريباً."}
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    {isEn ? "Send Another Message" : "إرسال رسالة أخرى"}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h3 className="text-2xl font-bold mb-4">
                    {isEn ? "Send a Message" : "أرسل رسالة"}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        {isEn ? "Full Name" : "الاسم الكامل"}
                      </label>
                      <input 
                        id="name"
                        type="text" 
                        required
                        className="bg-background border border-white/10 rounded-lg h-12 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder={isEn ? "John Doe" : "أحمد محمد"}
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        {isEn ? "Email Address" : "البريد الإلكتروني"}
                      </label>
                      <input 
                        id="email"
                        type="email" 
                        required
                        className="bg-background border border-white/10 rounded-lg h-12 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="john@example.com"
                        dir="ltr"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      {isEn ? "Subject" : "الموضوع"}
                    </label>
                    <select 
                      id="subject"
                      required
                      className="bg-background border border-white/10 rounded-lg h-12 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none"
                    >
                      <option value="">{isEn ? "Select a subject..." : "اختر الموضوع..."}</option>
                      <option value="general">{isEn ? "General Inquiry" : "استفسار عام"}</option>
                      <option value="technical">{isEn ? "Technical Support" : "دعم فني"}</option>
                      <option value="complaint">{isEn ? "Complaint" : "شكوى"}</option>
                      <option value="copyright">{isEn ? "Report Copyright" : "الإبلاغ عن حقوق النشر"}</option>
                      <option value="other">{isEn ? "Other" : "أخرى"}</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      {isEn ? "Message" : "الرسالة"}
                    </label>
                    <textarea 
                      id="message"
                      required
                      rows={5}
                      className="bg-background border border-white/10 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                      placeholder={isEn ? "How can we help you?" : "كيف يمكننا مساعدتك؟"}
                    />
                  </div>
                  
                  {error && (
                    <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">{error}</p>
                  )}
                  <Button type="submit" size="lg" className="w-full sm:w-auto self-start mt-2" disabled={sending}>
                    <Send className={`h-4 w-4 ${isEn ? 'mr-2' : 'ml-2'}`} />
                    {sending ? (isEn ? 'Sending...' : 'جاري الإرسال...') : (isEn ? "Send Message" : "إرسال الرسالة")}
                  </Button>
                </form>
              )}
            </div>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}
