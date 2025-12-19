# TON Connect Connection Issue - Diagnosis & Solution

## 🔍 Issue Summary

Your TON wallet cannot connect to the application due to an **incorrect manifest URL** in the `.env` file.

---

## ✅ Root Cause

**Problem**: The `.env` file had the wrong local IP address:
- ❌ **Was**: `192.168.1.4`
- ✅ **Should be**: `192.168.1.6` (your actual local IP)

**Why this matters**: TON Connect requires the manifest file to be accessible from your phone. If the IP is wrong, your phone can't reach the manifest, causing "App Manifest Error".

---

## 🔧 Solution Applied

### Fixed `.env` File

Updated the manifest URL to use the correct IP:

```env
VITE_TONCONNECT_MANIFEST_URL=http://192.168.1.6:5173/tonconnect-manifest.json
```

### Verified Manifest Accessibility

✅ **Manifest is working correctly:**
- URL: `http://192.168.1.6:5173/tonconnect-manifest.json`
- Returns valid JSON with correct structure
- Dynamic manifest plugin is functioning

---

## 📋 Next Steps to Test

### Step 1: Restart Dev Server

```bash
# Stop current server (Ctrl+C if running)
npm run dev:https
```

### Step 2: Verify from Phone

**On your phone's browser**, open:
```
http://192.168.1.6:5173/tonconnect-manifest.json
```

**Expected result**: Should see JSON:
```json
{
  "url": "http://192.168.1.6:5173",
  "name": "Pay2Join (Dev)",
  "iconUrl": "https://ton.vote/logo.png"
}
```

### Step 3: Test Connection

1. **Open your Mini App** in Telegram (or access `http://192.168.1.6:5173` from phone)
2. **Navigate to TON Connect page**
3. **Click "Connect Wallet"**
4. **Should now connect successfully** ✅

---

## 🛠️ If Still Not Working

### Check 1: Network Connectivity

Ensure phone and computer are on **same Wi-Fi network**:
- Phone Wi-Fi: Should be same network as computer
- Computer IP: `192.168.1.6` (verified)
- Port 5173: Should be accessible

### Check 2: Firewall

**macOS Firewall:**
- System Settings > Network > Firewall
- Ensure it allows incoming connections
- Or temporarily disable to test

### Check 3: Clear Cache

**iOS:**
- Telegram Settings > Data and Storage > Storage Usage > Clear cache

**Android:**
- Settings > Apps > Telegram > Clear cache
- Settings > Apps > Android System WebView > Clear cache

**⚠️ Important**: Save your Recovery Phrase before clearing cache!

### Check 4: Reconnect Wallet

1. Open TON Wallet
2. Settings > Connected Apps
3. Disconnect your app (if listed)
4. Return to app and reconnect

---

## 🔄 Alternative: Use HTTPS Tunnel

If LAN access is unreliable, use a tunnel service:

### ngrok (Recommended)

```bash
# Install ngrok
brew install ngrok
# Or download from https://ngrok.com/

# Run tunnel
ngrok http 5173

# Copy HTTPS URL (e.g., https://abc123.ngrok.io)
# Update .env:
VITE_TONCONNECT_MANIFEST_URL=https://abc123.ngrok.io/tonconnect-manifest.json
```

### localtunnel

```bash
npm install -g localtunnel
lt --port 5173
# Copy URL and update .env
```

**Benefits of tunnel:**
- ✅ HTTPS (more reliable)
- ✅ Works from any network
- ✅ No firewall issues
- ✅ Production-like testing

---

## 📊 Current Configuration Status

### ✅ Working:
- Dev server running on port 5173
- Manifest endpoint accessible
- Dynamic manifest plugin functioning
- Correct IP address in `.env`

### ⚠️ To Verify:
- Phone can access manifest URL
- Same Wi-Fi network
- Firewall allows connections
- Telegram cache cleared (if needed)

---

## 🎯 Expected Behavior After Fix

1. **Open Mini App** → Should load normally
2. **Click "Connect Wallet"** → TON Wallet opens
3. **Approve connection** → Returns to app
4. **Wallet address displayed** → Connection successful ✅
5. **Can send transactions** → Full functionality

---

## 📚 Related Documentation

- **Full Troubleshooting Guide**: `TON_CONNECT_TROUBLESHOOTING.md`
- **Quick Fix Guide**: `QUICK_FIX_TON_CONNECT.md`
- **TON Wallet Docs**: https://help.wallet.tg/ton-connect

---

## 💡 Key Takeaways

1. **Manifest URL must be accessible** from phone
2. **IP address must match** your computer's actual IP
3. **Same network required** for LAN access
4. **HTTPS tunnel** is more reliable for testing
5. **Clear cache** if connection persists after fix

---

**Status**: ✅ Configuration fixed - Ready to test connection

**Last Updated**: Based on current system diagnosis

