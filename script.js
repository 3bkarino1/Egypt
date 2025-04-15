document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const logoContainer = document.querySelector('.logo-container');
    const heartbeatIcon = document.querySelector('.fa-heartbeat');
    const title = document.querySelector('h1');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const diseaseItems = document.querySelectorAll('.disease-item');
    
    // Logo hover effects
    logoContainer.addEventListener('mouseenter', function() {
        heartbeatIcon.style.color = '#004aad';
        heartbeatIcon.style.transform = 'scale(1.2)';
        title.style.color = '#004aad';
        
        // Add pulse animation class
        heartbeatIcon.classList.add('fa-beat');
    });
    
    logoContainer.addEventListener('mouseleave', function() {
        heartbeatIcon.style.color = '#0066cc';
        heartbeatIcon.style.transform = 'scale(1)';
        title.style.color = '#333';
        
        // Remove pulse animation
        heartbeatIcon.classList.remove('fa-beat');
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Rest of the code remains unchanged
    // Smooth scrolling for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                spans.forEach(span => span.classList.remove('active'));
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Search functionality and other code remains the same...
});
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for disease cards animation
    const observeCards = () => {
        const cards = document.querySelectorAll('.card');
        
        if (cards.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        cards.forEach(card => {
            card.style.opacity = '0';
            observer.observe(card);
        });
    };
    
    // Add smooth scrolling to disease links
    const setupDiseaseLinks = () => {
        const diseaseLinks = document.querySelectorAll('.learn-more');
        
        diseaseLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Only add special handling for hash links on the same page
                const href = this.getAttribute('href');
                if (href.includes('#') && href.split('#')[0] === window.location.pathname) {
                    e.preventDefault();
                    const targetId = href.split('#')[1];
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    };
    
    // Add hover effects for disease cards
    const setupCardHoverEffects = () => {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-beat');
                    setTimeout(() => {
                        icon.classList.remove('fa-beat');
                    }, 1000);
                }
            });
        });
    };
    
    // Initialize disease section functionality
    const initDiseaseSection = () => {
        observeCards();
        setupDiseaseLinks();
        setupCardHoverEffects();
    };
    
    // Run initialization
    initDiseaseSection();
    
    // Mobile menu toggle functionality
    const setupMobileMenu = () => {
        const nav = document.querySelector('nav');
        const mobileMenuBtn = document.createElement('div');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        if (nav) {
            nav.insertBefore(mobileMenuBtn, nav.querySelector('.nav-links'));
            
            mobileMenuBtn.addEventListener('click', function() {
                const navLinks = document.querySelector('.nav-links');
                navLinks.classList.toggle('active');
                
                const icon = this.querySelector('i');
                if (navLinks.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            });
        }
    };
    
    // Setup mobile menu
    setupMobileMenu();
});