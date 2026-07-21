import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Copyright() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className={`min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8 ${isAr ? 'rtl' : 'ltr'}`}>
      <div className="max-w-3xl mx-auto">

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border border-primary/20">
            {isAr ? 'مجرد مشغّل وسائط | لا يتضمن قنوات' : 'Just a Media Player | No Channels Included'}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-center text-white mb-3">
          {isAr ? 'شكوى انتهاك حقوق الملكية الفكرية' : 'Copyright Complaint Process'}
        </h1>
        <p className="text-center text-foreground/40 text-sm mb-12">
          {isAr ? 'إجراء معالجة انتهاكات حقوق الملكية الفكرية' : 'Infringement Redressal'}
        </p>

        {/* Key disclaimer */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 mb-10">
          <p className="text-primary font-semibold text-center text-lg">
            {isAr
              ? '⚠️ TIGER IPTV هو مجرد مشغّل وسائط — لا يتضمن قنوات أو محتوى أو بث'
              : '⚠️ TIGER IPTV is Just a Media Player — No Channels Included'}
          </p>
          <p className="text-foreground/60 text-sm text-center mt-2">
            {isAr
              ? 'التطبيق لا يوفر أي محتوى أو روابط بث أو اشتراكات. المستخدمون يوفّرون قوائم التشغيل الخاصة بهم بشكل مستقل.'
              : 'The app does not provide any content, streaming links, or subscriptions. Users independently supply their own playlists.'}
          </p>
        </div>

        {/* Section 1 — Our Position */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">1</span>
            {isAr ? 'موقفنا' : 'Our Position'}
          </h2>
          <ul className="space-y-3">
            {(isAr ? [
              'TIGER IPTV هو مجرد مشغّل وسائط — لا يتضمن قنوات أو محتوى أو بث.',
              'التطبيق وسيط فقط يتيح للمستخدمين تشغيل قوائم التشغيل التي يوفّرونها بأنفسهم.',
              'لا نستضيف أي محتوى ولا نتحكم في المصادر التي يدخلها المستخدمون.',
              'نأخذ انتهاكات حقوق الملكية الفكرية بجدية تامة ونتعاون مع أصحاب الحقوق.',
              'نتخذ إجراءات فورية عند التحقق من أي انتهاك مبلَّغ عنه.',
            ] : [
              'TIGER IPTV is Just a Media Player — No Channels Included.',
              'The app is an intermediary only, enabling users to play playlists they independently provide.',
              'We do not host any content or control the sources users enter.',
              'TIGER IPTV takes copyright infringement very seriously and cooperates with rights holders.',
              'We act promptly upon verification of any reported infringement.',
            ]).map((item, i) => (
              <li key={i} className="flex gap-3 text-foreground/70 text-sm leading-relaxed">
                <span className="text-primary mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 2 — How to File */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">2</span>
            {isAr ? 'كيفية تقديم شكوى' : 'How to File a Complaint'}
          </h2>
          <p className="text-foreground/60 text-sm mb-4 leading-relaxed">
            {isAr
              ? 'يجب على صاحب حق النشر أو ممثله المعتمد إرسال إشعار يتضمن:'
              : 'The copyright owner or their authorized representative must send a notice containing:'}
          </p>
          <ul className="space-y-3">
            {(isAr ? [
              'الاسم الكامل ومعلومات الاتصال.',
              'وصف تفصيلي للمحتوى محل الانتهاك.',
              'الرابط أو الموقع الدقيق للمحتوى.',
              'بيان بأنك تعتقد بحسن نية أن الاستخدام غير مرخّص.',
              'توقيع إلكتروني أو يدوي.',
            ] : [
              'Full name and contact information.',
              'A detailed description of the copyrighted content allegedly infringed.',
              'The specific URL or location of the allegedly infringing content.',
              'A statement that you believe in good faith the use is unauthorized.',
              'An electronic or physical signature.',
            ]).map((item, i) => (
              <li key={i} className="flex gap-3 text-foreground/70 text-sm leading-relaxed">
                <span className="text-primary mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 3 — Process */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">3</span>
            {isAr ? 'إجراء المعالجة' : 'Redressal Process'}
          </h2>
          <ul className="space-y-3">
            {(isAr ? [
              'بعد استلام الشكوى، سيتم إشعار المستخدم المعني لمنحه فرصة للرد.',
              'بعد مراجعة الإشعار والرد، سيتم اتخاذ الإجراء المناسب.',
              'في حالة الانتهاكات المتكررة، سيتم إلغاء الوصول نهائياً.',
              'TIGER IPTV — مجرد مشغّل وسائط | لا يتضمن قنوات — لا يتحمل مسؤولية المحتوى الذي يوفره المستخدمون.',
            ] : [
              'Upon receipt, the concerned user will be notified and given an opportunity to respond.',
              'After reviewing the notice and reply, appropriate action will be taken.',
              'Repeat offenders will have their access permanently revoked.',
              'TIGER IPTV — Just a Media Player | No Channels Included — bears no liability for content supplied by users.',
            ]).map((item, i) => (
              <li key={i} className="flex gap-3 text-foreground/70 text-sm leading-relaxed">
                <span className="text-primary mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact box */}
        <div className="bg-card border border-white/10 rounded-2xl p-8 text-center">
          <p className="text-foreground/60 text-sm mb-4">
            {isAr
              ? 'لتقديم شكوى انتهاك حقوق ملكية فكرية، تواصل معنا عبر:'
              : 'To submit a copyright infringement complaint, contact us via:'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:aaaa35059@gmail.com"
              className="inline-flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary text-sm font-medium px-6 py-3 rounded-xl transition-colors"
            >
              ✉️ aaaa35059@gmail.com
            </a>
            <a
              href="https://wa.me/919154347808"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 text-sm font-medium px-6 py-3 rounded-xl transition-colors"
            >
              💬 WhatsApp +919154347808
            </a>
          </div>
          <p className="text-foreground/30 text-xs mt-6">
            {isAr
              ? 'TIGER IPTV — مجرد مشغّل وسائط | لا يتضمن قنوات'
              : 'TIGER IPTV — Just a Media Player | No Channels Included'}
          </p>
        </div>

      </div>
    </div>
  );
}
