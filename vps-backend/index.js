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
  } catch (e) {
    console.error('Failed to load blocked IPs:', e.message);
  }
  return new Set();
}

function saveBlockedIps(set) {
  try {
    fs.writeFileSync(BLOCKED_IPS_FILE, JSON.stringify([...set], null, 2));
  } catch (e) {
    console.error('Failed to save blocked IPs:', e.message);
  }
}

let blockedIps = loadBlockedIps();

// ─── Express ────────────────────────────────────────────────────────────────
const app = express();
app.use(express.json());

// CORS for website
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://tiger-iptv.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

// Helper: get real client IP (behind Nginx proxy)
function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.socket.remoteAddress || '';
}

// GET /api/check — returns { blocked, ip }
app.get('/api/check', (req, res) => {
  const ip = getClientIp(req);
  const blocked = blockedIps.has(ip);
  console.log(`[CHECK] ip=${ip} blocked=${blocked}`);
  res.json({ blocked, ip });
});

// GET /api/health
app.get('/api/health', (req, res) => {
  res.json({ ok: true, blockedCount: blockedIps.size });
});

app.listen(PORT, () => console.log(`API running on port ${PORT}`));

// ─── Telegram Bot ───────────────────────────────────────────────────────────
if (!BOT_TOKEN) {
  console.warn('BOT_TOKEN not set — Telegram bot disabled');
} else {
  const bot = new TelegramBot(BOT_TOKEN, { polling: true });
  console.log('Telegram bot started');

  // Auth guard
  function isAdmin(msg) {
    return msg.from && msg.from.id === ADMIN_ID;
  }

  function deny(chatId) {
    bot.sendMessage(chatId, '❌ ليس لديك صلاحية لاستخدام هذا البوت.');
  }

  // /start
  bot.onText(/\/start/, (msg) => {
    if (!isAdmin(msg)) return deny(msg.chat.id);
    bot.sendMessage(msg.chat.id,
      `🐯 *TIGER IPTV — نظام حظر IP*\n\n` +
      `الأوامر المتاحة:\n` +
      `\`/block 1.2.3.4\` — حظر IP\n` +
      `\`/unblock 1.2.3.4\` — رفع الحظر\n` +
      `\`/list\` — عرض قائمة المحظورين\n` +
      `\`/status 1.2.3.4\` — التحقق من حالة IP`,
      { parse_mode: 'Markdown' }
    );
  });

  // /block <ip>
  bot.onText(/\/block (.+)/, (msg, match) => {
    if (!isAdmin(msg)) return deny(msg.chat.id);
    const ip = match[1].trim();
    if (!isValidIp(ip)) return bot.sendMessage(msg.chat.id, '⚠️ عنوان IP غير صالح.');
    blockedIps.add(ip);
    saveBlockedIps(blockedIps);
    bot.sendMessage(msg.chat.id, `✅ تم حظر \`${ip}\` بنجاح.`, { parse_mode: 'Markdown' });
    console.log(`[BOT] Blocked IP: ${ip}`);
  });

  // /unblock <ip>
  bot.onText(/\/unblock (.+)/, (msg, match) => {
    if (!isAdmin(msg)) return deny(msg.chat.id);
    const ip = match[1].trim();
    if (blockedIps.has(ip)) {
      blockedIps.delete(ip);
      saveBlockedIps(blockedIps);
      bot.sendMessage(msg.chat.id, `✅ تم رفع الحظر عن \`${ip}\`.`, { parse_mode: 'Markdown' });
      console.log(`[BOT] Unblocked IP: ${ip}`);
    } else {
      bot.sendMessage(msg.chat.id, `ℹ️ \`${ip}\` غير موجود في قائمة الحظر.`, { parse_mode: 'Markdown' });
    }
  });

  // /list
  bot.onText(/\/list/, (msg) => {
    if (!isAdmin(msg)) return deny(msg.chat.id);
    if (blockedIps.size === 0) {
      return bot.sendMessage(msg.chat.id, 'ℹ️ قائمة الحظر فارغة.');
    }
    const list = [...blockedIps].map((ip, i) => `${i + 1}. \`${ip}\``).join('\n');
    bot.sendMessage(msg.chat.id, `🚫 *IPs المحظورة (${blockedIps.size}):*\n\n${list}`, { parse_mode: 'Markdown' });
  });

  // /status <ip>
  bot.onText(/\/status (.+)/, (msg, match) => {
    if (!isAdmin(msg)) return deny(msg.chat.id);
    const ip = match[1].trim();
    const status = blockedIps.has(ip) ? '🚫 محظور' : '✅ غير محظور';
    bot.sendMessage(msg.chat.id, `\`${ip}\` — ${status}`, { parse_mode: 'Markdown' });
  });

  bot.on('polling_error', (err) => console.error('[BOT ERROR]', err.message));
}

// ─── Helpers ────────────────────────────────────────────────────────────────
function isValidIp(ip) {
  // IPv4
  const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/;
  // IPv6 (basic)
  const ipv6 = /^[0-9a-fA-F:]{3,39}$/;
  return ipv4.test(ip) || ipv6.test(ip);
}
