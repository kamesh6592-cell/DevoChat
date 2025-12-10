# Quick Deployment Commands

## Step 1: Push to GitHub
```bash
cd "E:\New folder (93)\DevoChat"
git init
git add .
git commit -m "Initial commit with deployment configs"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/DevoChat.git
git push -u origin main
```

## Step 2: Generate AUTH_KEY
```bash
cd backend
python generate_secret.py
# Copy the generated key for environment variables
```

## Step 3: Deploy Backend (Render)
1. Go to https://dashboard.render.com/
2. New → Web Service
3. Connect GitHub repo
4. Root Directory: `backend`
5. Build Command: `pip install -r requirements.txt`
6. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
7. Add environment variables from `.env.example`
8. Deploy!

## Step 4: Deploy Frontend (Vercel)
```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
# Or use Vercel Dashboard: https://vercel.com/new
```

## Step 5: Update Backend URL
In Render, update environment variable:
```
PRODUCTION_URL=https://your-vercel-url.vercel.app
```

## Done! 🎉
Visit your Vercel URL to see your live app!
