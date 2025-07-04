// Products management and display functionality

let allProducts = [];
let filteredProducts = [];
let currentCategory = 'all';
let currentSort = 'newest';

// Initialize products functionality
function initializeProducts() {
    loadProductsFromCMS();
}

// Load products from Netlify CMS content
async function loadProductsFromCMS() {
    try {
        // First try to load from CMS-generated content
        await fetchProductsFromCMS();
    } catch (error) {
        console.warn('Could not load products from CMS:', error);
        // Fallback to sample products for demonstration
        await fetchProductsFromContent();
    }
}

// Fetch products from CMS (for production)
async function fetchProductsFromCMS() {
    try {
        // Try to load products from generated JSON file
        const response = await fetch('/products.json');
        if (response.ok) {
            const products = await response.json();
            if (products && products.length > 0) {
                allProducts = products;
                saveToLocalStorage('products', allProducts);
                displayProducts();
                return;
            }
        }
        throw new Error('No CMS products found');
    } catch (error) {
        console.log('CMS products not available, using sample products');
        throw error;
    }
}

// Fetch products from content files (simulated for static deployment)
async function fetchProductsFromContent() {
    try {
        // Sample products for demonstration (in production, these would be loaded from CMS)
        const sampleProducts = [
            {
                title: "Elegant Silk Banarasi Saree",
                category: "sarees",
                price: 4500,
                image: "/static/uploads/silk-banarasi-saree.jpg",
                description: "Traditional handwoven Banarasi silk saree with intricate gold zari work, perfect for weddings and special occasions.",
                featured: true,
                available: true,
                tags: ["silk", "banarasi", "wedding", "traditional", "gold", "zari"],
                date: "2025-06-24T12:00:00.000Z",
                slug: "elegant-silk-banarasi-saree"
            },
            {
                title: "Floral Print Cotton Kurti",
                category: "kurtis",
                price: 1200,
                image: "/static/uploads/floral-cotton-kurti.jpg",
                description: "Comfortable cotton kurti with beautiful floral prints, perfect for daily wear and casual occasions.",
                featured: true,
                available: true,
                tags: ["cotton", "floral", "casual", "comfortable", "daily wear"],
                date: "2025-06-24T11:00:00.000Z",
                slug: "floral-print-cotton-kurti"
            },
            {
                title: "Designer Embroidered Blouse",
                category: "blouses",
                price: 2800,
                image: "/static/uploads/designer-embroidered-blouse.jpg",
                description: "Intricately embroidered designer blouse with mirror work and beading, perfect to pair with sarees.",
                featured: false,
                available: true,
                tags: ["embroidered", "designer", "mirror work", "beading", "saree blouse"],
                date: "2025-06-24T10:00:00.000Z",
                slug: "designer-embroidered-blouse"
            }
        ];
        
        allProducts = sampleProducts;
        saveToLocalStorage('products', allProducts);
        displayProducts();
    } catch (error) {
        handleError(error, 'products-grid', 'Unable to load products. Please try again later.');
    }
}

// Display products based on current filters and sorting
function displayProducts() {
    const container = document.getElementById('products-grid') || 
                     document.getElementById('featured-products') ||
                     document.getElementById('sarees-grid') ||
                     document.getElementById('kurtis-grid') ||
                     document.getElementById('blouses-grid');
    
    if (!container) return;

    // Filter products based on current category
    filteredProducts = filterProducts(allProducts);
    
    // Sort products
    sortProducts(filteredProducts);

    // Clear container
    container.innerHTML = '';

    if (filteredProducts.length === 0) {
        showEmptyStateForCategory(container);
        return;
    }

    // Create and append product cards
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });

    // Add animation class
    container.classList.add('fade-in');
}

// Filter products by category
function filterProducts(products) {
    if (currentCategory === 'all') {
        return products;
    }
    return products.filter(product => 
        product.category && product.category.toLowerCase() === currentCategory.toLowerCase()
    );
}

