# Elegant Threads - Fashion Designer Website

A beautiful static website for showcasing Indian fashion collections including sarees, kurtis, and blouses. Built with HTML, CSS, JavaScript, and integrated with Netlify CMS for easy content management.

## Features

- **Responsive Design**: Mobile-first approach with elegant UI
- **Product Showcase**: Dedicated pages for different fashion categories
- **Content Management**: Netlify CMS integration for easy product management
- **Static Site**: No backend required, fast loading times
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## Quick Start

### Local Development

1. Clone this repository
2. Run a local server:
   ```bash
   python -m http.server 5000
   # or
   npx http-server -p 5000
   ```
3. Open `http://localhost:5000` in your browser

### Admin Panel

Access the admin panel at `/admin` to manage products and site settings.

## Netlify Deployment

### Prerequisites

- GitHub/GitLab repository
- Netlify account

### Deployment Steps

1. **Connect Repository**
   - Log in to Netlify
   - Click "New site from Git"
   - Choose your repository
   - Set build settings:
     - Build command: `echo 'Static site'`
     - Publish directory: `.` (root)

2. **Enable Netlify Identity**
   - Go to Site Settings > Identity
   - Click "Enable Identity"
   - Set registration to "Invite only"
   - Enable Git Gateway

3. **Configure Git Gateway**
   - In Identity settings, enable Git Gateway
   - Generate access token if needed

4. **Create Admin User**
   - Go to Identity tab
   - Click "Invite users"
   - Enter admin email address
   - User will receive invitation to set password

### Post-Deployment Configuration

1. **Update Site URL**: Edit `admin/config.yml` with your actual Netlify URL
2. **Test Admin Access**: Visit `https://fashionfashionfashionreptile.netlify.app/admin`
3. **Add Products**: Use the admin panel to add your first products
4. **Customize Settings**: Update site information through the admin panel

## Content Management

### Adding Products

1. Go to `/admin` and log in
2. Click "Products" in the sidebar
3. Click "New Product"
4. Fill in product details:
   - Title
   - Category (Sarees, Kurtis, or Blouses)
   - Price
   - Image
   - Description
   - Set as featured (optional)
5. Save and publish

### Managing Site Settings

1. Go to admin panel
2. Click "Settings"
3. Update contact information, social links, etc.

## File Structure

```
├── admin/
│   ├── index.html          # Admin panel entry point
│   └── config.yml          # CMS configuration
├── content/
│   ├── products/           # Product markdown files
│   └── settings/           # Site settings
├── static/uploads/         # Uploaded images
├── css/styles.css          # Main stylesheet
├── js/
│   ├── main.js            # Core functionality
│   └── products.js        # Product management
├── index.html             # Homepage
├── products.html          # All products page
├── sarees.html           # Sarees category page
├── kurtis.html           # Kurtis category page
├── blouses.html          # Blouses category page
├── product-detail.html   # Individual product page
├── netlify.toml          # Netlify configuration
└── _config.yml           # Jekyll configuration (optional)
```

## Customization

### Colors and Branding

Edit CSS custom properties in `css/styles.css`:

```css
:root {
    --primary-color: #d4af37;    /* Gold */
    --secondary-color: #8b6f3f;  /* Dark gold */
    --accent-color: #e8c170;     /* Light gold */
}
```

### Navigation and Categories

Update navigation in HTML files and category options in `admin/config.yml`.

### Contact Information

Update contact details in:
- HTML files (contact section)
- `content/settings/site.md`
- Admin panel settings

## SEO Optimization

- Update meta descriptions in each HTML file
- Add structured data for products
- Optimize images with proper alt tags
- Use semantic HTML structure

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive enhancement for older browsers

## Troubleshooting

### Admin Panel Not Loading

1. Check Netlify Identity is enabled
2. Verify Git Gateway configuration
3. Ensure correct permissions for repository

### Products Not Displaying

1. Check product files in `content/products/`
2. Verify correct YAML frontmatter format
3. Clear browser cache

### Images Not Loading

1. Check image paths in product files
2. Verify images uploaded to `static/uploads/`
3. Check file permissions

## Support

For issues related to:
- **Netlify CMS**: Check [Netlify CMS documentation](https://www.netlifycms.org/docs/)
- **Netlify Hosting**: Visit [Netlify documentation](https://docs.netlify.com/)
- **Website Functionality**: Check browser console for errors

## License

This project is open source and available under the [MIT License](LICENSE).