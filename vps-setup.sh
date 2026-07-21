#!/bin/bash
set -e
echo ""
echo "╔══════════════════════════════════════════╗"
echo "║     TIGER IPTV — VPS Setup Script        ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# ─── Variables ────────────────────────────────
BOT_TOKEN="8612175204:AAG1mDWhEQqizG3XgqYhUz6vJOik_Y1-RF0"
ADMIN_ID="1384026800"
SITE_DIR="/var/www/tiger-iptv"
BACKEND_DIR="/var/www/tiger-iptv/backend"
REPO="https://github.com/imohmmed/Stream-Viewer.git"
DOMAIN="tiger-iptv.com"

# ─── 1. System packages ───────────────────────
echo "▶ Installing system packages..."
apt-get update -qq
apt-get install -y -qq git curl nginx 2>/dev/null

# ─── 2. Node.js 20 ───────────────────────────
if ! command -v node &>/dev/null || [[ "$(node -v)" != v20* ]]; then
  echo "▶ Installing Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - -qq
  apt-get install -y -qq nodejs
fi
echo "   Node: $(node -v)  NPM: $(npm -v)"

# ─── 3. PM2 & pnpm ───────────────────────────
echo "▶ Installing PM2 and pnpm..."
npm install -g pm2 pnpm --silent

# ─── 4. Clone / update repo ──────────────────
echo "▶ Fetching latest code from GitHub..."
if [ -d /tmp/tiger-repo ]; then rm -rf /tmp/tiger-repo; fi
git clone --depth 1 "$REPO" /tmp/tiger-repo -q

# ─── 5. Build website ────────────────────────
echo "▶ Building website..."
mkdir -p "$SITE_DIR"
cd /tmp/tiger-repo
pnpm install --frozen-lockfile -s 2>/dev/null || pnpm install -s
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/tiger-iptv-website run build
cp -r artifacts/tiger-iptv-website/dist/public/* "$SITE_DIR/"

# Copy public assets (logo etc)
cp -r artifacts/tiger-iptv-website/public/* "$SITE_DIR/" 2>/dev/null || true
echo "   Website built → $SITE_DIR"

# ─── 6. Backend setup ────────────────────────
echo "▶ Setting up backend..."
mkdir -p "$BACKEND_DIR"
cp vps-backend/index.js "$BACKEND_DIR/"
cp vps-backend/package.json "$BACKEND_DIR/"

# Create .env
cat > "$BACKEND_DIR/.env" << ENV
BOT_TOKEN=$BOT_TOKEN
ADMIN_ID=$ADMIN_ID
PORT=3001
BLOCKED_IPS_FILE=$SITE_DIR/blocked_ips.json
ENV

# Install dependencies
cd "$BACKEND_DIR"
npm install --omit=dev -s
echo "   Backend ready → $BACKEND_DIR"

# Initialize blocked IPs file if missing
[ -f "$SITE_DIR/blocked_ips.json" ] || echo "[]" > "$SITE_DIR/blocked_ips.json"

# ─── 7. PM2 ──────────────────────────────────
echo "▶ Starting backend with PM2..."
pm2 delete tiger-iptv-backend 2>/dev/null || true
pm2 start "$BACKEND_DIR/index.js" --name tiger-iptv-backend -s
pm2 save -s
pm2 startup systemd -u root --hp /root 2>/dev/null | tail -1 | bash 2>/dev/null || true
echo "   PM2 running"

# ─── 8. Nginx config ─────────────────────────
echo "▶ Configuring Nginx..."
cat > /etc/nginx/sites-available/tiger-iptv << NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN _;

    root $SITE_DIR;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;

    # API proxy → Node.js backend
    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header Host \$host;
        proxy_connect_timeout 5s;
        proxy_read_timeout 10s;
    }

    # SPA fallback
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
NGINX

ln -sf /etc/nginx/sites-available/tiger-iptv /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx
echo "   Nginx configured"

# ─── 9. Firewall ─────────────────────────────
echo "▶ Configuring firewall..."
ufw allow 22/tcp  2>/dev/null || true
ufw allow 80/tcp  2>/dev/null || true
ufw allow 443/tcp 2>/dev/null || true
ufw --force enable 2>/dev/null || true

# ─── Done ─────────────────────────────────────
echo ""
echo "╔══════════════════════════════════════════╗"
echo "║           ✅  SETUP COMPLETE!            ║"
echo "╚══════════════════════════════════════════╝"
echo ""
echo "  Website : http://$DOMAIN"
echo "  API     : http://$DOMAIN/api/check"
echo "  PM2     : pm2 status"
echo ""
echo "  Telegram Bot Commands:"
echo "    /block <ip>    — حظر IP"
echo "    /unblock <ip>  — رفع الحظر"
echo "    /list          — قائمة المحظورين"
echo ""
echo "  To add SSL: certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo ""