// Sort products based on selected criteria
function sortProducts(products) {
    switch (currentSort) {
        case 'price-low':
            products.sort((a, b) => (a.price || 0) - (b.price || 0));
            break;
        case 'price-high':
            products.sort((a, b) => (b.price || 0) - (a.price || 0));
            break;
        case 'name':
            products.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
            break;
        case 'newest':
        default:
            products.sort((a, b) => {
                const dateA = new Date(a.date || 0);
                const dateB = new Date(b.date || 0);
                return dateB - dateA;
            });
            break;
    }
}

// Show appropriate empty state based on context
function showEmptyStateForCategory(container) {
    const currentPage = window.location.pathname.split('/').pop();
    let emptyMessage = '';
    let categoryIcon = 'fas fa-search';

    switch (currentCategory) {
        case 'sarees':
            emptyMessage = 'No sarees available. Add beautiful sarees through the admin panel.';
            categoryIcon = 'fas fa-tshirt';
            break;
        case 'kurtis':
            emptyMessage = 'No kurtis available. Add stylish kurtis through the admin panel.';
            categoryIcon = 'fas fa-female';
            break;
        case 'blouses':
            emptyMessage = 'No blouses available. Add elegant blouses through the admin panel.';
            categoryIcon = 'fas fa-vest';
            break;
        default:
            if (currentPage === 'index.html' || currentPage === '') {
                emptyMessage = 'Featured products will appear here once added.';
                categoryIcon = 'fas fa-images';
            } else {
                emptyMessage = 'No products found. Add products through the admin panel.';
                categoryIcon = 'fas fa-search';
            }
    }

    container.innerHTML = `
        <div class="empty-state">
            <div class="empty-content">
                <i class="${categoryIcon}"></i>
                <h3>No products found</h3>
                <p>${emptyMessage}</p>
                <a href="admin/index.html" class="cta-button">Go to Admin Panel</a>
            </div>
        </div>
    `;
}

// Initialize filter buttons
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Update current category
            currentCategory = button.getAttribute('data-category');
            
            // Display filtered products
            displayProducts();
        });
    });
}

// Initialize sorting
function initializeSorting() {
    const sortSelect = document.getElementById('sort-select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            displayProducts();
        });
    }
}

// Load all products for the products page
function loadAllProducts() {
    currentCategory = 'all';
    loadProductsFromCMS();
}

// Load products for specific category
function loadCategoryProducts(category) {
    currentCategory = category;
    loadProductsFromCMS();
}

// Load featured products for homepage
function loadFeaturedProducts() {
    loadProductsFromCMS().then(() => {
        // Filter to show only featured products
        const featuredProducts = allProducts.filter(product => product.featured === true);
        
        const container = document.getElementById('featured-products');
        if (!container) return;

        container.innerHTML = '';

        if (featuredProducts.length === 0) {
            container.innerHTML = `
                <div class="product-placeholder">
                    <div class="placeholder-content">
                        <i class="fas fa-images"></i>
                        <p>Featured products will appear here</p>
                        <a href="admin/index.html" class="admin-link">Add products via Admin Panel</a>
                    </div>
                </div>
            `;
            return;
        }

        // Show maximum 6 featured products
        featuredProducts.slice(0, 6).forEach(product => {
            const productCard = createProductCard(product);
            container.appendChild(productCard);
        });
    });
}

// Load product detail
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        showProductNotFound();
        return;
    }

    loadProductsFromCMS().then(() => {
        const product = allProducts.find(p => 
            p.slug === productId || 
            p.title.toLowerCase().replace(/\s+/g, '-') === productId ||
            p.title === productId
        );

        if (!product) {
            showProductNotFound();
            return;
        }

        displayProductDetail(product);
        loadRelatedProducts(product.category);
    });
}

