// ===========================
// Mobile Navigation Toggle
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // ===========================
    // Contact Form Validation & Submission
    // ===========================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validate name
            if (name === '') {
                showError('nameError', 'Name is required');
                isValid = false;
            } else if (name.length < 2) {
                showError('nameError', 'Name must be at least 2 characters');
                isValid = false;
            }
            
            // Validate email
            if (email === '') {
                showError('emailError', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate phone (optional, but if provided should be valid)
            if (phone !== '' && !isValidPhone(phone)) {
                showError('phoneError', 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Validate service
            if (service === '') {
                showError('serviceError', 'Please select a service');
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                showError('messageError', 'Message is required');
                isValid = false;
            } else if (message.length < 10) {
                showError('messageError', 'Message must be at least 10 characters');
                isValid = false;
            }
            
            // If form is valid, submit
            if (isValid) {
                submitForm(name, email, phone, service, message);
            }
        });
    }
    
    // ===========================
    // Form Helper Functions
    // ===========================
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        // Basic phone validation (accepts various formats)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }
    
    function submitForm(name, email, phone, service, message) {
        // In a real application, you would send this data to a server
        // For now, we'll just show a success message
        
        // Hide the form
        contactForm.style.display = 'none';
        
        // Show success message
        const successMessage = document.getElementById('formSuccess');
        if (successMessage) {
            successMessage.style.display = 'block';
        }
        
        // Log form data (for demonstration)
        console.log('Form submitted with the following data:');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Phone:', phone);
        console.log('Service:', service);
        console.log('Message:', message);
        
        // Reset form after 3 seconds and show it again
        setTimeout(function() {
            contactForm.reset();
            contactForm.style.display = 'block';
            if (successMessage) {
                successMessage.style.display = 'none';
            }
        }, 5000);
    }
    
    // ===========================
    // Smooth Scrolling for Anchor Links
    // ===========================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only apply smooth scrolling if it's not just '#'
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ===========================
    // Scroll to Top Button (Optional Enhancement)
    // ===========================
    let scrollToTopBtn;
    
    // Create scroll to top button dynamically
    function createScrollToTopButton() {
        scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '↑';
        scrollToTopBtn.setAttribute('id', 'scrollToTop');
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 24px;
            cursor: pointer;
            display: none;
            z-index: 1000;
            transition: all 0.3s ease;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        `;
        
        scrollToTopBtn.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--secondary-color)';
            this.style.transform = 'scale(1.1)';
        });
        
        scrollToTopBtn.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'var(--primary-color)';
            this.style.transform = 'scale(1)';
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(scrollToTopBtn);
    }
    
    createScrollToTopButton();
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (scrollToTopBtn) {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.display = 'block';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        }
    });
    
    // ===========================
    // Animation on Scroll (Fade in elements)
    // ===========================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .stat-card, .info-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // ===========================
    // Active Navigation Highlighting
    // ===========================
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPage = link.getAttribute('href');
            
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    setActiveNavLink();
    
    // ===========================
    // Console Welcome Message
    // ===========================
    console.log('%c🎓 Welcome to Dr. Caligben Resources! 🎓', 'color: #2563eb; font-size: 20px; font-weight: bold;');
    console.log('%cEmpowering Growth Through ICT & Education', 'color: #6b7280; font-size: 14px;');
});