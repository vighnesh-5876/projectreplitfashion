const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

exports.handler = async (event, context) => {
  try {
    const productsDir = path.join(process.cwd(), 'content', 'products');
    
    // Check if products directory exists
    if (!fs.existsSync(productsDir)) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([]),
      };
    }

    // Read all markdown files from products directory
    const files = fs.readdirSync(productsDir)
      .filter(file => file.endsWith('.md') && file !== '.gitkeep');

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

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(products),
    };
  } catch (error) {
    console.error('Error loading products:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Failed to load products' }),
    };
  }
};