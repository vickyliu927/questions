# IGCSE Questions - Deployment Guide

This guide will help you deploy the IGCSE Questions website to Vercel at www.igcse-questions.com.

## 🚀 Quick Deployment Steps

### 1. Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import the GitHub repository: `https://github.com/vickyliu927/questions`
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### 2. Environment Variables

Add these environment variables in Vercel Dashboard → Project → Settings → Environment Variables:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=8udeaunz
NEXT_PUBLIC_SANITY_DATASET=question-bank
NEXT_PUBLIC_SITE_URL=https://www.igcse-questions.com
RESEND_API_KEY=re_YvC1JtJi_NSU2GyBNrTGJmL3SGVd55PRr
FROM_EMAIL=noreply@igcse-questions.com
NOTIFICATION_EMAIL=vicliu927@gmail.com
SANITY_API_TOKEN=skrO9xK2dmhOoMSteeChT7GjbPRSPcLDMcHZZ8q2EA7YtoJFnKyVoTinqpsXu5n94t8WXTK7sPSxG7B6nSkkTxCIWFAS
```

### 3. Custom Domain Setup

1. In Vercel Dashboard → Project → Settings → Domains
2. Add custom domain: `www.igcse-questions.com`
3. Add redirect from: `igcse-questions.com` → `www.igcse-questions.com`
4. Follow Vercel's DNS configuration instructions

### 4. DNS Configuration

Configure your domain DNS settings:
- **Type**: CNAME
- **Name**: www
- **Value**: cname.vercel-dns.com

For apex domain (igcse-questions.com):
- **Type**: A
- **Name**: @
- **Value**: 76.76.19.61

### 5. Post-Deployment Steps

1. **Test the website**: Visit https://www.igcse-questions.com
2. **Verify Sanity Studio**: Visit https://www.igcse-questions.com/studio
3. **Test contact form**: Ensure email notifications work
4. **Check SEO**: Verify meta tags and sitemap

## 🔧 Sanity Studio Access

- **Studio URL**: https://igcse-questions.sanity.studio/
- **Local Studio**: http://localhost:3333/studio (when running `npm run sanity:dev`)

## 📝 Content Management

1. Access your Sanity Studio at the URL above
2. Add content for your IGCSE Questions website
3. Content will automatically sync to your live website

## 🌐 Production URLs

- **Main Site**: https://www.igcse-questions.com
- **Studio (Hosted)**: https://igcse-questions.sanity.studio/
- **Studio (Local)**: https://www.igcse-questions.com/studio

## 🔄 Continuous Deployment

The website will automatically redeploy when you:
- Push changes to the `main` branch on GitHub
- Update content in Sanity Studio

## 🎉 You're Done!

Your IGCSE Questions website is now live at www.igcse-questions.com with:
- ✅ Next.js frontend
- ✅ Sanity CMS backend
- ✅ Custom domain
- ✅ Automatic deployments
- ✅ Contact form functionality 