    # Connect Frontend & Backend

## ✅ Deployment Status
- **Backend**: https://devochat.onrender.com (LIVE)
- **Frontend**: https://devo-chat-kohl.vercel.app/ (LIVE)

## 🔧 Step 1: Configure Render (Backend)

Go to your Render dashboard: https://dashboard.render.com/

1. Click on your `devochat` service
2. Go to **Environment** tab
3. Add these environment variables:

```
PRODUCTION_URL=https://devo-chat-kohl.vercel.app
DEVELOPMENT_URL=http://localhost:3000
```

4. Click **Save Changes** (service will auto-redeploy)

## 🔧 Step 2: Configure Vercel (Frontend)

Go to your Vercel dashboard: https://vercel.com/dashboard

1. Click on your `devo-chat-kohl` project
2. Go to **Settings** → **Environment Variables**
3. Add this variable:

```
REACT_APP_FASTAPI_URL=https://devochat.onrender.com
```

4. Click **Save**
5. Go to **Deployments** tab
6. Click the **⋯** menu on the latest deployment → **Redeploy**

## 🔧 Step 3: Add API Keys (Both Platforms)

### In Render (Backend):
Add your AI API keys in the Environment tab:

```
OPENAI_API_KEY=your_key_here
ANTHROPIC_API_KEY=your_key_here
GOOGLE_API_KEY=your_key_here
XAI_API_KEY=your_key_here
MISTRAL_API_KEY=your_key_here
MONGODB_URI=your_mongodb_atlas_connection_string
SECRET_KEY=your_secret_key_for_jwt
```

### In Vercel (Frontend):
No additional keys needed (all API calls go through backend)

## ✅ Verify Connection

After both redeploy:

1. Visit: https://devo-chat-kohl.vercel.app/
2. Open browser DevTools (F12) → Console
3. Check if API calls to https://devochat.onrender.com succeed
4. Try signing up/logging in

## 🐛 Troubleshooting

**If you see CORS errors:**
- Verify PRODUCTION_URL in Render exactly matches your Vercel URL (no trailing slash)
- Wait 2-3 minutes for Render to redeploy after env var changes

**If frontend can't reach backend:**
- Verify REACT_APP_FASTAPI_URL in Vercel is correct
- Redeploy frontend after adding the env var

**Render free tier sleeps after 15 minutes:**
- First request will take 30-60 seconds to wake up
- Consider using a service like UptimeRobot to ping it every 10 minutes
