// Category management functionality
let categories = [];

// Load categories
async function loadCategories() {
    try {
        const response = await fetch('/categories.json');
        if (response.ok) {
            categories = await response.json();
            return categories;
        }
    } catch (error) {
        console.log('Could not load categories:', error);
    }
    return [];
}

// Get category by ID
function getCategoryById(categoryId) {
    return categories.find(cat => cat.id === categoryId);
}

// Get category name by ID
function getCategoryName(categoryId) {
    const category = getCategoryById(categoryId);
    return category ? category.name : categoryId;
}

// Get all featured categories
function getFeaturedCategories() {
    return categories.filter(cat => cat.featured);
}

// Update product form category options (for admin panel)
function updateCategoryOptions() {
    const categorySelect = document.querySelector('select[name="category"]');
    if (!categorySelect) return;

    // Clear existing options
    categorySelect.innerHTML = '';

    // Add categories as options
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

// Initialize categories
async function initializeCategories() {
    categories = await loadCategories();
    updateCategoryOptions();
}

// Export functions
window.loadCategories = loadCategories;
window.getCategoryById = getCategoryById;
window.getCategoryName = getCategoryName;
window.getFeaturedCategories = getFeaturedCategories;
window.initializeCategories = initializeCategories;
window.categories = categories;