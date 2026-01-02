document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initLoader();
    initHeroSlider();
    initNavigation();
    initSearch();
    initWishlist();
    initFilters();
    initTestimonials();
    initAnimations();
    initNewsletter();
    initModal();
    
    // Load saree data
    loadSareeData();
    
    // Initialize filter links
    initFilterLinks();
});

// Website Loader
function initLoader() {
    const loader = document.getElementById('websiteLoader');
    
    // Hide loader after 2 seconds
    setTimeout(() => {
        loader.classList.add('hidden');
        
        // Remove loader from DOM after transition completes
        setTimeout(() => {
            loader.style.display = 'none';
            // Show simple festival popup after loader disappears
            showFestivalPopupSimple();
        }, 800);
    }, 2000);
}

// Simple Ugadi Popup - SMALL VERSION
function showFestivalPopupSimple() {
    const simplePopup = document.getElementById('simplePopup');
    const simplePopupOverlay = document.getElementById('simplePopupOverlay');
    const simpleClosePopup = document.getElementById('simpleClosePopup');
    const simpleLaterBtn = document.getElementById('simpleLaterBtn');
    const simpleShopBtn = document.querySelector('.simple-shop-btn');
    
    // Check if user has already dismissed the popup
    const popupDismissed = localStorage.getItem('simplePopupDismissed');
    const today = new Date().toDateString();
    
    // Show popup if not dismissed today
    if (!popupDismissed || popupDismissed !== today) {
        // Add active class to show popup
        simplePopup.classList.add('active');
        simplePopupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Setup event listeners
        function closePopup() {
            simplePopup.classList.remove('active');
            simplePopupOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            localStorage.setItem('simplePopupDismissed', today);
        }
        
        // Close popup
        simpleClosePopup.addEventListener('click', closePopup);
        
        // Later button
        simpleLaterBtn.addEventListener('click', closePopup);
        
        // Shop button - scroll to collections
        if (simpleShopBtn) {
            simpleShopBtn.addEventListener('click', function(e) {
                e.preventDefault();
                closePopup();
                // Scroll to collections section
                setTimeout(() => {
                    document.getElementById('collections').scrollIntoView({ behavior: 'smooth' });
                }, 300);
            });
        }
        
        // Close when clicking overlay
        simplePopupOverlay.addEventListener('click', closePopup);
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && simplePopup.classList.contains('active')) {
                closePopup();
            }
        });
    }
}

// Ugadi Festival Popup - ORIGINAL VERSION (for reference/backup)
function showFestivalPopup() {
    const festivalPopup = document.getElementById('festivalPopup');
    const festivalOverlay = document.getElementById('festivalOverlay');
    const closePopup = document.getElementById('closePopup');
    const laterBtn = document.getElementById('laterBtn');
    const shopBtn = document.querySelector('.festival-shop-btn');
    
    // Check if user has already dismissed the popup
    const popupDismissed = localStorage.getItem('festivalPopupDismissed');
    const today = new Date().toDateString();
    
    // Show popup if not dismissed today
    if (!popupDismissed || popupDismissed !== today) {
        // Add active class to show popup
        festivalPopup.classList.add('active');
        festivalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add confetti animation
        createConfetti();
        
        // Setup event listeners
        setupPopupEvents(today);
    }
    
    // Create additional confetti
    function createConfetti() {
        const confettiContainer = document.querySelector('.festival-confetti');
        if (!confettiContainer) return;
        
        // Clear existing confetti
        confettiContainer.innerHTML = '';
        
        // Create more confetti pieces
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            
            // Random colors
            const colors = [
                '#FFD700', // gold
                '#FFA500', // orange
                '#FF69B4', // pink
                '#9370DB', // purple
                '#2E8B57', // green
                '#32CD32'  // light green
            ];
            
            // Random properties
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = `${Math.random() * 15 + 10}px`;
            confetti.style.height = `${Math.random() * 15 + 10}px`;
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = `-20px`;
            confetti.style.animationDelay = `${Math.random() * 5}s`;
            confetti.style.animationDuration = `${Math.random() * 3 + 3}s`;
            
            confettiContainer.appendChild(confetti);
        }
    }
    
    // Setup popup event listeners
    function setupPopupEvents(today) {
        // Close popup
        closePopup.addEventListener('click', () => {
            closePopupAnimation();
            // Remember dismissal for today
            localStorage.setItem('festivalPopupDismissed', today);
        });
        
        // Later button
        laterBtn.addEventListener('click', () => {
            closePopupAnimation();
            // Remember dismissal for today
            localStorage.setItem('festivalPopupDismissed', today);
        });
        
        // Shop button - scroll to collections
        if (shopBtn) {
            shopBtn.addEventListener('click', function(e) {
                e.preventDefault();
                closePopupAnimation();
                // Scroll to collections section
                setTimeout(() => {
                    document.getElementById('collections').scrollIntoView({ behavior: 'smooth' });
                }, 300);
                localStorage.setItem('festivalPopupDismissed', today);
            });
        }
        
        // Close when clicking overlay
        festivalOverlay.addEventListener('click', () => {
            closePopupAnimation();
            localStorage.setItem('festivalPopupDismissed', today);
        });
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && festivalPopup.classList.contains('active')) {
                closePopupAnimation();
                localStorage.setItem('festivalPopupDismissed', today);
            }
        });
    }
    
    // Close popup with animation
    function closePopupAnimation() {
        const festivalPopup = document.getElementById('festivalPopup');
        const festivalOverlay = document.getElementById('festivalOverlay');
        
        festivalPopup.classList.remove('active');
        festivalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // Function to show next slide
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    // Function to show previous slide
    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Add click event to prev/next buttons
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Auto slide
    let slideTimer = setInterval(nextSlide, slideInterval);
    
    // Pause auto slide on hover
    const heroSection = document.querySelector('.hero-section');
    heroSection.addEventListener('mouseenter', () => {
        clearInterval(slideTimer);
    });
    
    heroSection.addEventListener('mouseleave', () => {
        slideTimer = setInterval(nextSlide, slideInterval);
    });
}