// Display product detail
function displayProductDetail(product) {
    const container = document.getElementById('product-detail');
    if (!container) return;

    // Update breadcrumb
    const categoryBreadcrumb = document.getElementById('product-category-breadcrumb');
    if (categoryBreadcrumb) {
        categoryBreadcrumb.textContent = product.title;
    }

    // Create image gallery
    const images = [];
    if (product.image) images.push(product.image);
    if (product.gallery && Array.isArray(product.gallery)) {
        product.gallery.forEach(item => {
            if (item.image) images.push(item.image);
        });
    }

    let imageElement;
    if (images.length > 0) {
        if (images.length === 1) {
            // Single image - no carousel needed
            imageElement = `
                <div class="single-image-container">
                    <img src="${images[0]}" alt="${product.title}">
                </div>
            `;
        } else {
            // Multiple images - create carousel
            imageElement = `
                <div class="image-carousel">
                    <div class="carousel-container">
                        <button class="carousel-btn carousel-prev" onclick="changeCarouselImage(-1)">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <div class="carousel-images">
                            ${images.map((img, index) => 
                                `<img src="${img}" alt="${product.title} ${index + 1}" class="carousel-image ${index === 0 ? 'active' : ''}" data-index="${index}">`
                            ).join('')}
                        </div>
                        <button class="carousel-btn carousel-next" onclick="changeCarouselImage(1)">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                    <div class="carousel-indicators">
                        ${images.map((img, index) => 
                            `<span class="indicator ${index === 0 ? 'active' : ''}" onclick="goToCarouselImage(${index})" data-index="${index}"></span>`
                        ).join('')}
                    </div>
                    <div class="image-thumbnails">
                        ${images.map((img, index) => 
                            `<img src="${img}" alt="${product.title} ${index + 1}" class="thumbnail ${index === 0 ? 'active' : ''}" onclick="goToCarouselImage(${index})" data-index="${index}">`
                        ).join('')}
                    </div>
                </div>
            `;
        }
    } else {
        imageElement = `<div class="product-placeholder-icon" style="font-size: 4rem; color: var(--text-lighter);"><i class="fas fa-image"></i></div>`;
    }

    container.innerHTML = `
        <div class="product-detail-image">
            ${imageElement}
        </div>
        <div class="product-detail-info">
            <div class="product-detail-category">${product.category || 'Fashion'}</div>
            <h1>${product.title}</h1>
            <div class="product-detail-price">${formatPrice(product.price || 0)}</div>
            <div class="product-detail-description">
                ${product.description || 'No description available.'}
            </div>
            ${product.body ? `<div class="product-full-description">${markdownToHtml(product.body)}</div>` : ''}
            <div class="product-actions">
                <a href="index.html#contact" class="cta-button">Contact for Purchase</a>
                <a href="${product.category ? product.category.toLowerCase() + '.html' : 'products.html'}" class="btn-secondary">Back to ${product.category || 'Products'}</a>
            </div>
        </div>
    `;

    // Update page title
    document.title = `${product.title} - Elegant Threads`;
    
    // Initialize carousel if multiple images
    if (images.length > 1) {
        setTimeout(() => initializeCarousel(), 100);
    }
}

// Load related products
function loadRelatedProducts(category) {
    if (!category) return;

    const relatedProducts = allProducts
        .filter(product => product.category === category)
        .slice(0, 4);

    if (relatedProducts.length > 1) {
        const relatedSection = document.getElementById('related-products');
        const relatedGrid = document.getElementById('related-products-grid');
        
        if (relatedSection && relatedGrid) {
            relatedSection.style.display = 'block';
            relatedGrid.innerHTML = '';

            relatedProducts.forEach(product => {
                const productCard = createProductCard(product);
                relatedGrid.appendChild(productCard);
            });
        }
    }
}

// Show product not found
function showProductNotFound() {
    const container = document.getElementById('product-detail');
    if (!container) return;

    container.innerHTML = `
        <div class="product-not-found">
            <div class="not-found-content">
                <i class="fas fa-search"></i>
                <h3>Product not found</h3>
                <p>The product you're looking for doesn't exist or has been removed.</p>
                <a href="products.html" class="cta-button">Browse All Products</a>
            </div>
        </div>
    `;
}

