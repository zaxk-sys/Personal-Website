# Zakariya Mohamed - Portfolio Website

A futuristic, Gen Z-inspired personal portfolio website for a Cloud Infrastructure Engineer. Built with pure HTML, CSS, and JavaScript - no build step required.

## ✨ Recent Updates (Animation & Theme Polish)

### Enhanced Features:
- **🎨 Theme Toggle**: Smooth dark/light mode switching with fade transitions and localStorage persistence
- **✨ Micro-Animations**: 
  - Logo pulse animation on hover
  - Navbar gradient underline that glides between menu items
  - 3D tilt effects on project/knowledge base cards
  - Button ripple effects on click
  - Enhanced glow effects on interactive elements
- **📱 Scroll Animations**: Elements fade and slide into view using IntersectionObserver
- **🎭 Visual Depth**: 
  - Animated background gradients
  - Enhanced particle effects (60 particles on home page)
  - Soft glow effects with cyan/purple hues
  - Smooth parallax effect on hero section
- **⚡ Performance**: Lightweight animations using CSS transforms and requestAnimationFrame
- **🔄 Page Transitions**: Smooth fade-in/out when navigating between pages

### Technical Improvements:
- Separated theme logic into `assets/js/main.js`
- Enhanced animation system in `assets/js/animations.js`
- Added 3D transforms with `transform-style: preserve-3d`
- Improved mobile responsiveness for all animations
- Added ripple effects for better user feedback
- Optimized scroll performance with throttling

## 🎨 Features

- **Dark, Cinematic Design**: Neon gradient accents (cyan → violet) with smooth animations
- **Responsive Layout**: Mobile-first design that works on all devices
- **Smooth Animations**: Scroll-triggered fades, hover effects, and page transitions
- **Theme Toggle**: Switch between dark and light themes
- **Interactive Elements**: 
  - Floating particles on home page
  - Animated project cards
  - Filterable knowledge base
  - Animated contact form
- **No Build Step**: Pure static files ready for deployment

## 📁 Project Structure

```
zakariya-portfolio/
├── index.html              # Home page with hero section
├── projects.html           # Projects showcase
├── knowledge-base.html     # Filterable knowledge base
├── contact.html            # Contact form
├── assets/
│   ├── css/
│   │   └── main.css        # Main stylesheet with theme system & animations
│   ├── js/
│   │   ├── main.js         # Theme toggle & core functionality
│   │   └── animations.js   # Enhanced animations & micro-interactions
│   └── images/             # Image assets (add your images here)
└── README.md               # This file
```

## 🚀 Deployment Instructions

### Option 1: Nginx Deployment (Recommended)

1. **Install Nginx** (if not already installed):
   ```bash
   # Ubuntu/Debian
   sudo apt update && sudo apt install nginx
   
   # CentOS/RHEL
   sudo yum install nginx
   ```

2. **Copy files to Nginx directory**:
   ```bash
   sudo cp -r zakariya-portfolio/* /var/www/html/
   # Or create a custom directory
   sudo mkdir -p /var/www/zakariya-portfolio
   sudo cp -r zakariya-portfolio/* /var/www/zakariya-portfolio/
   ```

3. **Configure Nginx** (if using custom directory):
   Create/edit `/etc/nginx/sites-available/zakariya-portfolio`:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;
       root /var/www/zakariya-portfolio;
       index index.html;

       location / {
           try_files $uri $uri/ =404;
       }

       # Enable gzip compression
       gzip on;
       gzip_vary on;
       gzip_min_length 1024;
       gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss;

       # Cache static assets
       location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