// Navigation
function initNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.main-header');
    
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Dropdown menu hover effects for desktop
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            dropdown.querySelector('.dropdown-menu').style.opacity = '1';
            dropdown.querySelector('.dropdown-menu').style.visibility = 'visible';
            dropdown.querySelector('.dropdown-menu').style.transform = 'translateY(5px)';
        });
        
        dropdown.addEventListener('mouseleave', () => {
            dropdown.querySelector('.dropdown-menu').style.opacity = '0';
            dropdown.querySelector('.dropdown-menu').style.visibility = 'hidden';
            dropdown.querySelector('.dropdown-menu').style.transform = 'translateY(15px)';
        });
    });
}

// Search Functionality
function initSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const closeSearch = document.getElementById('closeSearch');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const suggestionTags = document.querySelectorAll('.suggestion-tags a');
    
    // Open search overlay
    searchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Focus on search input
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    });
    
    // Close search overlay
    closeSearch.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        // Clear search
        searchInput.value = '';
        searchResults.innerHTML = '';
    });
    
    // Close search overlay when clicking outside
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            searchInput.value = '';
            searchResults.innerHTML = '';
        }
    });
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm.length === 0) {
            searchResults.innerHTML = '';
            return;
        }
        
        // Filter sarees based on search term
        const filteredSarees = sareeData.filter(saree => {
            return saree.name.toLowerCase().includes(searchTerm) ||
                   saree.fabric.toLowerCase().includes(searchTerm) ||
                   saree.occasion.toLowerCase().includes(searchTerm) ||
                   saree.category.toLowerCase().includes(searchTerm);
        });
        
        // Display search results
        displaySearchResults(filteredSarees);
    });
    
    // Function to display search results
    function displaySearchResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No sarees found matching your search</p>
                    <p>Try different keywords like "Kanjeevaram", "Bridal", or "Festive"</p>
                </div>
            `;
            return;
        }
        
        let resultsHTML = '';
        
        results.forEach(saree => {
            resultsHTML += `
                <div class="search-result-item" data-id="${saree.id}">
                    <div class="search-result-image" style="background: ${saree.color};"></div>
                    <div class="search-result-details">
                        <h4 class="search-result-name">${saree.name}</h4>
                        <div class="search-result-info">
                            <span>${saree.fabric}</span>
                            <span>•</span>
                            <span>${saree.occasion}</span>
                            <span>•</span>
                            <span class="search-result-price">₹${saree.price.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        searchResults.innerHTML = resultsHTML;
        
        // Add click event to search result items
        document.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', function() {
                const sareeId = this.getAttribute('data-id');
                closeSearch.click(); // Close search overlay
                // Scroll to collections and show the saree
                document.getElementById('collections').scrollIntoView({ behavior: 'smooth' });
                // Highlight and show the saree
                setTimeout(() => {
                    showSareeDetail(sareeId);
                }, 500);
            });
        });
    }
    
    // Suggestion tags click events
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const searchTerm = this.getAttribute('data-search');
            searchInput.value = searchTerm;
            searchInput.dispatchEvent(new Event('input'));
        });
    });
}