// Search functionality
function searchProducts(query) {
    if (!query) {
        filteredProducts = allProducts;
    } else {
        const searchTerm = query.toLowerCase();
        filteredProducts = allProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }
    
    displayProducts();
}

// Add product to favorites (using localStorage)
function toggleFavorite(productId) {
    const favorites = getFromLocalStorage('favorites') || [];
    const index = favorites.indexOf(productId);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(productId);
    }
    
    saveToLocalStorage('favorites', favorites);
    
    // Update UI if needed
    updateFavoriteButtons();
}

// Update favorite button states
function updateFavoriteButtons() {
    const favorites = getFromLocalStorage('favorites') || [];
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(button => {
        const productId = button.getAttribute('data-product-id');
        if (favorites.includes(productId)) {
            button.classList.add('favorited');
        } else {
            button.classList.remove('favorited');
        }
    });
}

// Utility function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Carousel functionality
let currentImageIndex = 0;
let totalImages = 0;

// Initialize carousel after product detail is loaded
window.initializeCarousel = function() {
    const carouselImages = document.querySelectorAll('.carousel-image');
    totalImages = carouselImages.length;
    currentImageIndex = 0;
};

// Change carousel image by direction (-1 for previous, 1 for next)
window.changeCarouselImage = function(direction) {
    const carouselImages = document.querySelectorAll('.carousel-image');
    const indicators = document.querySelectorAll('.indicator');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (carouselImages.length === 0) return;
    
    // Remove active class from current image
    carouselImages[currentImageIndex].classList.remove('active');
    indicators[currentImageIndex].classList.remove('active');
    thumbnails[currentImageIndex].classList.remove('active');
    
    // Calculate new index
    currentImageIndex += direction;
    if (currentImageIndex >= carouselImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = carouselImages.length - 1;
    }
    
    // Add active class to new image
    carouselImages[currentImageIndex].classList.add('active');
    indicators[currentImageIndex].classList.add('active');
    thumbnails[currentImageIndex].classList.add('active');
};

// Go to specific carousel image
window.goToCarouselImage = function(index) {
    const carouselImages = document.querySelectorAll('.carousel-image');
    const indicators = document.querySelectorAll('.indicator');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (carouselImages.length === 0 || index < 0 || index >= carouselImages.length) return;
    
    // Remove active class from current image
    carouselImages[currentImageIndex].classList.remove('active');
    indicators[currentImageIndex].classList.remove('active');
    thumbnails[currentImageIndex].classList.remove('active');
    
    // Set new index
    currentImageIndex = index;
    
    // Add active class to new image
    carouselImages[currentImageIndex].classList.add('active');
    indicators[currentImageIndex].classList.add('active');
    thumbnails[currentImageIndex].classList.add('active');
};

// Simple markdown to HTML converter for product descriptions
function markdownToHtml(markdown) {
    return markdown
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^\- (.*$)/gim, '<li>$1</li>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/\n\n/gim, '</p><p>')
        .replace(/^(.*)$/gim, '<p>$1</p>')
        .replace(/<p><li>/gim, '<ul><li>')
        .replace(/<\/li><\/p>/gim, '</li></ul>');
}

// Export functions for global use
window.loadAllProducts = loadAllProducts;
window.loadCategoryProducts = loadCategoryProducts;
window.loadFeaturedProducts = loadFeaturedProducts;
window.loadProductDetail = loadProductDetail;
window.initializeFilters = initializeFilters;
window.initializeSorting = initializeSorting;
window.searchProducts = searchProducts;
window.toggleFavorite = toggleFavorite;

// Auto-initialize on homepage
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    document.addEventListener('DOMContentLoaded', loadFeaturedProducts);
}
