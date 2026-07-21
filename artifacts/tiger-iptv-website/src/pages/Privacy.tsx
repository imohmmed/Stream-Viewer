import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function Privacy() {
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
            {isEn ? "Privacy Policy" : "سياسة الخصوصية"}
          </h1>
          <p className="text-foreground/60">
            {isEn ? "Last updated: July 2026" : "آخر تحديث: يوليو 2026"}
          </p>
        </div>

        {isEn ? (
          <div className="prose prose-invert prose-orange max-w-none prose-headings:font-display prose-headings:font-bold">
            <p>
              <strong>Introduction:</strong> Thank you for choosing TIGER IPTV. We value your privacy and the security of your personal data. This Privacy Policy explains how your personal data is collected, used, stored, processed, and shared.
            </p>

            <h3>Personal Data We Collect:</h3>
            <ul>
              <li><strong>User Data:</strong> Name, username, email address (for account creation and support)</li>
              <li><strong>Usage Data:</strong> Device information, app usage statistics (anonymous), IP address for security</li>
            </ul>

            <h3>What We Use Your Personal Data For:</h3>
            <ul>
              <li>To provide and improve the TIGER IPTV service</li>
              <li>To troubleshoot and fix issues</li>
              <li>To respond to support requests and complaints</li>
              <li>To communicate important updates</li>
            </ul>

            <h3>Data Retention:</h3>
            <p>We retain your data only as long as necessary to provide the service.</p>

            <h3>User Rights:</h3>
            <p>You can request access to, correction of, or deletion of your personal data by contacting us.</p>

            <h3>Cookies:</h3>
            <p>Our website may use cookies to improve your browsing experience.</p>

            <h3>Contact:</h3>
            <p>For privacy inquiries, contact us via WhatsApp: <strong>+919154347808</strong> or email: <strong>aaaa35059@gmail.com</strong></p>
          </div>
        ) : (
          <div className="prose prose-invert prose-orange max-w-none prose-headings:font-display prose-headings:font-bold" dir="rtl">
            <p>
              <strong>مقدمة:</strong> شكراً لاختيارك تطبيق تايجر IPTV. نحن نقدر خصوصيتك وأمان بياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع بياناتك الشخصية واستخدامها وتخزينها ومعالجتها ومشاركتها.
            </p>

            <h3>البيانات الشخصية التي نجمعها:</h3>
            <ul>
              <li><strong>بيانات المستخدم:</strong> الاسم، اسم المستخدم، عنوان البريد الإلكتروني (لإنشاء الحساب والدعم الفني)</li>
              <li><strong>بيانات الاستخدام:</strong> معلومات الجهاز، إحصائيات استخدام التطبيق (مجهولة الهوية)، عنوان IP لأغراض الأمان</li>
            </ul>

            <h3>كيفية استخدام بياناتك الشخصية:</h3>
            <ul>
              <li>لتقديم خدمة تايجر IPTV وتحسينها</li>
              <li>لاستكشاف الأخطاء وإصلاحها</li>
              <li>للرد على طلبات الدعم والشكاوى</li>
              <li>للتواصل بشأن التحديثات المهمة</li>
            </ul>

            <h3>الاحتفاظ بالبيانات:</h3>
            <p>نحتفظ ببياناتك فقط طالما كان ذلك ضرورياً لتقديم الخدمة.</p>

            <h3>حقوق المستخدم:</h3>
            <p>يمكنك طلب الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها عن طريق التواصل معنا.</p>

            <h3>ملفات تعريف الارتباط:</h3>
            <p>قد يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربة التصفح.</p>

            <h3>التواصل:</h3>
            <p>للاستفسارات المتعلقة بالخصوصية، تواصل معنا عبر واتساب: <strong dir="ltr">+919154347808</strong> أو البريد الإلكتروني: <strong>aaaa35059@gmail.com</strong></p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
