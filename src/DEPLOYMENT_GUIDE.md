# Production Deployment Guide - The Igniting Studio

## Quick Deployment Summary

Your React application is **production-ready** and can be deployed in two ways:

### Option 1: Headless WordPress (Recommended)
- **WordPress Backend**: `admin.theignitingstudio.com` (Traditional hosting)
- **React Frontend**: `theignitingstudio.com` (Vercel/Netlify)
- **Benefits**: Better performance, modern hosting, automatic deployments

### Option 2: Traditional WordPress (Alternative)
- Convert React components to WordPress theme
- Host everything on WordPress hosting
- **Benefits**: Single hosting account, familiar WordPress workflow

## Production Deployment - Option 1 (Headless)

### Step 1: WordPress Backend Setup

1. **Purchase WordPress Hosting** for `admin.theignitingstudio.com`
   - Recommended: SiteGround, WP Engine, or Kinsta
   - Minimum: PHP 7.4+, MySQL 5.6+, SSL certificate

2. **Install WordPress** on the subdomain

3. **Install Required Plugins:**
   ```
   - Advanced Custom Fields (ACF) Pro
   - Polylang (for Hungarian/English)
   - Contact Form 7
   - Custom Post Type UI
   - Yoast SEO (optional)
   ```

4. **Add Custom Code** to `functions.php` or create a plugin:
   ```php
   // Copy the PHP code from WORDPRESS_HEADLESS_SETUP.md
   // This registers portfolio/services post types and enables CORS
   ```

5. **Configure ACF Fields** (see detailed setup in WORDPRESS_HEADLESS_SETUP.md)

6. **Add Initial Content:**
   - Portfolio items (Frank Bordoni, PureGems, etc.)
   - Services (Social Media, Website Creation, etc.)
   - Blog posts
   - Set up English/Hungarian translations

### Step 2: React Frontend Deployment

#### Deploy to Vercel (Recommended):

1. **Connect Repository:**
   ```bash
   # Push your code to GitHub/GitLab/Bitbucket
   git add .
   git commit -m "Ready for production"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Connect your repository
   - Import your project
   - Configure environment variables:
     ```
     REACT_APP_WP_API_URL=https://admin.theignitingstudio.com
     REACT_APP_ENVIRONMENT=production
     REACT_APP_USE_WORDPRESS=true
     REACT_APP_SHOW_WP_STATUS=false
     REACT_APP_CONTACT_FORM_ID=1
     ```

3. **Custom Domain:**
   - Add `theignitingstudio.com` in Vercel domain settings
   - Update DNS records as instructed by Vercel

#### Deploy to Netlify (Alternative):

1. **Build and Deploy:**
   ```bash
   npm run build
   ```

2. **Connect to Netlify:**
   - Drag `build` folder to Netlify drop zone, OR
   - Connect Git repository for automatic deployments

3. **Environment Variables:**
   - Add same environment variables as Vercel above

### Step 3: DNS Configuration

Configure your domain DNS:
```
Type    Name    Value
CNAME   admin   your-wordpress-hosting-server.com
CNAME   @       your-vercel-or-netlify-url.com
```

### Step 4: SSL & Security

- WordPress hosting should provide SSL for `admin.theignitingstudio.com`
- Vercel/Netlify automatically provides SSL for `theignitingstudio.com`
- Verify both domains load with `https://`

## Production Deployment - Option 2 (WordPress Theme)

If you prefer everything on WordPress hosting:

### Step 1: Convert React to WordPress Theme

1. **Create WordPress Theme Structure:**
   ```
   wp-content/themes/igniting-studio/
   ├── style.css
   ├── index.php
   ├── functions.php
   ├── header.php
   ├── footer.php
   └── assets/
       ├── css/
       ├── js/
       └── images/
   ```

2. **Build React App:**
   ```bash
   npm run build
   ```

3. **Copy Build Files:**
   - Copy CSS from `build/static/css/` to `assets/css/`
   - Copy JS from `build/static/js/` to `assets/js/`
   - Copy images to `assets/images/`

