// ==================== HEADER SCROLL EFFECT ====================
const header = document.getElementById('header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ==================== MOBILE MENU TOGGLE ====================
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const body = document.body;

    // Debug: Check if elements exist
    console.log('Menu Toggle:', menuToggle);
    console.log('Nav Links:', navLinks);

    if (menuToggle && navLinks) {
        console.log('✅ Mobile menu elements found - initializing...');
        
        // Add click event to hamburger button
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🍔 Hamburger clicked!');
            
            // Toggle active class on hamburger
            menuToggle.classList.toggle('active');
            
            // Toggle active class on menu
            navLinks.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
                console.log('📱 Menu opened');
            } else {
                body.style.overflow = '';
                console.log('📱 Menu closed');
            }
        });

        // Close mobile menu when link is clicked
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('🔗 Menu link clicked - closing menu');
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active')) {
                if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                    console.log('🖱️ Clicked outside - closing menu');
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    body.style.overflow = '';
                }
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                console.log('⌨️ Escape pressed - closing menu');
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            }
        });
        
        console.log('✅ Mobile menu initialized successfully!');
    } else {
        console.error('❌ Mobile menu elements not found!');
        console.error('menuToggle:', menuToggle);
        console.error('navLinks:', navLinks);
    }
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== ACTIVE NAV LINK ON SCROLL ====================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

if (sections.length > 0 && navItems.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });
}

// ==================== MENU CARDS SCROLL REVEAL ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize menu cards with hidden state
document.querySelectorAll('.menu-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ==================== ADD TO CART FUNCTIONALITY (Placeholder) ====================
const cartButtons = document.querySelectorAll('.menu-card-btn');

if (cartButtons.length > 0) {
    cartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get item details
            const card = this.closest('.menu-card');
            const itemName = card.querySelector('.menu-card-title').textContent;
            const itemPrice = card.querySelector('.menu-card-price').textContent;
            
            // Visual feedback
            this.innerHTML = '✓';
            this.style.background = 'var(--accent-green)';
            
            // Reset after 1 second
            setTimeout(() => {
                this.innerHTML = '🛒';
                this.style.background = 'var(--accent-red)';
            }, 1000);
            
            // Console log for now (can be replaced with actual cart logic)
            console.log(`Added to cart: ${itemName} - ${itemPrice}`);
            
            // You can add actual cart functionality here
            // For example: addToCart(itemName, itemPrice);
        });
    });
}

// ==================== SCROLL TO TOP BUTTON (Optional) ====================
// Create scroll to top button dynamically
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent-red);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s, transform 0.3s;
        z-index: 999;
        box-shadow: 0 5px 15px rgba(255, 59, 48, 0.3);
    `;
    
    document.body.appendChild(button);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
            button.style.pointerEvents = 'auto';
        } else {
            button.style.opacity = '0';
            button.style.pointerEvents = 'none';
        }
    });
    
    // Scroll to top on click
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
};

// Initialize scroll to top button
createScrollToTopButton();

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
    // Add fade-in animation to body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== UTILITY FUNCTIONS ====================

// Format price (can be used for dynamic pricing)
const formatPrice = (price) => {
    return `₹${price}`;
};

// Validate phone number (for contact forms)
const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
};

// Validate email (for contact forms)
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// ==================== CONSOLE MESSAGE ====================
console.log('%c🍔 The Guru Corner', 'font-size: 24px; font-weight: bold; color: #FF3B30;');
console.log('%cWebsite loaded successfully!', 'font-size: 14px; color: #4CAF50;');
console.log('%cBuilt with ❤️ for Mumbai\'s best street food', 'font-size: 12px; color: #8E8E93;');
