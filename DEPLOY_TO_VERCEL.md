# Deploy Pay2Join MiniApp to Vercel

## 🚀 Why Deploy to Vercel?

✅ **HTTPS by default** - TON Connect requires HTTPS  
✅ **No network issues** - Accessible from anywhere  
✅ **Stable manifest URL** - No IP address changes  
✅ **Free hosting** - Perfect for testing  
✅ **Easy deployment** - One command  

---

## 📋 Pre-Deployment Checklist

- [ ] Build works locally: `npm run build`
- [ ] Contract address is set in `.env`
- [ ] You have a Vercel account (free)

---

## 🔧 Step 1: Prepare for Deployment

### Update vite.config.ts

Already updated! The base path is now `/` for production.

### Update public/tonconnect-manifest.json

After deployment, you'll update this with your Vercel URL. For now, it's fine as-is.

---

## 🚀 Step 2: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No (first time)
# - Project name? pay2join-miniapp (or your choice)
# - Directory? ./
# - Override settings? No
```

### Option B: Using GitHub Integration

1. **Push to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push
   ```

2. **Connect to Vercel**:
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `./`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Click "Deploy"

---

## ⚙️ Step 3: Configure Environment Variables

After deployment, set environment variables in Vercel:

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Settings > Environment Variables**
4. **Add these variables**:

```
VITE_PAY2JOIN_ADDRESS=kQASvSNSo9jP9f8bgk9jGdLBcCJPFeJmb0JsOTBkbhRiVvpx
```

**Note**: Don't set `VITE_TONCONNECT_MANIFEST_URL` - it will be auto-detected from your Vercel URL.

---

## 📝 Step 4: Update Manifest File

After deployment, you'll get a URL like: `https://pay2join-miniapp.vercel.app`

### Update public/tonconnect-manifest.json:

```json
{
  "url": "https://pay2join-miniapp.vercel.app",
  "name": "Pay2Join",
  "iconUrl": "https://ton.vote/logo.png"
}
```

**Then redeploy** or push the change.

---

## 🔄 Step 5: Redeploy (if needed)

If you updated the manifest:

```bash
# If using CLI
vercel --prod

# Or push to GitHub (if using GitHub integration)
git add public/tonconnect-manifest.json
git commit -m "Update manifest URL"
git push
```

---

## ✅ Step 6: Test Connection

1. **Get your Vercel URL**: `https://your-app.vercel.app`
2. **Open in Telegram**: Use your bot to open the Mini App
3. **Test TON Connect**:
   - Navigate to TON Connect page
   - Click "Connect Wallet"
   - Should connect successfully! ✅

---

## 🐛 Troubleshooting

### Issue: Build fails

**Check**:
- All dependencies installed: `npm install`
- Build works locally: `npm run build`
- Check Vercel build logs

### Issue: Still can't connect

**Check**:
1. Manifest URL is correct in `public/tonconnect-manifest.json`
2. Manifest is accessible: `https://your-app.vercel.app/tonconnect-manifest.json`
3. Clear Telegram cache
4. Disconnect and reconnect wallet

### Issue: Environment variables not working

**Check**:
- Variables are prefixed with `VITE_`
- Variables are set in Vercel dashboard
- Redeploy after adding variables

---

## 📊 Vercel Configuration

Your `vercel.json` is configured for:
- ✅ SPA routing (all routes → index.html)
- ✅ Vite framework
- ✅ Build output: `dist`

---

## 🔗 Custom Domain (Optional)

If you want a custom domain:

1. **Vercel Dashboard** > Your Project > Settings > Domains
2. **Add domain**: e.g., `pay2join.yourdomain.com`
3. **Update manifest** with new domain
4. **Redeploy**

---

## 🎯 Quick Deploy Commands

```bash
# First time
vercel

# Production deploy
vercel --prod

# Preview deploy
vercel

# Check deployment status
vercel ls
```

---

## 💡 Pro Tips

1. **Use preview deployments** to test before production
2. **Set up GitHub integration** for automatic deployments
3. **Use Vercel's environment variables** for different environments
4. **Check build logs** if something goes wrong

---

## ✅ Expected Result

After deployment:
- ✅ App accessible at `https://your-app.vercel.app`
- ✅ Manifest accessible at `https://your-app.vercel.app/tonconnect-manifest.json`
- ✅ TON Connect works perfectly
- ✅ No network/firewall issues

---

**Status**: Ready to deploy! 🚀

