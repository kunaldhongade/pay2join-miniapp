# TON Connect Troubleshooting Guide

## Common Issues and Solutions

### Issue: "App Manifest Error" when connecting wallet

This is the most common TON Connect error. Here's how to fix it:

---

## 🔍 Step 1: Verify Manifest File Accessibility

The manifest file must be accessible from your phone's wallet app. Check these:

### 1.1 Check if dev server is running
```bash
npm run dev:https
```

### 1.2 Verify manifest URL is reachable
Open the manifest URL directly in your phone's browser:
- **From `.env`**: `http://192.168.1.4:5173/tonconnect-manifest.json`
- Should return JSON with `url`, `name`, and `iconUrl` fields

### 1.3 Check network connectivity
- Phone and computer must be on the **same Wi-Fi network**
- Firewall must allow connections on port 5173
- Try pinging your computer's IP from your phone

---

## 🔧 Step 2: Fix Manifest URL Configuration

### Option A: Using LAN IP (Same Network)

1. **Find your computer's local IP:**
   ```bash
   # macOS/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # Or check network settings
   ```

2. **Update `.env` file:**
   ```env
   VITE_TONCONNECT_MANIFEST_URL=http://YOUR_LOCAL_IP:5173/tonconnect-manifest.json
   ```
   Example: `http://192.168.1.4:5173/tonconnect-manifest.json`

3. **Restart dev server:**
   ```bash
   npm run dev:https
   ```

4. **Access app from phone:**
   - Use the same URL: `http://YOUR_LOCAL_IP:5173`
   - Or use a tunnel (see Option B)

### Option B: Using HTTPS Tunnel (Recommended for Testing)

For production-like testing, use a tunnel service:

1. **Install ngrok or localtunnel:**
   ```bash
   # ngrok
   npm install -g ngrok
   ngrok http 5173
   
   # OR localtunnel
   npm install -g localtunnel
   lt --port 5173
   ```

2. **Update `.env` with tunnel URL:**
   ```env
   VITE_TONCONNECT_MANIFEST_URL=https://xxxx.ngrok.io/tonconnect-manifest.json
   # OR
   VITE_TONCONNECT_MANIFEST_URL=https://xxxx.loca.lt/tonconnect-manifest.json
   ```

3. **Restart dev server and access via tunnel URL**

---

## 🔒 Step 3: HTTPS vs HTTP Issues

### Development (Local)
- **HTTP over LAN** can work but may have issues
- **HTTPS tunnel** (ngrok/localtunnel) is more reliable
- The vite dev server with `dev:https` uses self-signed certificates

### Production
- **Must use HTTPS** - TON Connect requires HTTPS in production
- Ensure your domain has valid SSL certificate

---

## 📋 Step 4: Verify Manifest Content

The manifest must have correct structure. Check `/public/tonconnect-manifest.json`:

```json
{
  "url": "https://your-actual-app-url.com",
  "name": "Pay2Join",
  "iconUrl": "https://ton.vote/logo.png"
}
```

**Important**: The `url` field must match the actual URL where your app is running.

### For Dev Mode
The vite config dynamically generates the manifest with the correct URL. Verify:
1. Open `http://YOUR_IP:5173/tonconnect-manifest.json` in browser
2. Check that `url` matches your app URL
3. Ensure `iconUrl` is accessible (uses external URL by default)

---

## 🛠️ Step 5: Common Fixes from TON Wallet Docs

Based on the official troubleshooting guide:

### Fix 1: Network Connection
- ✅ Try different internet connection (Wi-Fi ↔ Mobile Data)
- ✅ Restart device
- ✅ Enable "Set time automatically" on device

### Fix 2: Clear Cache
**iOS:**
- Telegram Settings > Data and Storage > Storage Usage > Clear cache

**Android:**
- Settings > Apps > Telegram > Clear cache
- Settings > Apps > Android System WebView > Clear cache

**⚠️ Important**: Save your Recovery Phrase before clearing cache!

### Fix 3: Reconnect Wallet
1. Disconnect app from TON Wallet:
   - TON Wallet > Settings > Connected Apps > Disconnect
2. Clear app cache (see above)
3. Reconnect wallet to app

---

## 🐛 Step 6: Debug Manifest Issues

### Check 1: Manifest URL Response
```bash
# Test from command line
curl http://192.168.1.4:5173/tonconnect-manifest.json

# Should return valid JSON
```

### Check 2: CORS Headers
The manifest endpoint should have proper headers. The vite plugin sets:
- `Content-Type: application/json; charset=utf-8`
- `Cache-Control: no-store`

### Check 3: Network Access
```bash
# Test if port is accessible
# From phone, try accessing: http://YOUR_IP:5173
```

---

## 📱 Step 7: Device-Specific Issues

### iOS
- May require HTTPS (use tunnel)
- Check Safari settings
- Verify Telegram app permissions

### Android
- Clear Android System WebView cache
- Check app permissions
- Try different browser/WebView

---

## ✅ Step 8: Verification Checklist

Before reporting an issue, verify:

- [ ] Dev server is running (`npm run dev:https`)
- [ ] Manifest URL is accessible from phone browser
- [ ] Phone and computer on same network
- [ ] `.env` has correct `VITE_TONCONNECT_MANIFEST_URL`
- [ ] Manifest JSON is valid and has correct `url` field
- [ ] Firewall allows port 5173
- [ ] Tried clearing Telegram cache
- [ ] Tried disconnecting and reconnecting wallet
- [ ] Device time is set automatically

---

## 🚀 Quick Fix Script

Run this to quickly diagnose:

```bash
# 1. Check if server is running
lsof -i :5173

# 2. Get your local IP
ifconfig | grep "inet " | grep -v 127.0.0.1

# 3. Test manifest endpoint
curl http://YOUR_IP:5173/tonconnect-manifest.json

# 4. Check .env file
cat .env | grep TONCONNECT
```

---

## 🔗 Additional Resources

- [TON Connect Documentation](https://docs.ton.org/develop/dapps/ton-connect/overview)
- [TON Wallet Troubleshooting](https://help.wallet.tg/ton-connect)
- [Telegram Mini Apps Docs](https://docs.telegram-mini-apps.com/)

---

## 💡 Pro Tips

1. **Use HTTPS tunnel for reliable testing** - ngrok or localtunnel
2. **Check browser console** - Look for TON Connect errors
3. **Test manifest URL directly** - Open in phone browser first
4. **Verify network connectivity** - Ping from phone to computer
5. **Keep manifest URL updated** - Must match actual app URL

---

## 🆘 Still Having Issues?

If none of the above works:

1. **Check browser console** for specific error messages
2. **Verify TON Connect SDK version** - Check `package.json`
3. **Try production build** - `npm run build` and deploy
4. **Contact support** - Provide:
   - Error message screenshot
   - Manifest URL
   - Device/OS info
   - Network setup

---

**Last Updated**: Based on current codebase and TON Wallet troubleshooting guide

