# Quick Fix: TON Connect Connection Issues

## 🔴 Problem Identified

Your `.env` file has the wrong IP address:
- **Current**: `192.168.1.4`
- **Actual**: `192.168.1.6` (your current local IP)

## ✅ Quick Fix Steps

### Step 1: Update .env File

Update your `.env` file with the correct IP:

```env
# Deployed Pay2Join contract (testnet)
VITE_PAY2JOIN_ADDRESS=kQASvSNSo9jP9f8bgk9jGdLBcCJPFeJmb0JsOTBkbhRiVvpx

# Updated with correct IP
VITE_TONCONNECT_MANIFEST_URL=http://192.168.1.6:5173/tonconnect-manifest.json
```

### Step 2: Verify Dev Server Configuration

Your `vite.config.ts` already has `host: true` which should allow network access. Verify:

1. **Restart dev server:**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev:https
   ```

2. **Check server is listening on all interfaces:**
   ```bash
   lsof -i :5173
   # Should show *:5173 (LISTEN) not just localhost
   ```

### Step 3: Test Manifest Accessibility

**From your phone's browser**, open:
```
http://192.168.1.6:5173/tonconnect-manifest.json
```

You should see:
```json
{
  "url": "http://192.168.1.6:5173",
  "name": "Pay2Join (Dev)",
  "iconUrl": "https://ton.vote/logo.png"
}
```

### Step 4: Access App from Phone

1. **Open Telegram on your phone**
2. **Open your Mini App** (or use the dev URL)
3. **Try connecting wallet** - should work now!

---

## 🔧 Alternative: Use HTTPS Tunnel (More Reliable)

If LAN access doesn't work, use a tunnel:

### Option A: ngrok

```bash
# Install ngrok (if not installed)
# brew install ngrok  # macOS
# Or download from https://ngrok.com/

# In a new terminal
ngrok http 5173

# Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
# Update .env:
VITE_TONCONNECT_MANIFEST_URL=https://abc123.ngrok.io/tonconnect-manifest.json
```

### Option B: localtunnel

```bash
# Install
npm install -g localtunnel

# Run tunnel
lt --port 5173

# Copy the HTTPS URL
# Update .env with the URL
```

---

## 🐛 If Still Not Working

### Check 1: Firewall
```bash
# macOS - Check firewall settings
# System Settings > Network > Firewall
# Make sure it allows connections
```

### Check 2: Network Connectivity
```bash
# From phone, ping your computer
# Should be able to reach 192.168.1.6
```

### Check 3: Server Binding
Make sure vite is binding to all interfaces. Your config has `host: true` which should work, but verify the server output shows:
```
➜  Network: https://192.168.1.6:5173
```

### Check 4: Clear Cache
- Clear Telegram cache (see main troubleshooting guide)
- Disconnect and reconnect wallet

---

## 📋 Verification Checklist

- [ ] Updated `.env` with correct IP (`192.168.1.6`)
- [ ] Restarted dev server
- [ ] Can access manifest URL from phone browser
- [ ] Phone and computer on same Wi-Fi network
- [ ] Firewall allows connections
- [ ] Tried clearing Telegram cache
- [ ] Tried disconnecting/reconnecting wallet

---

## 🚀 Expected Result

After fixing:
1. Open Mini App in Telegram
2. Click "Connect Wallet"
3. TON Wallet opens
4. Connection succeeds ✅
5. Wallet address appears in app

---

**Next Steps**: If this doesn't work, check the full troubleshooting guide: `TON_CONNECT_TROUBLESHOOTING.md`

