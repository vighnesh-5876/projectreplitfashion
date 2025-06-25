<<<<<<< HEAD
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Build script to generate settings.json and categories.json from markdown files
function buildSettings() {
    buildSiteSettings();
    buildCategories();
}

function buildSiteSettings() {
    const settingsFile = path.join(__dirname, 'content', 'settings', 'site.md');
    const outputFile = path.join(__dirname, 'settings.json');

    try {
        // Check if settings file exists
        if (!fs.existsSync(settingsFile)) {
            console.log('Settings file not found, creating default settings.json');
            const defaultSettings = {
                title: "Elegant Threads",
                tagline: "Premium Indian Fashion",
                description: "Premium Indian fashion designer boutique",
                about_title: "About Elegant Threads",
                about_content: "Welcome to Elegant Threads...",
                email: "contact@elegantthreads.com",
                phone: "+91 98765 43210",
                colors: {
                    primary: "#D4AF37",
                    secondary: "#8B7355",
                    background: "#FFFFFF",
                    text: "#2C3E50",
                    text_light: "#7F8C8D"
                }
            };
            fs.writeFileSync(outputFile, JSON.stringify(defaultSettings, null, 2));
            return;
        }

        // Read and parse settings file
        const fileContent = fs.readFileSync(settingsFile, 'utf8');
        const { data } = matter(fileContent);
        
        // Write settings.json
        fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
        console.log('Generated settings.json with site configuration');

    } catch (error) {
        console.error('Error building settings:', error);
        // Create default file on error
        const defaultSettings = {
            title: "Elegant Threads",
            tagline: "Premium Indian Fashion",
            description: "Premium Indian fashion designer boutique",
            email: "contact@elegantthreads.com",
            phone: "+91 98765 43210"
        };
        fs.writeFileSync(outputFile, JSON.stringify(defaultSettings, null, 2));
    }
}

function buildCategories() {
    const categoriesFile = path.join(__dirname, 'content', 'settings', 'categories.md');
    const outputFile = path.join(__dirname, 'categories.json');

    try {
        // Check if categories file exists
        if (!fs.existsSync(categoriesFile)) {
            console.log('Categories file not found, creating default categories.json');
            const defaultCategories = [
                { name: "Sarees", id: "sarees", description: "Traditional Indian sarees", featured: true },
                { name: "Kurtis", id: "kurtis", description: "Comfortable daily wear", featured: true },
                { name: "Blouses", id: "blouses", description: "Designer blouses", featured: true }
            ];
            fs.writeFileSync(outputFile, JSON.stringify(defaultCategories, null, 2));
            return;
        }

        // Read and parse categories file
        const fileContent = fs.readFileSync(categoriesFile, 'utf8');
        const { data } = matter(fileContent);
        
        // Write categories.json
        const categories = data.categories || [];
        fs.writeFileSync(outputFile, JSON.stringify(categories, null, 2));
        console.log(`Generated categories.json with ${categories.length} categories`);

    } catch (error) {
        console.error('Error building categories:', error);
        // Create default file on error
        const defaultCategories = [
            { name: "Sarees", id: "sarees", description: "Traditional Indian sarees", featured: true },
            { name: "Kurtis", id: "kurtis", description: "Comfortable daily wear", featured: true },
            { name: "Blouses", id: "blouses", description: "Designer blouses", featured: true }
        ];
        fs.writeFileSync(outputFile, JSON.stringify(defaultCategories, null, 2));
    }
}

// Run if called directly
if (require.main === module) {
    buildSettings();
}

=======
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Build script to generate settings.json and categories.json from markdown files
function buildSettings() {
    buildSiteSettings();
    buildCategories();
}

function buildSiteSettings() {
    const settingsFile = path.join(__dirname, 'content', 'settings', 'site.md');
    const outputFile = path.join(__dirname, 'settings.json');

    try {
        // Check if settings file exists
        if (!fs.existsSync(settingsFile)) {
            console.log('Settings file not found, creating default settings.json');
            const defaultSettings = {
                title: "Elegant Threads",
                tagline: "Premium Indian Fashion",
                description: "Premium Indian fashion designer boutique",
                about_title: "About Elegant Threads",
                about_content: "Welcome to Elegant Threads...",
                email: "contact@elegantthreads.com",
                phone: "+91 98765 43210",
                colors: {
                    primary: "#D4AF37",
                    secondary: "#8B7355",
                    background: "#FFFFFF",
                    text: "#2C3E50",
                    text_light: "#7F8C8D"
                }
            };
            fs.writeFileSync(outputFile, JSON.stringify(defaultSettings, null, 2));
            return;
        }

        // Read and parse settings file
        const fileContent = fs.readFileSync(settingsFile, 'utf8');
        const { data } = matter(fileContent);
        
        // Write settings.json
        fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
        console.log('Generated settings.json with site configuration');

    } catch (error) {
        console.error('Error building settings:', error);
        // Create default file on error
        const defaultSettings = {
            title: "Elegant Threads",
            tagline: "Premium Indian Fashion",
            description: "Premium Indian fashion designer boutique",
            email: "contact@elegantthreads.com",
            phone: "+91 98765 43210"
        };
        fs.writeFileSync(outputFile, JSON.stringify(defaultSettings, null, 2));
    }
}

function buildCategories() {
    const categoriesFile = path.join(__dirname, 'content', 'settings', 'categories.md');
    const outputFile = path.join(__dirname, 'categories.json');

    try {
        // Check if categories file exists
        if (!fs.existsSync(categoriesFile)) {
            console.log('Categories file not found, creating default categories.json');
            const defaultCategories = [
                { name: "Sarees", id: "sarees", description: "Traditional Indian sarees", featured: true },
                { name: "Kurtis", id: "kurtis", description: "Comfortable daily wear", featured: true },
                { name: "Blouses", id: "blouses", description: "Designer blouses", featured: true }
            ];
            fs.writeFileSync(outputFile, JSON.stringify(defaultCategories, null, 2));
            return;
        }

        // Read and parse categories file
        const fileContent = fs.readFileSync(categoriesFile, 'utf8');
        const { data } = matter(fileContent);
        
        // Write categories.json
        const categories = data.categories || [];
        fs.writeFileSync(outputFile, JSON.stringify(categories, null, 2));
        console.log(`Generated categories.json with ${categories.length} categories`);

    } catch (error) {
        console.error('Error building categories:', error);
        // Create default file on error
        const defaultCategories = [
            { name: "Sarees", id: "sarees", description: "Traditional Indian sarees", featured: true },
            { name: "Kurtis", id: "kurtis", description: "Comfortable daily wear", featured: true },
            { name: "Blouses", id: "blouses", description: "Designer blouses", featured: true }
        ];
        fs.writeFileSync(outputFile, JSON.stringify(defaultCategories, null, 2));
    }
}

// Run if called directly
if (require.main === module) {
    buildSettings();
}

>>>>>>> 3417d51fafc25d0c59972f13fa1f746ddf7847d0
module.exports = buildSettings;