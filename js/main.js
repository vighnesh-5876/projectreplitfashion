// Main JavaScript functionality for Elegant Threads website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeMobileMenu();
});

// Navigation functionality
function initializeNavigation() {
    // Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Handle dropdown navigation
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        let timeout;

        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
            dropdownMenu.style.transform = 'translateY(0)';
        });

        dropdown.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                dropdownMenu.style.transform = 'translateY(-10px)';
            }, 200);
        });
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Scroll effects
function initializeScrollEffects() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll-based animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.category-card, .product-card, .about-content');
    animatedElements.forEach(el => observer.observe(el));
}

// Utility functions
function showLoading(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="loading-state">
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Loading...</p>
                </div>
            </div>
        `;
    }
}

function showEmptyState(containerId, message, actionText, actionLink) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-content">
                    <i class="fas fa-search"></i>
                    <h3>No items found</h3>
                    <p>${message}</p>
                    ${actionText && actionLink ? `<a href="${actionLink}" class="cta-button">${actionText}</a>` : ''}
                </div>
            </div>
        `;
    }
}

function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.addEventListener('click', () => {
        window.location.href = `product-detail.html?id=${encodeURIComponent(product.slug || product.title)}`;
    });

    // Use actual product image or placeholder
    const imageUrl = product.image;
    let imageElement;
    
    if (imageUrl && imageUrl.trim() !== '') {
        imageElement = `<img src="${imageUrl}" alt="${product.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                      <div class="product-placeholder-icon" style="display: none;"><i class="fas fa-image"></i></div>`;
    } else {
        imageElement = `<div class="product-placeholder-icon"><i class="fas fa-image"></i></div>`;
    }

    productCard.innerHTML = `
        <div class="product-image">
            ${imageElement}
        </div>
        <div class="product-info">
            <div class="product-category">${product.category || 'Fashion'}</div>
            <h3 class="product-title">${product.title}</h3>
            <div class="product-price">${formatPrice(product.price || 0)}</div>
            <p class="product-description">${truncateText(product.description || '', 100)}</p>
        </div>
    `;

    return productCard;
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error handling
function handleError(error, containerId, fallbackMessage) {
    console.error('Error:', error);
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-content">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Something went wrong</h3>
                    <p>${fallbackMessage}</p>
                    <button class="cta-button" onclick="location.reload()">Try Again</button>
                </div>
            </div>
        `;
    }
}

// Local storage helpers
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.warn('Could not save to localStorage:', error);
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.warn('Could not read from localStorage:', error);
        return null;
    }
}

// Export functions for use in other files
window.ElegantThreads = {
    showLoading,
    showEmptyState,
    formatPrice,
    createProductCard,
    truncateText,
    debounce,
    handleError,
    saveToLocalStorage,
    getFromLocalStorage
};
