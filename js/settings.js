// Site settings and categories management
let siteSettings = {};
let siteCategories = [];

// Load site settings and categories
async function loadSiteSettings() {
    try {
        // Load settings
        const settingsResponse = await fetch('/settings.json');
        if (settingsResponse.ok) {
            siteSettings = await settingsResponse.json();
            applySiteSettings();
        }

        // Load categories
        const categoriesResponse = await fetch('/categories.json');
        if (categoriesResponse.ok) {
            siteCategories = await categoriesResponse.json();
            updateNavigation();
        }
    } catch (error) {
        console.log('Could not load site configuration:', error);
    }
}

// Apply loaded settings to the page
function applySiteSettings() {
    // Update site title in header
    const siteTitle = document.querySelector('.logo');
    if (siteTitle && siteSettings.title) {
        siteTitle.textContent = siteSettings.title;
    }

    // Update page title
    if (siteSettings.title) {
        document.title = siteSettings.title + (document.title.includes(' - ') ? document.title.substring(document.title.indexOf(' - ')) : '');
    }

    // Update tagline if present
    const taglineElement = document.querySelector('.site-tagline');
    if (taglineElement && siteSettings.tagline) {
        taglineElement.textContent = siteSettings.tagline;
    }

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && siteSettings.description) {
        metaDescription.setAttribute('content', siteSettings.description);
    }

    // Update about section
    updateAboutSection();
    
    // Update contact information
    updateContactInfo();
    
    // Update social media links
    updateSocialLinks();
    
    // Apply color theme
    applyColorTheme();
}

// Update about section content
function updateAboutSection() {
    const aboutTitle = document.querySelector('#about h2');
    if (aboutTitle && siteSettings.about_title) {
        aboutTitle.textContent = siteSettings.about_title;
    }

    const aboutText = document.querySelector('#about .about-text');
    if (aboutText && siteSettings.about_content) {
        // Convert markdown-style content to HTML
        const htmlContent = siteSettings.about_content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^(.*)$/gm, '<p>$1</p>')
            .replace(/<p><\/p>/g, '');
        aboutText.innerHTML = htmlContent;
    }
}

// Update contact information
function updateContactInfo() {
    // Update email links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        if (siteSettings.email) {
            link.href = `mailto:${siteSettings.email}`;
            if (link.textContent.includes('@')) {
                link.textContent = siteSettings.email;
            }
        }
    });

    // Update phone links
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        if (siteSettings.phone) {
            link.href = `tel:${siteSettings.phone}`;
            if (link.textContent.includes('+') || link.textContent.includes('9')) {
                link.textContent = siteSettings.phone;
            }
        }
    });

    // Update contact section content
    const contactEmail = document.querySelector('.contact-email');
    if (contactEmail && siteSettings.email) {
        contactEmail.textContent = siteSettings.email;
    }

    const contactPhone = document.querySelector('.contact-phone');
    if (contactPhone && siteSettings.phone) {
        contactPhone.textContent = siteSettings.phone;
    }

    const contactAddress = document.querySelector('.contact-address');
    if (contactAddress && siteSettings.address) {
        contactAddress.textContent = siteSettings.address;
    }

    const contactHours = document.querySelector('.contact-hours');
    if (contactHours && siteSettings.hours) {
        contactHours.textContent = siteSettings.hours;
    }

    // Add WhatsApp link if provided
    if (siteSettings.whatsapp) {
        const whatsappContact = document.querySelector('.whatsapp-contact');
        const whatsappLink = document.querySelector('.whatsapp-link');
        if (whatsappContact && whatsappLink) {
            whatsappLink.href = `https://wa.me/${siteSettings.whatsapp.replace(/[^\d]/g, '')}`;
            whatsappContact.style.display = 'block';
        }
    }
}

// Update social media links
function updateSocialLinks() {
    const socialLinks = {
        facebook: document.querySelector('.social-facebook'),
        instagram: document.querySelector('.social-instagram'),
        twitter: document.querySelector('.social-twitter'),
        youtube: document.querySelector('.social-youtube'),
        linkedin: document.querySelector('.social-linkedin')
    };

    Object.keys(socialLinks).forEach(platform => {
        const element = socialLinks[platform];
        if (element && siteSettings[platform]) {
            element.href = siteSettings[platform];
            element.style.display = 'inline-flex';
        } else if (element) {
            element.style.display = 'none';
        }
    });
}

// Apply color theme from settings
function applyColorTheme() {
    if (!siteSettings.colors) return;

    const root = document.documentElement;
    const colors = siteSettings.colors;

    // Apply CSS custom properties
    if (colors.primary) root.style.setProperty('--primary-color', colors.primary);
    if (colors.secondary) root.style.setProperty('--secondary-color', colors.secondary);
    if (colors.background) root.style.setProperty('--background-color', colors.background);
    if (colors.text) root.style.setProperty('--text-dark', colors.text);
    if (colors.text_light) root.style.setProperty('--text-light', colors.text_light);

    console.log('Applied color theme:', colors);
}

// Update navigation based on categories
function updateNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu || !siteCategories.length) return;

    // Find the categories dropdown
    const categoriesDropdown = navMenu.querySelector('.dropdown-menu');
    if (!categoriesDropdown) return;

    // Clear existing category links
    categoriesDropdown.innerHTML = '';

    // Add category links based on loaded categories
    siteCategories.forEach(category => {
        if (category.featured) {
            const categoryLink = document.createElement('a');
            categoryLink.href = `${category.id}.html`;
            categoryLink.className = 'dropdown-link';
            categoryLink.textContent = category.name;
            categoriesDropdown.appendChild(categoryLink);
        }
    });

    console.log('Updated navigation with categories:', siteCategories);
}

// Initialize settings when DOM is loaded
document.addEventListener('DOMContentLoaded', loadSiteSettings);

// Export for use in other scripts
window.siteSettings = siteSettings;
window.siteCategories = siteCategories;
window.loadSiteSettings = loadSiteSettings;