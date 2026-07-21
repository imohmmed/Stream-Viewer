import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone, Tv, Tablet, Play, Shield, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { language, dir } = useLanguage();
  const isEn = language === 'en';

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-10 pb-20 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-hero-glow z-10 opacity-70 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background z-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-20" />
          <img 
            src="/attached_assets/generated_images/tiger-hero.jpg" 
            alt="Cinematic Streaming" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
        </div>

        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8 backdrop-blur-sm">
              <Zap size={16} />
              <span className="text-sm font-medium tracking-wide">
                {isEn ? "The Premium Player for Apple Ecosystem" : "المشغل الأفضل لنظام آبل"}
              </span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-display font-black tracking-tighter text-white mb-2 drop-shadow-2xl">
              TIGER <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-400">IPTV</span>
            </h1>
            
            <p className="mt-6 text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto font-light leading-relaxed">
              {isEn 
                ? "Experience your content in stunning quality. The most advanced, beautiful, and completely free IPTV player for iOS, macOS, and tvOS."
                : "استمتع بمحتواك بأعلى جودة. مشغل IPTV الأكثر تطوراً وجمالاً ومجاني بالكامل لأجهزة iOS و macOS و tvOS."
              }
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="w-full sm:w-auto text-lg group">
                <Play className="mr-2 h-5 w-5 fill-current" />
                {isEn ? "Download Free" : "تحميل مجاني"}
                <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block rtl:hidden">&rarr;</span>
                <span className="mr-2 group-hover:-translate-x-1 transition-transform inline-block ltr:hidden">&larr;</span>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg bg-background/50 backdrop-blur-md">
                {isEn ? "Learn More" : "اكتشف المزيد"}
              </Button>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-foreground/50 opacity-80">
              <div className="flex flex-col items-center gap-2"><Smartphone size={28} /> <span className="text-xs font-medium">iOS</span></div>
              <div className="flex flex-col items-center gap-2"><Tablet size={28} /> <span className="text-xs font-medium">iPadOS</span></div>
              <div className="flex flex-col items-center gap-2"><Monitor size={28} /> <span className="text-xs font-medium">macOS</span></div>
              <div className="flex flex-col items-center gap-2"><Tv size={28} /> <span className="text-xs font-medium">tvOS</span></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 100% FREE SECTION */}
      <section className="py-24 bg-card/30 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={container}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={item}>
              <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                {isEn ? "Premium features." : "ميزات احترافية."}
                <br/>
                <span className="text-primary">{isEn ? "Zero cost." : "بدون تكلفة."}</span>
              </h2>
              <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                {isEn 
                  ? "TIGER IPTV believes in providing a world-class streaming experience without locking features behind a paywall. No subscriptions, no hidden fees, completely free forever."
                  : "يؤمن تايجر IPTV بتقديم تجربة بث عالمية المستوى دون إخفاء الميزات وراء جدار الدفع. لا اشتراكات، لا رسوم خفية، مجاني بالكامل للأبد."}
              </p>
              
              <ul className="space-y-4">
                {[
                  isEn ? "No monthly subscription fees" : "بدون رسوم اشتراك شهرية",
                  isEn ? "No premium feature paywalls" : "بدون حظر للميزات الاحترافية",
                  isEn ? "No intrusive advertisements" : "بدون إعلانات مزعجة",
                  isEn ? "No credit card required" : "لا يتطلب بطاقة ائتمان"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground/80 font-medium">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div variants={item} className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-[100px] rounded-full z-0"></div>
              <div className="relative z-10 bg-background border border-white/10 p-8 rounded-3xl shadow-2xl overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-9xl font-black italic">100%</span>
                </div>
                <h3 className="text-3xl font-display font-bold mb-4 relative z-10">
                  {isEn ? "Bring your own content" : "أضف محتواك الخاص"}
                </h3>
                <p className="text-foreground/60 mb-6 relative z-10">
                  {isEn 
                    ? "TIGER is a player, not a provider. Simply add your Xtream Codes API or M3U playlist and instantly transform your Apple device into the ultimate entertainment hub."
                    : "تايجر هو مشغل وليس مزود. ببساطة أضف Xtream Codes API أو قائمة M3U الخاصة بك وحول جهاز آبل الخاص بك إلى مركز ترفيهي متكامل."}
                </p>
                <div className="bg-card border border-white/5 p-4 rounded-xl flex items-center justify-between relative z-10">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{isEn ? "Xtream Codes" : "اكستريم كودز"}</span>
                    <span className="text-xs text-foreground/50">Login with API</span>
                  </div>
                  <div className="h-8 w-px bg-white/10 mx-4"></div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{isEn ? "M3U Playlist" : "قائمة M3U"}</span>
                    <span className="text-xs text-foreground/50">URL or Local</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-display font-bold mb-6">
              {isEn ? "Designed for the ultimate viewing experience" : "مصمم لتجربة مشاهدة لا مثيل لها"}
            </h2>
            <p className="text-lg text-foreground/60">
              {isEn 
                ? "Every feature you need to enjoy your Live TV, VOD, and Series, wrapped in an elegant dark-mode interface."
                : "كل الميزات التي تحتاجها للاستمتاع بالبث المباشر والأفلام والمسلسلات، في واجهة أنيقة بالوضع الليلي."}
            </p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={container}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                title: isEn ? "4K & HD Playback" : "تشغيل بدقة 4K و HD",
                desc: isEn ? "Hardware-accelerated rendering for buttery smooth 4K streaming without draining your battery." : "تسريع الأجهزة لتشغيل سلس بدقة 4K دون استنزاف بطاريتك."
              },
              {
                title: isEn ? "Picture-in-Picture" : "صورة داخل صورة (PiP)",
                desc: isEn ? "Never miss a moment. Keep watching your stream while using other apps on your device." : "لا تفوت أي لحظة. استمر في مشاهدة البث أثناء استخدام تطبيقات أخرى."
              },
              {
                title: isEn ? "Live TV, VOD, Series" : "مباشر، أفلام، مسلسلات",
                desc: isEn ? "Beautifully organized categories with poster artwork, EPG (TV Guide), and IMDb metadata." : "فئات منظمة بشكل جميل مع صور الملصقات ودليل التلفزيون (EPG) وبيانات IMDb."
              },
              {
                title: isEn ? "Multi-Language & Subs" : "متعدد اللغات والترجمة",
                desc: isEn ? "Switch audio tracks and subtitle streams seamlessly while watching." : "قم بتبديل المسارات الصوتية وملفات الترجمة بسلاسة أثناء المشاهدة."
              },
              {
                title: isEn ? "iCloud Sync" : "مزامنة iCloud",
                desc: isEn ? "Add your playlist on iPhone, watch on Apple TV. Your content syncs across your ecosystem." : "أضف قائمتك على الايفون، وشاهدها على ابل تي في. المحتوى يتزامن عبر جميع أجهزتك."
              },
              {
                title: isEn ? "Favorites & Continue" : "المفضلة والمتابعة",
                desc: isEn ? "Easily heart your favorite channels and pick up movies exactly where you left off." : "أضف قنواتك المفضلة بسهولة وتابع الأفلام من حيث توقفت."
              }
            ].map((feature, idx) => (
              <motion.div key={idx} variants={item} className="bg-card border border-white/5 p-8 rounded-2xl hover:border-primary/30 transition-colors group">
                <div className="h-2 w-12 bg-primary/50 rounded-full mb-6 group-hover:w-full group-hover:bg-primary transition-all duration-500"></div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl font-display font-bold mb-8">
            {isEn ? "Ready to upgrade your stream?" : "هل أنت مستعد لترقية تجربة المشاهدة؟"}
          </h2>
          <p className="text-xl text-foreground/70 mb-10 max-w-2xl mx-auto">
            {isEn ? "Join thousands of users who have made TIGER their default IPTV player on Apple devices." : "انضم لآلاف المستخدمين الذين جعلوا تايجر مشغل IPTV الأساسي على أجهزة آبل."}
          </p>
          <Button size="lg" className="h-16 px-10 text-xl shadow-[0_0_40px_rgba(255,127,0,0.3)]">
            <Play className="mr-3 h-6 w-6 fill-current" />
            {isEn ? "Get TIGER for iOS & tvOS" : "حمل تايجر لـ iOS و tvOS"}
          </Button>
        </div>
      </section>

    </div>
  );
}
