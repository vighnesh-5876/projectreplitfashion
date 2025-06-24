# Elegant Threads Fashion Website

## Overview

Elegant Threads is a static fashion website showcasing Indian traditional wear including sarees, kurtis, and blouses. The site is built as a static HTML/CSS/JavaScript website with content management capabilities through Netlify CMS. It's designed to be a simple, elegant showcase for fashion products with an admin panel for content management.

## System Architecture

### Frontend Architecture
- **Static HTML/CSS/JavaScript**: Pure frontend implementation without server-side dependencies
- **Multi-page Structure**: Separate pages for different product categories (sarees, kurtis, blouses)
- **Responsive Design**: Mobile-first approach using CSS Grid and Flexbox
- **Progressive Enhancement**: Core functionality works without JavaScript

### Content Management
- **Netlify CMS Integration**: Git-based content management system for product catalog
- **Markdown-based Content**: Products stored as markdown files in `/content/products/`
- **Media Management**: Images stored in `/static/uploads/` directory
- **Admin Interface**: Web-based admin panel at `/admin/` for content editing

### Styling and UI
- **Custom CSS**: Hand-written CSS with CSS custom properties for theming
- **Typography**: Google Fonts (Playfair Display for headings, Inter for body text)
- **Icons**: Font Awesome for UI icons
- **Color Scheme**: Gold/brown theme reflecting luxury fashion branding

## Key Components

### Navigation System
- **Sticky Header**: Fixed navigation with dropdown menus for categories
- **Mobile-Responsive**: Hamburger menu for mobile devices
- **Active State Management**: JavaScript-powered active link highlighting

### Product Display
- **Category Pages**: Dedicated pages for each product category
- **Product Grid**: Responsive grid layout for product listings
- **Product Details**: Individual product detail pages
- **Filtering and Sorting**: JavaScript-based product filtering (ready for implementation)

### Content Management System
- **Git-Gateway Backend**: Uses Netlify's Git-gateway for authentication
- **YAML Configuration**: Admin panel configured via `/admin/config.yml`
- **Rich Content Editing**: Markdown editor with image upload capabilities
- **Settings Management**: Centralized site settings through CMS

## Data Flow

1. **Content Creation**: Administrators create/edit products through Netlify CMS admin panel
2. **Git Storage**: Content is stored as markdown files in the repository
3. **Static Generation**: Jekyll configuration suggests static site generation capability
4. **Client-Side Rendering**: JavaScript loads and displays products from content files
5. **Media Delivery**: Images served from `/static/uploads/` directory

## External Dependencies

### CDN Dependencies
- **Google Fonts**: Typography (Playfair Display, Inter)
- **Font Awesome**: Icon library
- **Netlify CMS**: Content management interface
- **Netlify Identity**: Authentication for admin access

### Development Dependencies
- **http-server**: Local development server (Node.js)
- **Jekyll**: Static site generator (optional, configured but not required)

### Hosting Requirements
- **Static Hosting**: Compatible with Netlify, GitHub Pages, or any static host
- **Git Integration**: Requires Git-based hosting for CMS functionality

## Deployment Strategy

### Primary Deployment
- **Netlify Hosting**: Configured for Netlify with CMS integration
- **Automatic Builds**: Git-based deployment with automatic rebuilds on content changes
- **Live Domain**: Deployed at `https://fashionfashionfashionreptile.netlify.app`

### Development Environment
- **Local Server**: Python HTTP server or Node.js http-server for development
- **File-based Development**: No database or backend server required
- **Content Preview**: Local development works with static content files

### Build Process
- **No Build Step Required**: Can be deployed as-is for basic functionality
- **Optional Jekyll**: Jekyll configuration available for enhanced static generation
- **Asset Optimization**: Manual CSS/JS optimization (no build pipeline configured)

## Changelog

```
Changelog:
- June 24, 2025: Initial setup with complete Netlify CMS integration
- June 24, 2025: Added sample products and full Netlify configuration
- June 24, 2025: Updated configuration for live Netlify domain
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```