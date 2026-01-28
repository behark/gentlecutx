# GentleCutx - Premium Barbershop Website

A modern, responsive website for GentleCutx barbershop featuring an online booking system, service catalog, and professional design.

## 🚀 Features

- **Online Booking System** - Multi-step appointment booking with service, barber, date, and time selection
- **Services Catalog** - Complete list of services with pricing and duration
- **Team Profiles** - Meet the barbers with their specialties
- **Gallery** - Showcase of the salon environment
- **Reviews Section** - Client testimonials and ratings
- **Special Offers** - Promotional deals with promo codes
- **Contact Form** - Direct communication with the salon
- **Responsive Design** - Works perfectly on all devices
- **SEO Optimized** - Meta tags, sitemap, and robots.txt included

## 📁 Project Structure

```
gentlecutx-website/
├── public/
│   ├── favicon.svg          # Site favicon
│   ├── robots.txt            # SEO robots file
│   ├── sitemap.xml           # SEO sitemap
│   └── _redirects            # SPA routing for Netlify
├── src/
│   ├── components/           # Reusable UI components
│   ├── pages/                # Page components
│   ├── data/                 # Salon data (services, barbers, etc.)
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles with Tailwind
├── index.html                # HTML template with meta tags
└── package.json              # Dependencies and scripts
```

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons
- **date-fns** - Date formatting

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

The website is ready to deploy on any static hosting platform:

### Netlify (Recommended)
1. Connect your repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. The `_redirects` file handles SPA routing automatically

### Vercel
1. Import project from Git
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

### Manual Deployment
1. Run `npm run build`
2. Upload contents of `dist/` folder to your hosting

## ⚙️ Configuration

### Update Salon Information
Edit `src/data/salonData.js` to customize:
- Salon name, address, phone, email
- Opening hours
- Services and pricing
- Barbers/staff profiles
- Client reviews
- Gallery images

### Update Meta Tags
Edit `index.html` to change:
- Site title and description
- Open Graph images
- Domain URLs in meta tags

### Update Domain
Search and replace `gentlecutx.com` with your actual domain in:
- `index.html` (meta tags)
- `public/sitemap.xml`
- `public/robots.txt`

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero, gallery, services preview |
| Services | `/services` | Full service catalog |
| Booking | `/booking` | Online appointment booking |
| About | `/about` | Salon information and team |
| Contact | `/contact` | Contact form and details |
| Privacy Policy | `/privacy` | Privacy policy page |
| Terms of Service | `/terms` | Terms and conditions |
| 404 | `/*` | Not found page |

## 🎨 Customization

### Colors
Edit `src/index.css` theme section:
```css
@theme {
  --color-primary: #1a1a2e;    /* Dark blue - main color */
  --color-secondary: #c9a050;  /* Gold - accent color */
  --color-accent: #d4af37;     /* Light gold - hover states */
}
```

### Fonts
The site uses Inter font from Google Fonts. Change in `index.html` if needed.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📞 Support

For technical support or customization requests, contact the developer.

---

**Built with ❤️ for GentleCutx**