// Wishlist Functionality
function initWishlist() {
    const wishlistBtn = document.getElementById('wishlistBtn');
    const closeWishlist = document.getElementById('closeWishlist');
    const wishlistSidebar = document.getElementById('wishlistSidebar');
    const wishlistOverlay = document.getElementById('wishlistOverlay');
    const wishlistCount = document.querySelector('.wishlist-count');
    
    // Initialize wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem('vibhaniWishlist')) || [];
    updateWishlistCount();
    renderWishlistItems();
    
    // Open wishlist sidebar
    wishlistBtn.addEventListener('click', () => {
        wishlistSidebar.classList.add('active');
        wishlistOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close wishlist sidebar
    closeWishlist.addEventListener('click', () => {
        wishlistSidebar.classList.remove('active');
        wishlistOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close wishlist sidebar when clicking overlay
    wishlistOverlay.addEventListener('click', () => {
        wishlistSidebar.classList.remove('active');
        wishlistOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Update wishlist count
    function updateWishlistCount() {
        wishlistCount.textContent = wishlist.length;
    }
    
    // Render wishlist items
    function renderWishlistItems() {
        const wishlistItemsContainer = document.getElementById('wishlistItems');
        
        if (wishlist.length === 0) {
            wishlistItemsContainer.innerHTML = `
                <div class="empty-wishlist">
                    <i class="fas fa-heart"></i>
                    <p>Your wishlist is empty</p>
                    <p>Save your favorite sarees for later</p>
                </div>
            `;
            return;
        }
        
        let itemsHTML = '';
        
        wishlist.forEach(item => {
            itemsHTML += `
                <div class="wishlist-item" data-id="${item.id}">
                    <div class="wishlist-item-image" style="background: ${item.color};"></div>
                    <div class="wishlist-item-details">
                        <h4 class="wishlist-item-name">${item.name}</h4>
                        <p class="wishlist-item-price">₹${item.price.toLocaleString()}</p>
                    </div>
                    <button class="remove-wishlist-item" data-id="${item.id}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        });
        
        wishlistItemsContainer.innerHTML = itemsHTML;
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-wishlist-item').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.getAttribute('data-id');
                removeFromWishlist(itemId);
            });
        });
    }
    
    // Add item to wishlist
    function addToWishlist(item) {
        // Check if item already exists in wishlist
        const existingItem = wishlist.find(wishlistItem => wishlistItem.id === item.id);
        
        if (!existingItem) {
            wishlist.push(item);
            localStorage.setItem('vibhaniWishlist', JSON.stringify(wishlist));
            updateWishlistCount();
            renderWishlistItems();
            return true;
        }
        
        return false;
    }
    
    // Remove item from wishlist
    function removeFromWishlist(itemId) {
        wishlist = wishlist.filter(item => item.id !== itemId);
        localStorage.setItem('vibhaniWishlist', JSON.stringify(wishlist));
        updateWishlistCount();
        renderWishlistItems();
        
        // Update the wishlist button on the corresponding saree card
        const sareeCardBtn = document.querySelector(`.wishlist-btn-card[data-id="${itemId}"]`);
        if (sareeCardBtn) {
            sareeCardBtn.classList.remove('active');
            sareeCardBtn.innerHTML = '<i class="far fa-heart"></i> Save';
        }
        
        // Update modal wishlist button if open
        const modalWishlistBtn = document.querySelector('.modal-wishlist-btn');
        if (modalWishlistBtn && modalWishlistBtn.getAttribute('data-id') === itemId) {
            modalWishlistBtn.classList.remove('active');
            modalWishlistBtn.innerHTML = '<i class="far fa-heart"></i> Save to Wishlist';
        }
    }
    
    // Expose functions to global scope
    window.addToWishlist = function(itemId) {
        const saree = sareeData.find(item => item.id === itemId);
        if (saree && addToWishlist(saree)) {
            // Update the button on the saree card
            const button = document.querySelector(`.wishlist-btn-card[data-id="${itemId}"]`);
            if (button) {
                button.classList.add('active');
                button.innerHTML = '<i class="fas fa-heart"></i> Saved';
            }
            
            // Show notification
            showNotification('Added to wishlist');
        }
    };
    
    window.removeFromWishlist = removeFromWishlist;
}

// SAREE DATA
const sareeData = [
    {
        id: '1',
        name: 'Royal Kanjeevaram Silk',
        fabric: 'Pure Kanjeevaram Silk',
        occasion: 'Wedding Wear',
        price: 28999,
        originalPrice: 38665,
        category: 'kanjeevaram',
        badge: 'bridal',
        color: 'linear-gradient(135deg, #7a1c3f, #8d2a4d)',
        authenticity: true,
        delivery: 'Ready to Ship | PAN-India',
        description: 'Exquisite Kanjeevaram silk saree with traditional temple border and intricate zari work. Perfect for weddings and grand celebrations.',
        features: ['Pure Kanjeevaram Silk', 'Gold Zari Work', 'Temple Border Design', 'Handwoven Excellence']
    },
    {
        id: '2',
        name: 'Banarasi Zari Weave',
        fabric: 'Banarasi Silk with Gold Zari',
        occasion: 'Festive Occasion',
        price: 24500,
        originalPrice: 32667,
        category: 'banarasi',
        badge: 'new',
        color: 'linear-gradient(135deg, #8d2a4d, #a13a5d)',
        authenticity: true,
        delivery: 'Ready to Ship | PAN-India',
        description: 'Luxurious Banarasi silk saree featuring intricate brocade work and fine gold zari. Ideal for festive celebrations and special occasions.',
        features: ['Pure Banarasi Silk', 'Intricate Brocade', 'Gold Zari Work', 'Lightweight & Elegant']
    },
    {
        id: '3',
        name: 'Bridal Red Kanjeevaram',
        fabric: 'Heavy Kanjeevaram Silk',
        occasion: 'Bridal Wear',
        price: 38999,
        originalPrice: 51999,
        category: 'kanjeevaram',
        badge: 'bridal',
        color: 'linear-gradient(135deg, #5c112e, #7a1c3f)',
        authenticity: true,
        delivery: 'Ready to Ship | PAN-India',
        description: 'Magnificent bridal Kanjeevaram in traditional red with elaborate gold work. A perfect choice for the bride on her special day.',
        features: ['Heavy Kanjeevaram Silk', 'Elaborate Gold Work', 'Traditional Red Color', 'Bridal Exclusive']
    },
    {
        id: '4',
        name: 'Mysore Silk Traditional',
        fabric: 'Soft Mysore Silk',
        occasion: 'Daily Elegance',
        price: 15600,
        originalPrice: 20800,
        category: 'handloom',
        badge: 'handloom',
        color: 'linear-gradient(135deg, #a13a5d, #b54a6d)',
        authenticity: true,
        delivery: 'Ready to Ship | PAN-India',
        description: 'Soft and elegant Mysore silk saree with subtle zari borders. Perfect for daily wear and office occasions.',
        features: ['Pure Mysore Silk', 'Soft & Comfortable', 'Subtle Zari Border', 'Easy to Drape']
    },
    {
        id: '5',
        name: 'Pochampally Ikat Blue',
        fabric: 'Handwoven Ikat Silk',
        occasion: 'Party Wear',
        price: 12800,
        originalPrice: 17067,
        category: 'handloom',
        badge: 'new',
        color: 'linear-gradient(135deg, #1c3f7a, #2a4d8d)',
        authenticity: true,
        delivery: 'Ready to Ship | PAN-India',
        description: 'Beautiful Pochampally Ikat silk saree in vibrant blue with traditional geometric patterns. Lightweight and perfect for parties.',
        features: ['Handwoven Ikat Silk', 'Geometric Patterns', 'Lightweight Fabric', 'Traditional Craft']
    },
    {
        id: '6',
        name: 'Golden Banarasi Wedding',
        fabric: 'Banarasi Silk with Golden Zari',
        occasion: 'Wedding Wear',
        price: 32500,
        originalPrice: 43333,
        category: 'banarasi',
        badge: 'bridal',
        color: 'linear-gradient(135deg, #c6a961, #d8c48c)',
        authenticity: true,
        delivery: 'Ready to Ship | PAN-India',
        description: 'Opulent Banarasi silk saree with rich golden zari work. Makes a statement at weddings and grand celebrations.',
        features: ['Rich Banarasi Silk', 'Golden Zari Work', 'Heavy Embroidery', 'Royal Look']
    },
    {
        id: '7',
        name: 'Classic Kanjeevaram Green',
        fabric: 'Kanjeevaram Silk',
        occasion: 'Festive Occasion',
        price: 21500,
        originalPrice: 28667,
        category: 'kanjeevaram',
        badge: '',
        color: 'linear-gradient(135deg, #1c7a3f, #2a8d4d)',
        authenticity: true,
        delivery: 'Ready to Ship | PAN-India',
        description: 'Classic green Kanjeevaram silk saree with traditional motifs. Perfect for festivals and religious ceremonies.',
        features: ['Traditional Kanjeevaram', 'Classic Green Color', 'Temple Motifs', 'Festive Wear']
    },
    {
        id: '8',
        name: 'Bridal Lehenga Saree',
        fabric: 'Net with Silk Border',
        occasion: 'Bridal Wear',
        price: 42999,
        originalPrice: 57332,
        category: 'bridal',
        badge: 'bridal',
        color: 'linear-gradient(135deg, #7a1c3f, #b54a6d)',
        authenticity: true,
        delivery: 'Ready to Ship | PAN-India',
        description: 'Contemporary bridal lehenga saree combining net fabric with silk borders. Modern twist to traditional bridal wear.',
        features: ['Net & Silk Combination', 'Contemporary Design', 'Bridal Lehenga Style', 'Heavy Embroidery']
    },
    {
        id: '9',
        name: 'Chanderi Silk Festive',
        fabric: 'Light Chanderi Silk',
        occasion: 'Party Wear',
        price: 11800,
        originalPrice: 15733,
        category: 'handloom',
        badge: 'handloom',
        color: 'linear-gradient(135deg, #f9f5f0, #f1e9e0)',
        authenticity: true,
        delivery: 'Ready to Ship | PAN-India',
        description: 'Elegant Chanderi silk saree with subtle sheen and minimalistic design. Perfect for parties and evening events.',
        features: ['Light Chanderi Silk', 'Subtle Sheen', 'Minimalistic Design', 'Easy Draping']
    },
    {
        id: '10',
        name: 'Traditional Silk Jamdani',
        fabric: 'Pure Silk Jamdani',
        occasion: 'Wedding Wear',
        price: 27500,
        originalPrice: 36667,
        category: 'bridal',
        badge: 'festive',
        color: 'linear-gradient(135deg, #8d2a4d, #a13a5d)',
        authenticity: true,
        delivery: 'Ready to Ship | PAN-India',
        description: 'Fine silk Jamdani saree with intricate woven patterns. A testament to traditional weaving craftsmanship.',
        features: ['Pure Silk Jamdani', 'Intricate Weaving', 'Traditional Patterns', 'Light & Airy']
    }
];

// Load Saree Data with Ugadi Discount
function loadSareeData() {
    const sareeGrid = document.getElementById('sareeGrid');
    let sareeHTML = '';
    
    sareeData.forEach(saree => {
        // Apply Ugadi discount
        const discountedPrice = Math.round(saree.price * 0.75); // 25% off
        const showDiscount = true; // Set to true for Ugadi sale
        
        const badgeHTML = saree.badge ? 
            `<span class="saree-badge ${saree.badge}">${saree.badge === 'bridal' ? 'Bridal Exclusive' : 
              saree.badge === 'new' ? 'New Arrival' : 
              saree.badge === 'handloom' ? 'Handloom' : 
              saree.badge === 'festive' ? 'Ugadi Special' : ''}</span>` : '';
        
        const authenticityHTML = saree.authenticity ? 
            `<div class="saree-authenticity">
                <i class="fas fa-check-circle"></i>
                <span>100% Authentic Handloom</span>
            </div>` : '';
        
        const deliveryHTML = saree.delivery ? 
            `<div class="saree-delivery">
                <i class="fas fa-truck"></i>
                <span>${saree.delivery}</span>
            </div>` : '';
        
        sareeHTML += `
            <div class="saree-card" data-category="${saree.category}">
                <div class="saree-image" style="background: ${saree.color};">
                    ${badgeHTML}
                </div>
                <div class="saree-content">
                    <h3 class="saree-name">${saree.name}</h3>
                    <div class="saree-details">
                        <i class="fas fa-thread"></i>
                        <span>${saree.fabric}</span>
                    </div>
                    <span class="saree-occasion">${saree.occasion}</span>
                    
                    <div class="saree-price-section">
                        ${showDiscount ? 
                            `<div class="saree-price" style="color: var(--festival-green);">₹${discountedPrice.toLocaleString()}</div>
                             <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                                <span style="color: var(--charcoal-grey); text-decoration: line-through; font-size: 1rem;">₹${saree.price.toLocaleString()}</span>
                                <span style="background: var(--festival-green); color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 600;">25% OFF</span>
                             </div>` 
                            : `<div class="saree-price">₹${saree.price.toLocaleString()}</div>`}
                        <div class="saree-price-note">Inclusive of taxes</div>
                    </div>
                    
                    ${authenticityHTML}
                    ${deliveryHTML}
                    
                    <div class="saree-actions">
                        <button class="whatsapp-book-btn" onclick="bookOnWhatsApp('${saree.id}', ${showDiscount ? discountedPrice : saree.price})">
                            <i class="fab fa-whatsapp"></i>
                            <div>
                                <div>Book on WhatsApp</div>
                                <div class="whatsapp-book-btn-micro">Talk to our stylist about this saree</div>
                            </div>
                        </button>
                        
                        <div class="secondary-actions">
                            <button class="saree-btn" onclick="showSareeDetail('${saree.id}')">
                                <i class="fas fa-eye"></i> View Details
                            </button>
                            <button class="saree-btn wishlist-btn-card" data-id="${saree.id}" onclick="addToWishlist('${saree.id}')">
                                <i class="far fa-heart"></i> Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    sareeGrid.innerHTML = sareeHTML;
    
    // Check which items are already in wishlist and update buttons
    const wishlist = JSON.parse(localStorage.getItem('vibhaniWishlist')) || [];
    wishlist.forEach(item => {
        const button = document.querySelector(`.wishlist-btn-card[data-id="${item.id}"]`);
        if (button) {
            button.classList.add('active');
            button.innerHTML = '<i class="fas fa-heart"></i> Saved';
        }
    });
}

// Initialize filter links in navigation and footer
function initFilterLinks() {
    // Navigation filter links
    document.querySelectorAll('.menu-list a[data-filter]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            
            // Scroll to collections section
            document.getElementById('collections').scrollIntoView({ behavior: 'smooth' });
            
            // Trigger filter button click
            setTimeout(() => {
                const filterBtn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
                if (filterBtn) {
                    filterBtn.click();
                }
            }, 500);
        });
    });
    
    // Footer filter links
    document.querySelectorAll('.footer-column a[data-filter]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            
            // Scroll to collections section
            document.getElementById('collections').scrollIntoView({ behavior: 'smooth' });
            
            // Trigger filter button click
            setTimeout(() => {
                const filterBtn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
                if (filterBtn) {
                    filterBtn.click();
                }
            }, 500);
        });
    });
}

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sareeCards = document.querySelectorAll('.saree-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter saree cards
            sareeCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// WhatsApp Booking Function
function bookOnWhatsApp(sareeId, price) {
    const saree = sareeData.find(item => item.id === sareeId);
    
    if (saree) {
        // Create the WhatsApp message
        const discountPrice = Math.round(price * 0.75); // Apply 25% discount for Ugadi
        const message = `Hi Vibhani Silks, I'm interested in this saree:%0A%0A*${saree.name}*%0A${saree.fabric}%0AOccasion: ${saree.occasion}%0AOriginal Price: ₹${saree.price.toLocaleString()}%0AUgadi Discount Price: ₹${discountPrice.toLocaleString()} (25% OFF)%0A%0ACan you please share more details and availability?%0A%0AUgadi Offer Code: UGADI25`;
        
        // Open WhatsApp with pre-filled message
        const whatsappUrl = `https://wa.me/919901238646?text=${message}`;
        window.open(whatsappUrl, '_blank');
        
        // Track the booking
        console.log(`WhatsApp booking initiated for saree: ${saree.name}`);
        
        // Show notification
        showNotification('Opening WhatsApp to book your saree with Ugadi discount...');
    }
}

// Expose function globally
window.bookOnWhatsApp = bookOnWhatsApp;

// Saree Detail Modal
function initModal() {
    const closeModal = document.getElementById('closeModal');
    const modalOverlay = document.getElementById('modalOverlay');
    
    // Close modal
    closeModal.addEventListener('click', closeSareeModal);
    
    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', closeSareeModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSareeModal();
        }
    });
}

function closeSareeModal() {
    const modal = document.getElementById('sareeDetailModal');
    const overlay = document.getElementById('modalOverlay');
    
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// SHOW SAREE DETAIL FUNCTION
function showSareeDetail(sareeId) {
    const saree = sareeData.find(item => item.id === sareeId);
    
    if (saree) {
        const modal = document.getElementById('sareeDetailModal');
        const overlay = document.getElementById('modalOverlay');
        const modalBody = document.getElementById('modalBody');
        
        // Check if item is in wishlist
        const wishlist = JSON.parse(localStorage.getItem('vibhaniWishlist')) || [];
        const inWishlist = wishlist.some(item => item.id === sareeId);
        
        // Calculate discounted price for Ugadi
        const discountedPrice = Math.round(saree.price * 0.75);
        const showDiscount = true; // For Ugadi sale
        
        // Create modal content
        const featuresHTML = saree.features ? saree.features.map(feature => `
            <div class="feature-item">
                <i class="fas fa-check-circle"></i>
                <span>${feature}</span>
            </div>
        `).join('') : '';
        
        modalBody.innerHTML = `
            <div class="modal-saree-content">
                <div class="modal-saree-image" style="background: ${saree.color};"></div>
                <div class="modal-saree-details">
                    <h2 class="modal-saree-name">${saree.name}</h2>
                    <div class="modal-saree-fabric">
                        <i class="fas fa-thread"></i>
                        <span>${saree.fabric}</span>
                    </div>
                    <span class="modal-saree-occasion">${saree.occasion}</span>
                    
                    <div class="modal-saree-price-section">
                        ${showDiscount ? 
                            `<div class="modal-saree-price" style="color: var(--festival-green);">₹${discountedPrice.toLocaleString()}</div>
                             <div class="modal-saree-original-price">₹${saree.price.toLocaleString()}</div>
                             <div class="modal-saree-discount">25% OFF - Ugadi Special Offer</div>` 
                            : `<div class="modal-saree-price">₹${saree.price.toLocaleString()}</div>`}
                        <div class="modal-saree-price-note">Inclusive of all taxes | Free shipping across Karnataka</div>
                    </div>
                    
                    <div class="modal-saree-features">
                        ${featuresHTML}
                        <div class="feature-item">
                            <i class="fas fa-check-circle"></i>
                            <span>100% Authentic Handloom</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-truck"></i>
                            <span>Ready to Ship | PAN-India Delivery</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-undo"></i>
                            <span>Easy returns within 7 days</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-shield-alt"></i>
                            <span>Quality Guaranteed</span>
                        </div>
                    </div>
                    
                    <p class="modal-saree-description">${saree.description}</p>
                    
                    <div class="modal-saree-actions">
                        <button class="modal-whatsapp-btn" onclick="bookOnWhatsApp('${saree.id}', ${saree.price})">
                            <i class="fab fa-whatsapp"></i>
                            <span>Book Now on WhatsApp</span>
                        </button>
                        
                        <div class="modal-secondary-actions">
                            <button class="modal-saree-btn" onclick="closeSareeModal(); document.getElementById('collections').scrollIntoView({ behavior: 'smooth' });">
                                <i class="fas fa-arrow-left"></i>
                                Back to Collection
                            </button>
                            <button class="modal-saree-btn modal-wishlist-btn ${inWishlist ? 'active' : ''}" data-id="${saree.id}" onclick="${inWishlist ? `removeFromWishlist('${saree.id}')` : `addToWishlist('${saree.id}')`}">
                                <i class="${inWishlist ? 'fas' : 'far'} fa-heart"></i>
                                ${inWishlist ? 'Remove from Wishlist' : 'Save to Wishlist'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Show modal
        modal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add animation to modal image
        setTimeout(() => {
            const modalImage = document.querySelector('.modal-saree-image');
            if (modalImage) {
                modalImage.style.opacity = '1';
                modalImage.style.transform = 'scale(1)';
            }
        }, 100);
    }
}

// Expose function globally
window.showSareeDetail = showSareeDetail;

// Testimonials Slider
function initTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    let currentTestimonial = 0;
    const testimonialInterval = 6000; // 6 seconds
    
    // Function to show a specific testimonial
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Remove active class from all dots
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected testimonial
        testimonialCards[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    // Function to show next testimonial
    function nextTestimonial() {
        let nextIndex = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(nextIndex);
    }
    
    // Function to show previous testimonial
    function prevTestimonial() {
        let prevIndex = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(prevIndex);
    }
    
    // Add click event to dots
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Add click event to prev/next buttons
    prevBtn.addEventListener('click', prevTestimonial);
    nextBtn.addEventListener('click', nextTestimonial);
    
    // Auto slide
    let testimonialTimer = setInterval(nextTestimonial, testimonialInterval);
    
    // Pause auto slide on hover
    const testimonialSection = document.querySelector('.testimonials-slider');
    testimonialSection.addEventListener('mouseenter', () => {
        clearInterval(testimonialTimer);
    });
    
    testimonialSection.addEventListener('mouseleave', () => {
        testimonialTimer = setInterval(nextTestimonial, testimonialInterval);
    });
}

// Animations on Scroll
function initAnimations() {
    // Create Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // For elements with children that should animate separately
                if (entry.target.classList.contains('promise-grid')) {
                    const cards = entry.target.querySelectorAll('.promise-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, index * 100);
                    });
                }
                
                if (entry.target.classList.contains('saree-grid')) {
                    const cards = entry.target.querySelectorAll('.saree-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, index * 50);
                    });
                }
                
                if (entry.target.classList.contains('occasion-scroll')) {
                    const cards = entry.target.querySelectorAll('.occasion-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, index * 100);
                    });
                }
                
                if (entry.target.classList.contains('lookbook-grid')) {
                    const items = entry.target.querySelectorAll('.lookbook-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate-in');
                        }, index * 100);
                    });
                }
                
                // Animate tagline section
                if (entry.target.classList.contains('tagline-section')) {
                    const taglineText = entry.target.querySelector('.tagline-text');
                    const taglineDecoration = entry.target.querySelector('.tagline-decoration');
                    
                    if (taglineText) {
                        taglineText.classList.add('animate-in');
                    }
                    if (taglineDecoration) {
                        taglineDecoration.classList.add('animate-in');
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe specific elements
    const animateElements = document.querySelectorAll('.promise-grid, .saree-grid, .occasion-scroll, .lookbook-grid, .bridal-image, .craftsmanship-image, .craftsmanship-text, .cta-section, .tagline-section');
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Newsletter Form
function initNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        // In a real application, you would send this to a server
        showNotification('Thank you for subscribing to our newsletter! You will receive updates on new collections and offers.');
        this.reset();
    });
}

// Utility Functions
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background-color: var(--royal-maroon);
        color: var(--antique-gold);
        padding: 15px 25px;
        border-radius: var(--border-radius-sm);
        box-shadow: var(--shadow-hard);
        z-index: 2000;
        opacity: 0;
        transition: transform 0.4s ease, opacity 0.4s ease;
        max-width: 90%;
        text-align: center;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(100px)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 400);
    }, 3000);
}

// Initialize WhatsApp button functionality
document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp enquiry buttons
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn, .whatsapp-cta, .whatsapp-all-btn');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // For demo purposes, we'll prevent actual navigation if it's a demo button
            if (!this.href || this.href.includes('#') || this.classList.contains('whatsapp-book-btn')) {
                e.preventDefault();
                // showNotification('WhatsApp enquiry initiated. In a real implementation, this would open WhatsApp.');
            }
        });
    });
});