4. **Create PHP Templates:**
   Convert React components to PHP files using WordPress functions

5. **Enqueue Assets** in `functions.php`:
   ```php
   wp_enqueue_script('igniting-studio-js', get_template_directory_uri() . '/assets/js/main.js');
   wp_enqueue_style('igniting-studio-css', get_template_directory_uri() . '/assets/css/main.css');
   ```

### Step 2: WordPress Hosting Deployment

1. Upload theme files via FTP/SFTP
2. Activate theme in WordPress admin
3. Configure the same plugins and content as Option 1

## Testing Your Deployment

### WordPress Backend Tests:
```bash
# Test REST API endpoints
curl https://admin.theignitingstudio.com/wp-json/wp/v2/posts
curl https://admin.theignitingstudio.com/wp-json/wp/v2/portfolio
curl https://admin.theignitingstudio.com/wp-json/wp/v2/services
```

### Frontend Tests:
1. Visit `https://theignitingstudio.com`
2. Test language switching (EN/HU)
3. Check portfolio items load
4. Verify contact form works
5. Test mobile responsiveness
6. Check WordPress connection status (if enabled)

## Performance Optimization

### WordPress Backend:
- Enable caching plugin (WP Rocket, W3 Total Cache)
- Optimize images (WebP format)
- Use CDN for media files
- Regular database optimization

### React Frontend:
- Already optimized with code splitting
- Vercel/Netlify provide global CDN
- Images lazy load automatically
- CSS/JS minified in build

## Monitoring & Maintenance

### Automatic Updates:
- **Vercel/Netlify**: Deploys automatically on Git push
- **WordPress**: Enable auto-updates for core and plugins
- **Content**: Updates via WordPress admin reflect immediately

### Backup Strategy:
- **WordPress**: Use hosting provider's backup or plugin backup
- **React Code**: Git repository is your backup
- **Database**: Regular MySQL backups

### Performance Monitoring:
- Google PageSpeed Insights
- GTmetrix
- WordPress connection status indicator (development mode)

## Costs Estimation

### Option 1 (Headless - Recommended):
- **WordPress Hosting**: $10-30/month (SiteGround, etc.)
- **React Hosting**: $0/month (Vercel/Netlify free tier)
- **Domain**: $10-15/year
- **Total**: ~$120-370/year

### Option 2 (Traditional WordPress):
- **WordPress Hosting**: $15-50/month (needs to handle more traffic)
- **Domain**: $10-15/year
- **Total**: ~$195-615/year

## Migration from Current Setup

If you currently have a website:

1. **Backup existing site**
2. **Set up WordPress on subdomain first** (`admin.theignitingstudio.com`)
3. **Deploy React app to staging URL**
4. **Test everything thoroughly**
5. **Update DNS to point to new setup**
6. **Monitor for 24-48 hours**

## Support & Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure WordPress CORS headers are properly configured
2. **Content Not Loading**: Check REST API endpoints and ACF field exposure
3. **Language Switching Issues**: Verify Polylang configuration
4. **Slow Performance**: Enable caching on WordPress backend

### Getting Help:
- WordPress issues: Check hosting provider support
- React deployment issues: Vercel/Netlify documentation
- Custom development: The Igniting Studio team

## Final Deployment Checklist

- [ ] WordPress backend deployed and accessible
- [ ] All required plugins installed and configured
- [ ] Custom post types and fields set up
- [ ] Initial content created (portfolio, services, blog)
- [ ] Multi-language content configured
- [ ] React app deployed to production
- [ ] Environment variables configured
- [ ] Custom domain connected
- [ ] SSL certificates active
- [ ] Both languages working (EN/HU)
- [ ] Contact form functional
- [ ] WordPress connection verified
- [ ] Performance tested
- [ ] SEO configured
- [ ] Analytics set up (if desired)
- [ ] Backup system in place

Your site is production-ready! The headless WordPress approach gives you the best of both worlds: easy content management through WordPress and cutting-edge performance through modern React hosting.