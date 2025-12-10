# DevoChat Deployment Guide
## Render (Backend) + Vercel (Frontend)

This guide will help you deploy DevoChat with the backend on Render and the frontend on Vercel.

---

## 📋 Prerequisites

1. **GitHub Account** - Push this code to your GitHub repository
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
4. **MongoDB Atlas** - Create free database at [mongodb.com/atlas](https://www.mongodb.com/atlas)

---

## 🗄️ Step 1: Set Up MongoDB Atlas (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a **free M0 cluster** (512MB storage)
3. Click **"Connect"** → **"Connect your application"**
4. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/chat_db
   ```
5. Replace `<username>` and `<password>` with your credentials
6. Add IP Address: Click **"Network Access"** → **"Add IP Address"** → **"Allow Access from Anywhere"** (0.0.0.0/0)

---

## 🔧 Step 2: Deploy Backend to Render

### Push Code to GitHub First
```bash
cd "E:\New folder (93)\DevoChat"
git remote set-url origin https://github.com/YOUR_USERNAME/DevoChat.git
git add .
git commit -m "Add deployment configs"
git push origin main
```

### Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the **DevoChat** repository

### Configuration:
- **Name**: `devochat-backend`
- **Root Directory**: `backend`
- **Environment**: `Python 3`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Instance Type**: `Free`

### Environment Variables:
Click **"Advanced"** → **"Add Environment Variable"** and add:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chat_db
PRODUCTION_URL=https://your-frontend-url.vercel.app
DEVELOPMENT_URL=http://localhost:3000
AUTH_KEY=your-random-secret-key-here

# Add your AI API keys (at least one is required)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=...
PERPLEXITY_API_KEY=...
HUGGINGFACE_API_KEY=...
XAI_API_KEY=...
MISTRAL_API_KEY=...
FIREWORKS_API_KEY=...
FRIENDLI_API_KEY=...
FLUX_API_KEY=...
BYTEPLUS_API_KEY=...
ALIBABA_API_KEY=...
```

**Generate AUTH_KEY:**
```bash
python backend/generate_secret.py
```

5. Click **"Create Web Service"**
6. Wait 5-10 minutes for deployment
7. **Copy your backend URL**: `https://devochat-backend-xxxx.onrender.com`

---

## 🎨 Step 3: Deploy Frontend to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### Environment Variables:
Add in Vercel:
```env
REACT_APP_FASTAPI_URL=https://devochat-backend-xxxx.onrender.com
WDS_SOCKET_PORT=0
```

5. Click **"Deploy"**
6. Wait 2-3 minutes
7. Your app will be live at: `https://your-app-name.vercel.app`

### Option B: Using Vercel CLI

```bash
cd "E:\New folder (93)\DevoChat\frontend"
npm install -g vercel
vercel login
vercel --prod
```

---

## 🔄 Step 4: Update CORS Settings

After both deployments, update the backend's `PRODUCTION_URL`:

1. Go to **Render Dashboard** → Your backend service
2. Click **"Environment"**
3. Update `PRODUCTION_URL` with your Vercel URL:
   ```
   PRODUCTION_URL=https://your-app-name.vercel.app
   ```
4. Click **"Save Changes"** (will auto-redeploy)

---

## ✅ Step 5: Verify Deployment

1. Visit your Vercel URL: `https://your-app-name.vercel.app`
2. Test the application:
   - Create an account
   - Start a conversation
   - Upload a file
   - Test different AI models

---

## 📝 Important Notes

### Render Free Tier Limitations:
- ⚠️ **Backend sleeps after 15 minutes** of inactivity
- 🕐 **30-50 seconds** to wake up on first request
- ✅ **750 hours/month** free (enough for personal use)
- ✅ **Auto-redeploys** on git push

### Vercel Free Tier:
- ✅ **100GB bandwidth/month**
- ✅ **Unlimited deployments**
- ✅ **Automatic HTTPS**
- ✅ **Global CDN**

### File Storage Consideration:
The app stores uploaded files and generated images locally. On Render's free tier, these files are **ephemeral** (deleted on restart/sleep).

**Solutions:**
1. **Cloudinary** (Free: 25GB storage) - Recommended for images
2. **AWS S3** (Free tier: 5GB for 12 months)
3. **Render Disk** ($0.25/GB/month) - Persistent storage

---

## 🔐 Security Checklist

- ✅ Change `AUTH_KEY` to a strong random value
- ✅ Store API keys as environment variables (never commit)
- ✅ Set up MongoDB IP whitelist properly
- ✅ Use HTTPS only in production
- ✅ Review CORS settings in `main.py`

---

## 🚀 Automatic Deployments

Both Render and Vercel support automatic deployments:

- **Render**: Auto-deploys on push to `main` branch
- **Vercel**: Auto-deploys on push to any branch (preview) and `main` (production)

---

## 🐛 Troubleshooting

### Backend won't start:
- Check Render logs: Dashboard → Service → Logs
- Verify all required environment variables are set
- Check MongoDB connection string

### Frontend can't connect to backend:
- Verify `REACT_APP_FASTAPI_URL` is correct
- Check CORS settings in backend `main.py`
- Ensure `PRODUCTION_URL` matches your Vercel URL

### Database connection errors:
- Check MongoDB Atlas IP whitelist (should include 0.0.0.0/0)
- Verify connection string format
- Test connection from MongoDB Compass

### First request is slow:
- This is normal on Render free tier (cold start)
- Consider upgrading to paid tier ($7/month) for always-on

---

## 💰 Cost Summary

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **Render Backend** | Free (with sleep) | $7/month (always-on) |
| **Vercel Frontend** | Free | $20/month (Pro) |
| **MongoDB Atlas** | 512MB free | $9/month (M10) |
| **Total** | **$0/month** | ~$36/month (all paid) |

---

## 📧 Support

If you encounter issues:
1. Check Render logs for backend errors
2. Check Vercel deployment logs
3. Review MongoDB Atlas metrics
4. Open an issue on the GitHub repository

---

## 🎉 Next Steps

1. **Custom Domain**: Add your domain in Vercel/Render settings
2. **Analytics**: Add Google Analytics or Vercel Analytics
3. **Monitoring**: Set up UptimeRobot for backend monitoring
4. **Backup**: Export MongoDB data regularly

---

**Congratulations! Your DevoChat app is now live! 🚀**
