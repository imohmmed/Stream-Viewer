require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

// ─── Config ────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
const BOT_TOKEN = process.env.BOT_TOKEN;
const ADMIN_ID = parseInt(process.env.ADMIN_ID || '0', 10);
const BLOCKED_IPS_FILE = process.env.BLOCKED_IPS_FILE || path.join(__dirname, 'blocked_ips.json');

// ─── Blocked IPs store ──────────────────────────────────────────────────────
function loadBlockedIps() {
  try {
    if (fs.existsSync(BLOCKED_IPS_FILE)) {
      return new Set(JSON.parse(fs.readFileSync(BLOCKED_IPS_FILE, 'utf8')));
    }
  } catch (e) { console.error('Failed to load blocked IPs:', e.message); }
  return new Set();
}
function saveBlockedIps(set) {
  try { fs.writeFileSync(BLOCKED_IPS_FILE, JSON.stringify([...set], null, 2)); }
  catch (e) { console.error('Failed to save blocked IPs:', e.message); }
}
let blockedIps = loadBlockedIps();

// ─── Express ────────────────────────────────────────────────────────────────
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Helper: real client IP
function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return fwd.split(',')[0].trim();
  return req.socket.remoteAddress || '';
}

// ─── GET /api/check ─────────────────────────────────────────────────────────
app.get('/api/check', (req, res) => {
  const ip = getClientIp(req);
  const blocked = blockedIps.has(ip);
  console.log(`[CHECK] ip=${ip} blocked=${blocked}`);
  res.json({ blocked, ip });
});

// ─── GET /api/health ────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ ok: true, blockedCount: blockedIps.size });
});

// ─── POST /api/contact ──────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'missing fields' });
  }

  const subjectLabels = {
    general: 'استفسار عام',
    technical: 'دعم فني',
    complaint: 'شكوى',
    copyright: 'حقوق نشر',
    other: 'أخرى',
  };
  const subjectLabel = subjectLabels[subject] || subject || 'غير محدد';

  console.log(`[CONTACT] from=${email} subject=${subject}`);

  // Send via Telegram if bot is running
  if (bot) {
    const text =
      `📩 *رسالة جديدة من الموقع*\n\n` +
      `👤 *الاسم:* ${name}\n` +
      `📧 *البريد:* ${email}\n` +
      `📌 *الموضوع:* ${subjectLabel}\n\n` +
      `💬 *الرسالة:*\n${message}`;
    try {
      await bot.sendMessage(ADMIN_ID, text, { parse_mode: 'Markdown' });
    } catch (e) {
      console.error('[CONTACT] Telegram send failed:', e.message);
    }
  }

  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`[SERVER] API running on port ${PORT}`));

// ─── Telegram Bot ───────────────────────────────────────────────────────────
let bot = null;
if (!BOT_TOKEN) {
  console.warn('[BOT] BOT_TOKEN not set — Telegram bot disabled');
} else {
  bot = new TelegramBot(BOT_TOKEN, { polling: true });
  console.log('[BOT] Telegram bot started');

  function isAdmin(msg) { return msg.from && msg.from.id === ADMIN_ID; }
  function deny(chatId) { bot.sendMessage(chatId, '❌ ليس لديك صلاحية لاستخدام هذا البوت.'); }

  bot.onText(/\/start/, (msg) => {
    if (!isAdmin(msg)) return deny(msg.chat.id);
    bot.sendMessage(msg.chat.id,
      `🐯 *TIGER IPTV — لوحة التحكم*\n\n` +
      `الأوامر المتاحة:\n` +
      `\`/block 1.2.3.4\` — حظر IP\n` +
      `\`/unblock 1.2.3.4\` — رفع الحظر\n` +
      `\`/list\` — قائمة المحظورين\n` +
      `\`/status 1.2.3.4\` — حالة IP\n` +
      `\`/stats\` — إحصائيات`,
      { parse_mode: 'Markdown' }
    );
  });

  bot.onText(/\/block (.+)/, (msg, match) => {
    if (!isAdmin(msg)) return deny(msg.chat.id);
    const ip = match[1].trim();
    if (!isValidIp(ip)) return bot.sendMessage(msg.chat.id, '⚠️ عنوان IP غير صالح.');
    blockedIps.add(ip);
    saveBlockedIps(blockedIps);
    bot.sendMessage(msg.chat.id, `✅ تم حظر \`${ip}\` بنجاح.\nإجمالي المحظورين: ${blockedIps.size}`, { parse_mode: 'Markdown' });
    console.log(`[BOT] Blocked: ${ip}`);
  });

  bot.onText(/\/unblock (.+)/, (msg, match) => {
    if (!isAdmin(msg)) return deny(msg.chat.id);
    const ip = match[1].trim();
    if (blockedIps.has(ip)) {
      blockedIps.delete(ip);
      saveBlockedIps(blockedIps);
      bot.sendMessage(msg.chat.id, `✅ تم رفع الحظر عن \`${ip}\`.`, { parse_mode: 'Markdown' });
    } else {
      bot.sendMessage(msg.chat.id, `ℹ️ \`${ip}\` غير موجود في قائمة الحظر.`, { parse_mode: 'Markdown' });
    }
  });

  bot.onText(/\/list/, (msg) => {
    if (!isAdmin(msg)) return deny(msg.chat.id);
    if (blockedIps.size === 0) return bot.sendMessage(msg.chat.id, 'ℹ️ قائمة الحظر فارغة.');
    const list = [...blockedIps].map((ip, i) => `${i + 1}. \`${ip}\``).join('\n');
    bot.sendMessage(msg.chat.id, `🚫 *IPs المحظورة (${blockedIps.size}):*\n\n${list}`, { parse_mode: 'Markdown' });
  });

  bot.onText(/\/status (.+)/, (msg, match) => {
    if (!isAdmin(msg)) return deny(msg.chat.id);
    const ip = match[1].trim();
    const status = blockedIps.has(ip) ? '🚫 محظور' : '✅ غير محظور';
    bot.sendMessage(msg.chat.id, `\`${ip}\` — ${status}`, { parse_mode: 'Markdown' });
  });

  bot.onText(/\/stats/, (msg) => {
    if (!isAdmin(msg)) return deny(msg.chat.id);
    bot.sendMessage(msg.chat.id,
      `📊 *إحصائيات TIGER IPTV*\n\n` +
      `🚫 IPs محظورة: ${blockedIps.size}\n` +
      `🟢 الخادم يعمل`,
      { parse_mode: 'Markdown' }
    );
  });

  bot.on('polling_error', (err) => console.error('[BOT ERROR]', err.message));
}

// ─── Helpers ────────────────────────────────────────────────────────────────
function isValidIp(ip) {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip) || /^[0-9a-fA-F:]{3,39}$/.test(ip);
}
