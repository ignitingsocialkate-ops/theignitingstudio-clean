# Hostinger Deployment Guide for The Igniting Studio

## 🎯 **3 Deployment Options for Hostinger**

### **Option 1: Static File Deployment (Shared/Premium Hosting)**
*Best for: Shared hosting plans, easiest setup*

#### **Step 1: Export from Figma Make**
1. Click "Export" in Figma Make
2. Download your project ZIP file
3. Extract to your computer

#### **Step 2: Build Your Project**
On your computer, you'll need Node.js installed:

```bash
# Navigate to your extracted project folder
cd the-igniting-studio

# Install dependencies
npm install

# Create production build
npm run build
```

This creates a `dist` folder with all your static files.

#### **Step 3: Upload to Hostinger**
1. **Log into Hostinger hPanel**
2. **Go to File Manager**
3. **Navigate to public_html folder**
4. **Upload everything from the `dist` folder**
   - index.html
   - assets/ folder
   - All other files

#### **Step 4: Configure Environment Variables**
Create a `.env.production` file in your build:

```env
REACT_APP_WP_API_URL=https://yourdomain.com
REACT_APP_USE_WORDPRESS=true
REACT_APP_ENVIRONMENT=production
REACT_APP_CONTACT_FORM_ID=1
```

#### **Step 5: Set Up WordPress on Same Domain**
1. **Install WordPress** in a subdirectory (e.g., `/admin/`)
2. **Add the WordPress functions** from `wordpress-functions-addon.php`
3. **Configure your domain:**
   - `yourdomain.com` → React app
   - `yourdomain.com/admin/` → WordPress backend

---

### **Option 2: VPS/Cloud Hosting (Full Control)**
*Best for: Better performance, full control*

#### **Requirements:**
- Hostinger VPS or Cloud hosting
- Node.js 18+
- PM2 for process management

#### **Step 1: Set Up Server**
```bash
# Connect to your VPS via SSH
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install PM2 globally
npm install -g pm2

# Install Nginx
apt install nginx -y
```

#### **Step 2: Deploy Your App**
```bash
# Upload your project files to /var/www/igniting-studio/
# Or clone from a Git repository

cd /var/www/igniting-studio/

# Install dependencies
npm install

# Build the production version
npm run build

# Install serve to serve static files
npm install -g serve

# Start the app with PM2
pm2 start "serve -s dist -l 3000" --name "igniting-studio"
pm2 save
pm2 startup
```

#### **Step 3: Configure Nginx**
Create `/etc/nginx/sites-available/igniting-studio`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Handle client-side routing
        try_files $uri $uri/ /index.html;
    }
    
    # WordPress API proxy
    location /wp-json/ {
        proxy_pass http://localhost:8080/wp-json/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable the site
ln -s /etc/nginx/sites-available/igniting-studio /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

---

### **Option 3: Hybrid Approach (Recommended)**
*Best for: Simplicity + Performance*

#### **React App → Hostinger Shared Hosting**
#### **WordPress → Separate Subdomain**

1. **Deploy React app** to main domain using Option 1
2. **Set up WordPress** at `admin.yourdomain.com`
3. **Configure API calls** to point to the subdomain

Update your environment variables:
```env
REACT_APP_WP_API_URL=https://admin.yourdomain.com
REACT_APP_USE_WORDPRESS=true
```

---

## 🔧 **Hostinger-Specific Configuration**

### **For Shared Hosting (.htaccess)**
The `.htaccess` file is already created for you. Make sure it's in your `public_html` folder.

### **WordPress Setup on Hostinger**
1. **Use Hostinger's WordPress installer**
2. **Add custom post types** using the PHP code provided
3. **Install required plugins:**
   - Contact Form 7
   - Polylang (for multi-language)

### **Domain Configuration**
In Hostinger hPanel:
1. **Go to Domains**
2. **Set up DNS records:**
   - A record: `@` → Your server IP
   - CNAME: `www` → `yourdomain.com`
   - CNAME: `admin` → `yourdomain.com` (if using subdomain for WordPress)

---

## 🚀 **Quick Deployment Checklist**

### **For Shared Hosting:**
- [ ] Export project from Figma Make
- [ ] Build project locally (`npm run build`)
- [ ] Upload `dist` contents to `public_html`
- [ ] Configure WordPress in subdirectory
- [ ] Add WordPress custom post types
- [ ] Set environment variables
- [ ] Test all routes and API connections

### **For VPS:**
- [ ] Set up Node.js and PM2
- [ ] Deploy and build project
- [ ] Configure Nginx proxy
- [ ] Set up SSL certificate
- [ ] Configure WordPress backend
- [ ] Test performance and scaling

---

## 📊 **Performance Optimization for Hostinger**

### **Static Assets:**
```html
<!-- Preload critical resources -->
<link rel="preload" href="/assets/main.css" as="style">
<link rel="preload" href="/assets/main.js" as="script">
```

### **Lazy Loading:**
Your React components are already optimized with lazy loading.

### **Caching:**
The `.htaccess` file includes proper caching headers for static assets.

---

## 🔍 **Testing Your Deployment**

### **Check These URLs:**
- `yourdomain.com` - Homepage loads
- `yourdomain.com/about` - Routes work
- `yourdomain.com/hu/` - Hungarian language
- `yourdomain.com/wp-json/wp/v2/posts` - WordPress API

### **Performance Tests:**
- Google PageSpeed Insights
- GTmetrix
- Check mobile responsiveness

---

## 🆘 **Common Issues & Solutions**

### **Issue: Routes return 404**
**Solution:** Ensure `.htaccess` is properly configured in `public_html`

### **Issue: WordPress API not working**
**Solution:** Check CORS headers and API endpoints

### **Issue: Fonts not loading**
**Solution:** Verify font URLs and preload directives

### **Issue: Slow loading**
**Solution:** Enable Hostinger's CDN and compression

---

## 📞 **Support Resources**

- **Hostinger Documentation:** [hostinger.com/tutorials](https://hostinger.com/tutorials)
- **WordPress REST API:** [developer.wordpress.org/rest-api](https://developer.wordpress.org/rest-api/)
- **React Router:** [reactrouter.com](https://reactrouter.com)

Your sophisticated React app will work perfectly on Hostinger with proper configuration!