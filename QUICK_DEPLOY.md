# 🚀 Quick Deploy to Vercel - Fix TON Connect Issues

## ✅ Why Vercel Will Fix Your Issue

**Current Problem**: Local dev with HTTP/LAN IP causes TON Connect manifest errors

**Vercel Solution**:
- ✅ **HTTPS by default** - TON Connect requires HTTPS
- ✅ **Public URL** - No network/firewall issues  
- ✅ **Stable manifest** - Always accessible
- ✅ **Free hosting** - Perfect for testing

---

## 🎯 Quick Deploy (5 minutes)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login

```bash
vercel login
```

### Step 3: Deploy

```bash
# From project root
vercel

# Follow prompts:
# - Set up and deploy? → Yes
# - Which scope? → (your account)
# - Link to existing? → No
# - Project name? → pay2join-miniapp
# - Directory? → ./
# - Override? → No
```

### Step 4: Set Environment Variable

After deployment, go to Vercel Dashboard:

1. **Your Project** → **Settings** → **Environment Variables**
2. **Add**:
   ```
   Name: VITE_PAY2JOIN_ADDRESS
   Value: kQASvSNSo9jP9f8bgk9jGdLBcCJPFeJmb0JsOTBkbhRiVvpx
   ```
3. **Redeploy** (or it will auto-deploy)

### Step 5: Update Manifest

After deployment, you'll get a URL like: `https://pay2join-miniapp-xxxx.vercel.app`

**Update `public/tonconnect-manifest.json`**:

```json
{
  "url": "https://pay2join-miniapp-xxxx.vercel.app",
  "name": "Pay2Join",
  "iconUrl": "https://ton.vote/logo.png"
}
```

**Then redeploy**:
```bash
vercel --prod
```

---

## ✅ Test Connection

1. Open your Vercel URL in Telegram Mini App
2. Navigate to TON Connect page
3. Click "Connect Wallet"
4. **Should work perfectly!** ✅

---

## 🔄 Alternative: GitHub Integration

If you prefer GitHub:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push
   ```

2. **Connect in Vercel**:
   - Go to https://vercel.com
   - "Add New Project"
   - Import GitHub repo
   - Auto-detects Vite settings
   - Deploy!

---

## 🎉 That's It!

After deployment, TON Connect will work because:
- ✅ HTTPS URL (required)
- ✅ Publicly accessible manifest
- ✅ No network configuration needed
- ✅ Stable URL for wallet connection

---

**Need help?** Check `DEPLOY_TO_VERCEL.md` for detailed guide.

