/**
 * FlowStack - Main JavaScript
 * Handles navigation, animations, FAQ interactions, and form validation
 */

(function() {
    'use strict';

    // DOM Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const faqItems = document.querySelectorAll('.faq-item');

    // ===================================
    // Navigation
    // ===================================

    /**
     * Handle navbar scroll effect
     */
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    /**
     * Toggle mobile navigation menu
     */
    function toggleNavMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    /**
     * Close mobile menu when clicking a link
     */
    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * Smooth scroll for anchor links
     */
    function handleSmoothScroll(e, target) {
        e.preventDefault();
        const element = document.querySelector(target);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            closeMobileMenu();
        }
    }

    // ===================================
    // FAQ Accordion
    // ===================================

    /**
     * Toggle FAQ item
     */
    function toggleFaqItem(item) {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Toggle clicked item
        if (!isActive) {
            item.classList.add('active');
        }
    }

    // ===================================
    // Scroll Animations
    // ===================================

    /**
     * Intersection Observer for fade-in animations
     */
    function setupScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements
        const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card, .faq-item');
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
            observer.observe(el);
        });
    }

    // ===================================
    // Form Validation (for future forms)
    // ===================================

    /**
     * Validate email format
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validate input field
     */
    function validateField(input, error) {
        const value = input.value.trim();
        
        if (input.type === 'email' && !isValidEmail(value)) {
            input.classList.add('input-error');
            return false;
        }
        
        if (input.required && value === '') {
            input.classList.add('input-error');
            return false;
        }
        
        input.classList.remove('input-error');
        return true;
    }

    // ===================================
    // Utility Functions
    // ===================================

    /**
     * Debounce function for performance
     */
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

    // ===================================
    // Event Listeners
    // ===================================

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        // Navbar scroll effect
        handleNavbarScroll();
        window.addEventListener('scroll', debounce(handleNavbarScroll, 100));

        // Mobile navigation toggle
        if (navToggle) {
            navToggle.addEventListener('click', toggleNavMenu);
        }

        // Smooth scroll for nav links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    handleSmoothScroll(e, href);
                }
            });
        });

        // FAQ accordion
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => toggleFaqItem(item));
            }
        });

        // Setup scroll animations
        setupScrollAnimations();

        // Close mobile menu on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });

        // Keyboard navigation for FAQ
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });

        // Add loaded class for initial animations
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    });

    // ===================================
    // Console Branding
    // ===================================
    console.log('%c🚀 FlowStack', 'color: #6366f1; font-size: 24px; font-weight: bold;');
    console.log('%cModern SaaS Platform', 'color: #6b7280; font-size: 14px;');

})();
