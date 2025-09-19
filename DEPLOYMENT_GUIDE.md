# DocVault Deployment Guide

## Backend Deployment on Railway (Recommended)

### Why Railway?
- **Free tier available** with generous limits
- **Stable URLs** that don't change (unlike ngrok)
- **Automatic HTTPS** and SSL certificates
- **Easy deployment** from GitHub
- **Built-in environment variable management**

### Step 1: Prepare Your Backend

1. **Create a GitHub repository** (if you haven't already)
2. **Push your backend code** to GitHub
3. **Add environment variables** to your `.env` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5051
   ```

### Step 2: Deploy to Railway

1. **Go to [Railway.app](https://railway.app)**
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your DocVault repository**
6. **Select the backend folder** as the root directory
7. **Add environment variables** in Railway dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A strong secret key for JWT tokens
8. **Deploy!** Railway will automatically build and deploy your app

### Step 3: Update Frontend Configuration

1. **Get your Railway URL** (something like `https://your-app-name.railway.app`)
2. **Update your frontend environment variables**:
   - In Vercel dashboard, go to your project settings
   - Add environment variable: `VITE_API_BASE=https://your-app-name.railway.app`
3. **Redeploy your frontend**

## Alternative Deployment Options

### Option 1: Render (Free tier available)
- Similar to Railway
- Good for full-stack applications
- Automatic SSL and custom domains

### Option 2: Heroku (Paid plans only)
- Most popular platform
- Very reliable
- Easy deployment with Git

### Option 3: Vercel (Serverless)
- Same platform as your frontend
- Serverless functions
- Great for API routes

## Environment Variables Setup

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/docvault
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5051
```

### Frontend (Vercel Environment Variables)
```
VITE_API_BASE=https://your-backend-url.railway.app
```

## Database Setup

### MongoDB Atlas (Recommended)
1. **Create account** at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Create a new cluster** (free tier available)
3. **Create a database user**
4. **Whitelist all IP addresses** (0.0.0.0/0) for development
5. **Get connection string** and use it as `MONGODB_URI`

## Testing Your Deployment

1. **Check backend health**: Visit `https://your-backend-url.railway.app`
2. **Test API endpoints**: Use Postman or curl
3. **Test frontend**: Make sure it can connect to your backend
4. **Test authentication**: Try logging in and out

## Troubleshooting

### Common Issues:
1. **CORS errors**: Make sure your frontend URL is in the CORS origins
2. **Database connection**: Check your MongoDB URI and network access
3. **Environment variables**: Ensure all required variables are set
4. **Build errors**: Check the Railway logs for specific error messages

### Getting Help:
- Railway documentation: https://docs.railway.app
- MongoDB Atlas documentation: https://docs.atlas.mongodb.com
- Vercel documentation: https://vercel.com/docs
