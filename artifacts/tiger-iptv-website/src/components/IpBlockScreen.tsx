import React from 'react';

export const IpBlockScreen = () => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        fontFamily: "'Cairo', sans-serif",
        direction: 'rtl',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <img
        src="/tiger_logo_full.png"
        alt="TIGER IPTV"
        style={{ width: 96, height: 96, marginBottom: 32, opacity: 0.6 }}
      />
      <div
        style={{
          background: 'rgba(220,38,38,0.1)',
          border: '1px solid rgba(220,38,38,0.4)',
          borderRadius: 16,
          padding: '40px 48px',
          maxWidth: 480,
          width: '100%',
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>🚫</div>
        <h1
          style={{
            color: '#ef4444',
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          تم حظر الوصول
        </h1>
        <p
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 16,
            lineHeight: 1.8,
            marginBottom: 8,
          }}
        >
          تم حظر عنوان IP الخاص بك من الوصول إلى هذه الخدمة.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
          للاستفسار، تواصل معنا عبر واتساب
        </p>
        <a
          href="https://wa.me/919154347808"
          style={{
            display: 'inline-block',
            marginTop: 20,
            padding: '10px 24px',
            background: '#25d366',
            color: '#fff',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 15,
            textDecoration: 'none',
          }}
        >
          تواصل عبر واتساب
        </a>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, marginTop: 32 }}>
        TIGER IPTV — tiger-iptv.com
      </p>
    </div>
  );
};
