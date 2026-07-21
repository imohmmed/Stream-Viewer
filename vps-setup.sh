#!/bin/bash
set -e
echo ""
echo "╔══════════════════════════════════════════╗"
echo "║     TIGER IPTV — VPS Setup Script        ║"
echo "╚══════════════════════════════════════════╝"
echo ""

BOT_TOKEN="8612175204:AAG1mDWhEQqizG3XgqYhUz6vJOik_Y1-RF0"
ADMIN_ID="1384026800"
SITE_DIR="/var/www/tiger-iptv"
BACKEND_DIR="/var/www/tiger-iptv/backend"
REPO="https://github.com/imohmmed/Stream-Viewer.git"
DOMAIN="tiger-iptv.com"

# ─── 1. System packages ───────────────────────
echo "▶ [1/8] Installing system packages..."
apt-get update -qq
apt-get install -y -qq git curl nginx 2>/dev/null
echo "   ✓ nginx, git, curl"

# ─── 2. Node.js 20 ───────────────────────────
echo "▶ [2/8] Checking Node.js..."
if ! command -v node &>/dev/null || [[ "$(node -v 2>/dev/null)" != v20* ]]; then
  echo "   Installing Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - 2>/dev/null
  apt-get install -y -qq nodejs
fi
echo "   ✓ Node $(node -v) / NPM $(npm -v)"

# ─── 3. PM2 ──────────────────────────────────
echo "▶ [3/8] Installing PM2..."
npm install -g pm2 --silent 2>/dev/null
echo "   ✓ PM2 $(pm2 --version)"

# ─── 4. Clone repo ───────────────────────────
echo "▶ [4/8] Fetching latest code from GitHub..."
rm -rf /tmp/tiger-repo
git clone --depth 1 "$REPO" /tmp/tiger-repo -q
echo "   ✓ Cloned"

# ─── 5. Build website ────────────────────────
echo "▶ [5/8] Building website (may take 1-2 min)..."
cd /tmp/tiger-repo

# Install pnpm
npm install -g pnpm --silent 2>/dev/null

# Install dependencies
pnpm install --frozen-lockfile 2>/dev/null || pnpm install

# Build with correct env vars for root domain
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/tiger-iptv-website run build

# Deploy built files
mkdir -p "$SITE_DIR"
cp -r artifacts/tiger-iptv-website/dist/public/. "$SITE_DIR/"
# Copy public assets (logo, favicon, etc)
cp -r artifacts/tiger-iptv-website/public/. "$SITE_DIR/" 2>/dev/null || true
echo "   ✓ Website built and deployed to $SITE_DIR"

# ─── 6. Backend ──────────────────────────────
echo "▶ [6/8] Setting up backend + Telegram bot..."
mkdir -p "$BACKEND_DIR"
cp /tmp/tiger-repo/vps-backend/index.js "$BACKEND_DIR/"
cp /tmp/tiger-repo/vps-backend/package.json "$BACKEND_DIR/"

cat > "$BACKEND_DIR/.env" << ENVEOF
BOT_TOKEN=$BOT_TOKEN
ADMIN_ID=$ADMIN_ID
PORT=3001
BLOCKED_IPS_FILE=$SITE_DIR/blocked_ips.json
ENVEOF

cd "$BACKEND_DIR"
npm install --omit=dev -s

# Init blocked IPs file
[ -f "$SITE_DIR/blocked_ips.json" ] || echo "[]" > "$SITE_DIR/blocked_ips.json"
echo "   ✓ Backend ready"

# ─── 7. PM2 ──────────────────────────────────
echo "▶ [7/8] Starting backend with PM2..."
pm2 delete tiger-backend 2>/dev/null || true
pm2 start "$BACKEND_DIR/index.js" --name tiger-backend
pm2 save
# Auto-start on reboot
env PATH="$PATH:/usr/bin" pm2 startup systemd -u root --hp /root 2>/dev/null | grep -E "^sudo" | bash 2>/dev/null || true
echo "   ✓ PM2 running"

# ─── 8. Nginx ────────────────────────────────
echo "▶ [8/8] Configuring Nginx..."
cat > /etc/nginx/sites-available/tiger-iptv << 'NGINXEOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name tiger-iptv.com www.tiger-iptv.com _;

    root /var/www/tiger-iptv;
    index index.html;

    # Security
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin-when-cross-origin";

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml image/png;

    # API → Node.js backend
    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_connect_timeout 5s;
        proxy_read_timeout 10s;
    }

    # SPA fallback (React router)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2|webp)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
NGINXEOF

ln -sf /etc/nginx/sites-available/tiger-iptv /etc/nginx/sites-enabled/tiger-iptv
rm -f /etc/nginx/sites-enabled/default

nginx -t && systemctl restart nginx && systemctl enable nginx
echo "   ✓ Nginx configured and running"

# ─── Firewall ─────────────────────────────────
ufw allow 22/tcp  2>/dev/null || true
ufw allow 80/tcp  2>/dev/null || true
ufw allow 443/tcp 2>/dev/null || true
ufw --force enable 2>/dev/null || true

# ─── Done ─────────────────────────────────────
echo ""
echo "╔══════════════════════════════════════════╗"
echo "║          ✅  SETUP COMPLETE!             ║"
echo "╚══════════════════════════════════════════╝"
echo ""
echo "  🌐 Website : http://$DOMAIN"
echo "  🔌 API     : http://$DOMAIN/api/health"
echo "  🤖 Bot     : Active on Telegram"
echo ""
echo "  📋 PM2 status:"
pm2 list
echo ""
echo "  🤖 Telegram Bot Commands:"
echo "     /start            — قائمة الأوامر"
echo "     /block 1.2.3.4    — حظر IP"
echo "     /unblock 1.2.3.4  — رفع الحظر"
echo "     /list             — قائمة المحظورين"
echo "     /stats            — الإحصائيات"
echo ""
echo "  🔒 To enable HTTPS:"
echo "     apt install certbot python3-certbot-nginx -y"
echo "     certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo ""
