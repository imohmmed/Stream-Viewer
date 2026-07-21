import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function Terms() {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-20 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-primary">
            {isEn ? "Terms & Conditions" : "الشروط والأحكام"}
          </h1>
        </div>

        {isEn ? (
          <div className="prose prose-invert prose-orange max-w-none prose-headings:font-display prose-headings:font-bold">
            <p>
              <strong>Acceptance of Terms:</strong> By downloading, installing, accessing, or using the TIGER IPTV application, you confirm you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>

            <div className="bg-destructive/10 border-l-4 border-destructive p-4 my-6 rounded-r-lg">
              <h3 className="text-destructive mt-0 mb-2">Important Notice:</h3>
              <ul className="mb-0 text-foreground/80">
                <li>TIGER IPTV is designed to be used with users' own playlists and legal content</li>
                <li>TIGER IPTV does not provide any IPTV subscription, channels, movies, or content of any kind</li>
                <li>TIGER IPTV does not endorse streaming of copyright-protected material without permission</li>
                <li>Users are solely responsible for the legality of any content they add to the app</li>
                <li>TIGER IPTV has no affiliation with any third-party content provider</li>
              </ul>
            </div>

            <h3>Introduction:</h3>
            <p>TIGER IPTV provides an advanced IPTV player application for iOS, iPadOS, macOS, and tvOS platforms. The app supports M3U playlists and Xtream Codes API for playing your own content.</p>

            <h3>The Service is Free:</h3>
            <p>TIGER IPTV is completely free to download and use. There are no subscription fees, no hidden charges, and no in-app purchases required to access any feature.</p>

            <h3>Prohibited Uses:</h3>
            <p>Users may not use the app to stream copyright-protected content without authorization. Users may not reverse-engineer, modify, or distribute the app.</p>

            <h3>Disclaimer:</h3>
            <ul>
              <li>TIGER IPTV does not provide or solicit any audiovisual content</li>
              <li>TIGER IPTV has no affiliation with any third-party provider</li>
              <li>We strictly do not endorse streaming of copyright-protected material without permission</li>
            </ul>

            <h3>Limitation of Liability:</h3>
            <p>TIGER IPTV is provided "as is" without warranty of any kind. We are not responsible for any content streamed through the app.</p>

            <h3>Contact:</h3>
            <p>Email: aaaa35059@gmail.com | WhatsApp: +919154347808</p>
          </div>
        ) : (
          <div className="prose prose-invert prose-orange max-w-none prose-headings:font-display prose-headings:font-bold" dir="rtl">
            <p>
              <strong>قبول الشروط:</strong> بتنزيل تطبيق تايجر IPTV أو تثبيته أو الوصول إليه أو استخدامه، فإنك تؤكد أنك قد قرأت هذه الشروط والأحكام وفهمتها وتوافق على الالتزام بها.
            </p>

            <div className="bg-destructive/10 border-r-4 border-destructive p-4 my-6 rounded-l-lg">
              <h3 className="text-destructive mt-0 mb-2">إشعار مهم:</h3>
              <ul className="mb-0 text-foreground/80">
                <li>تطبيق تايجر IPTV مصمم للاستخدام مع قوائم تشغيل المستخدمين الخاصة والمحتوى القانوني</li>
                <li>لا يقدم تطبيق تايجر IPTV أي اشتراك IPTV أو قنوات أو أفلام أو أي محتوى من أي نوع</li>
                <li>لا يدعم تطبيق تايجر IPTV بث المواد المحمية بحقوق الطبع والنشر دون إذن</li>
                <li>المستخدمون مسؤولون وحدهم عن مشروعية أي محتوى يضيفونه إلى التطبيق</li>
                <li>لا يرتبط تطبيق تايجر IPTV بأي مزود محتوى تابع لجهة خارجية</li>
              </ul>
            </div>

            <h3>مقدمة:</h3>
            <p>يوفر تطبيق تايجر IPTV مشغل IPTV متقدم لمنصات iOS وiPadOS وmacOS وtvOS. يدعم التطبيق قوائم تشغيل M3U وواجهة برمجة تطبيقات Xtream Codes لتشغيل المحتوى الخاص بك.</p>

            <h3>الخدمة مجانية:</h3>
            <p>تطبيق تايجر IPTV مجاني تماماً للتنزيل والاستخدام. لا توجد رسوم اشتراك ولا رسوم خفية ولا مشتريات داخل التطبيق مطلوبة للوصول إلى أي ميزة.</p>

            <h3>الاستخدامات المحظورة:</h3>
            <p>لا يجوز للمستخدمين استخدام التطبيق لبث المحتوى المحمي بحقوق الطبع والنشر دون إذن. لا يجوز للمستخدمين إجراء هندسة عكسية للتطبيق أو تعديله أو توزيعه.</p>

            <h3>إخلاء المسؤولية:</h3>
            <ul>
              <li>لا يقدم تطبيق تايجر IPTV أو يطلب أي محتوى مرئي أو مسموع</li>
              <li>لا يرتبط تطبيق تايجر IPTV بأي مزود تابع لجهة خارجية</li>
              <li>نرفض بشكل صارم دعم بث المواد المحمية بحقوق الطبع والنشر دون إذن</li>
            </ul>

            <h3>تحديد المسؤولية:</h3>
            <p>يُقدَّم تطبيق تايجر IPTV "كما هو" دون أي ضمان من أي نوع. نحن غير مسؤولين عن أي محتوى يتم بثه عبر التطبيق.</p>

            <h3>التواصل:</h3>
            <p>البريد الإلكتروني: aaaa35059@gmail.com | واتساب: <span dir="ltr">+919154347808</span></p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