4. **Enable the site**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/zakariya-portfolio /etc/nginx/sites-enabled/
   sudo nginx -t  # Test configuration
   sudo systemctl restart nginx
   ```

5. **Set permissions**:
   ```bash
   sudo chown -R www-data:www-data /var/www/zakariya-portfolio
   sudo chmod -R 755 /var/www/zakariya-portfolio
   ```

### Option 2: Apache Deployment

1. **Install Apache**:
   ```bash
   sudo apt install apache2  # Ubuntu/Debian
   sudo yum install httpd     # CentOS/RHEL
   ```

2. **Copy files**:
   ```bash
   sudo cp -r zakariya-portfolio/* /var/www/html/
   ```

3. **Enable mod_rewrite** (if needed):
   ```bash
   sudo a2enmod rewrite
   sudo systemctl restart apache2
   ```

### Option 3: GitHub Pages

1. **Create a GitHub repository** and push your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/zakariya-portfolio.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select source branch (usually `main`)
   - Your site will be available at `https://yourusername.github.io/zakariya-portfolio/`

### Option 4: Netlify / Vercel

1. **Netlify**:
   - Drag and drop the project folder to [Netlify Drop](https://app.netlify.com/drop)
   - Or connect your Git repository

2. **Vercel**:
   - Install Vercel CLI: `npm i -g vercel`
   - Run `vercel` in the project directory
   - Follow the prompts

### Option 5: AWS S3 + CloudFront

1. **Create S3 bucket**:
   ```bash
   aws s3 mb s3://zakariya-portfolio
   ```

2. **Upload files**:
   ```bash
   aws s3 sync . s3://zakariya-portfolio --exclude ".git/*"
   ```

3. **Enable static website hosting**:
   - Go to S3 bucket → Properties → Static website hosting
   - Set index document to `index.html`

4. **Create CloudFront distribution** (optional, for CDN):
   - Point to S3 bucket
   - Set default root object to `index.html`

## 🎨 Customization

### Update Personal Information

1. **Edit `index.html`**:
   - Update name, title, and description in the hero section
   - Modify the "About Me" section
   - Update skills/expertise

2. **Edit `projects.html`**:
   - Replace project cards with your actual projects
   - Update tags and descriptions

3. **Edit `knowledge-base.html`**:
   - Add your own knowledge base entries
   - Update filter categories as needed

4. **Edit `contact.html`**:
   - Update contact information (email, LinkedIn, GitHub)
   - Connect form to your backend/email service

### Theme Colors

Edit CSS variables in `assets/css/main.css`:
```css
:root {
  --neon-cyan: #00F5FF;      /* Change cyan color */
  --neon-violet: #B026FF;    /* Change violet color */
  --neon-pink: #FF00E5;      /* Change pink color */
  --bg-primary: #0D0F12;     /* Change background */
}
```

### Add Images

1. Place images in `assets/images/`
2. Reference them in HTML:
   ```html
   <img src="assets/images/your-image.jpg" alt="Description">
   ```

### Form Backend Integration

The contact form currently shows a success message. To connect to a backend:

1. **Update `assets/js/animations.js`** in the form submission handler:
   ```javascript
   // Replace the setTimeout with actual API call
   fetch('/api/contact', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(formData)
   })
   .then(response => response.json())
   .then(data => {
     // Handle success
   });
   ```

2. **Backend options**:
   - AWS Lambda + API Gateway
   - Netlify Functions
   - Vercel Serverless Functions
   - Custom Node.js/Python backend

## 🛠️ Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Notes

- All animations use pure CSS and vanilla JavaScript (no GSAP dependency)
- Theme preference is saved in localStorage
- Mobile menu automatically closes when clicking a link
- All pages include smooth page transitions
- Form validation is handled client-side

## 🔧 Troubleshooting

### Styles not loading?
- Check file paths in HTML `<link>` tags
- Ensure CSS file is in `assets/css/main.css`
- Check browser console for 404 errors

### Animations not working?
- Ensure JavaScript file is loaded: `assets/js/animations.js`
- Check browser console for JavaScript errors
- Verify all HTML elements have correct classes

### Theme toggle not working?
- Check browser localStorage permissions
- Clear browser cache and reload
- Verify JavaScript is enabled

## 📄 License

This portfolio template is open source and available for personal use. Feel free to customize it for your own portfolio!

## 👤 Author

**Zakariya Mohamed**
- Cloud Infrastructure Engineer
- Portfolio: [Your Domain]
- Email: itszakariya0@gmail.com

---

Built with ❤️ for the cloud infrastructure community.

