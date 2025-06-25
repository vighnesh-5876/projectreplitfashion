const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Build script to generate products.json from markdown files
function buildProducts() {
    const productsDir = path.join(__dirname, 'content', 'products');
    const outputFile = path.join(__dirname, 'products.json');

    try {
        // Check if products directory exists
        if (!fs.existsSync(productsDir)) {
            console.log('Products directory not found, creating empty products.json');
            fs.writeFileSync(outputFile, JSON.stringify([]));
            return;
        }

        // Read all markdown files
        const files = fs.readdirSync(productsDir)
            .filter(file => file.endsWith('.md') && !file.startsWith('.'));

        if (files.length === 0) {
            console.log('No product files found, creating empty products.json');
            fs.writeFileSync(outputFile, JSON.stringify([]));
            return;
        }

        const products = files.map(file => {
            const filePath = path.join(productsDir, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const { data, content } = matter(fileContent);
            
            // Create slug from filename
            const slug = file.replace('.md', '');
            
            return {
                ...data,
                body: content,
                slug: slug,
                filename: file
            };
        });

        // Sort products by date (newest first)
        products.sort((a, b) => {
            const dateA = new Date(a.date || 0);
            const dateB = new Date(b.date || 0);
            return dateB - dateA;
        });

        // Write products.json
        fs.writeFileSync(outputFile, JSON.stringify(products, null, 2));
        console.log(`Generated products.json with ${products.length} products`);

    } catch (error) {
        console.error('Error building products:', error);
        // Create empty file on error
        fs.writeFileSync(outputFile, JSON.stringify([]));
    }
}

// Run if called directly
if (require.main === module) {
    buildProducts();
}

module.exports = buildProducts;
