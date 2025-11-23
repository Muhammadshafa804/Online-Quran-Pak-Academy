// main.js - COMPLETE FIXED VERSION
document.addEventListener('DOMContentLoaded', function () {
    console.log('Online Quran Pak Academy - JS Loaded');

    // Mobile Menu Toggle - COMPLETELY FIXED
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');

    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            console.log('Hamburger clicked');
            navMenu.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
        });

        // Close menu when clicking outside - FIXED
        document.addEventListener('click', function (e) {
            if (!navMenu.contains(e.target) && !hamburgerMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburgerMenu.classList.remove('active');
            }
        });

        // Close menu when clicking on links - FIXED
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                hamburgerMenu.classList.remove('active');
            });
        });
    }

    // Plan button click handlers
    const planButtons = document.querySelectorAll('.plan-btn');
    planButtons.forEach(button => {
        button.addEventListener('click', function () {
            const planName = this.closest('.pricing-card').querySelector('h3').textContent;
            alert(`Thank you for choosing ${planName} plan! Redirecting to payment.`);
        });
    });

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your message! We will contact you soon.');
            this.reset();
        });
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}!`);
            this.reset();
        });
    }

    // FAQ Toggle Functionality - FIXED VERSION
    console.log('FAQ functionality loading...');
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        console.log('FAQ items found:', faqItems.length);
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (question && answer) {
                // Initially hide all answers
                answer.style.display = 'none';
                
                question.addEventListener('click', function() {
                    console.log('FAQ clicked');
                    
                    // Toggle current item
                    const isActive = item.classList.contains('active');
                    
                    // Close all items first
                    faqItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.display = 'none';
                        }
                    });
                    
                    // Open clicked item if it wasn't active
                    if (!isActive) {
                        item.classList.add('active');
                        answer.style.display = 'block';
                    }
                });
            }
        });
    } else {
        console.log('No FAQ items found');
    }

    // FAQ Search Functionality
    const faqSearch = document.getElementById('faqSearch');
    if (faqSearch) {
        faqSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const allFaqItems = document.querySelectorAll('.faq-item');
            
            allFaqItems.forEach(item => {
                const question = item.querySelector('.faq-question h3')?.textContent.toLowerCase() || '';
                const answer = item.querySelector('.faq-answer p')?.textContent.toLowerCase() || '';
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // FAQ Category Filter
    const categoryBtns = document.querySelectorAll('.category-btn');
    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all buttons
                categoryBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                const faqCategories = document.querySelectorAll('.faq-category');
                
                faqCategories.forEach(cat => {
                    if (category === 'all' || cat.getAttribute('data-category') === category) {
                        cat.style.display = 'block';
                    } else {
                        cat.style.display = 'none';
                    }
                });
            });
        });
    }

    // Working Hours Toggle Function
    const hoursDropdown = document.getElementById('hoursDropdown');
    if (hoursDropdown) {
        hoursDropdown.style.display = 'none';
    }
    
    // Initialize pricing display
    const pricingToggle = document.getElementById('pricingToggle');
    if (pricingToggle && !pricingToggle.checked) {
        const monthlyPrices = document.querySelectorAll('.price.monthly');
        const yearlyPrices = document.querySelectorAll('.price.yearly');
        monthlyPrices.forEach(price => price.style.display = 'inline');
        yearlyPrices.forEach(price => price.style.display = 'none');
    }

    // Contact Form Handling
    const contactForm2 = document.querySelector('.contact-form form');
    
    if (contactForm2) {
        contactForm2.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form data collect karein
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const course = formData.get('course');
            const message = formData.get('message');
            
            // Validation
            if (!name || !email || !course || !message) {
                showMessage('Please fill all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Success message
            showMessage('✅ Thank you! Your message has been sent. We will contact you within 24 hours.', 'success');
            
            // Form reset
            this.reset();
        });
    }
    
    function showMessage(text, type) {
        // Remove existing messages
        const existingMsg = document.querySelector('.form-message');
        if (existingMsg) {
            existingMsg.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.style.cssText = `
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
            font-size: 1.1rem;
        `;
        
        if (type === 'success') {
            messageDiv.style.background = '#4CAF50';
            messageDiv.style.color = 'white';
        } else {
            messageDiv.style.background = '#f44336';
            messageDiv.style.color = 'white';
        }
        
        messageDiv.textContent = text;
        
        // Form ke upar message show karein
        const contactForm = document.querySelector('.contact-form form');
        contactForm.parentNode.insertBefore(messageDiv, contactForm);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Load More Articles
    const loadMoreBtn = document.querySelector('.load-more .btn');
    const moreArticlesSection = document.getElementById('more-articles');
    
    if (loadMoreBtn && moreArticlesSection) {
        loadMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Smooth scroll to the section
            moreArticlesSection.style.display = 'block';
            moreArticlesSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Change button text after click
            this.textContent = 'Articles Loaded';
            this.style.opacity = '0.7';
            this.style.cursor = 'default';
        });
    }

    // Initialize Blog Filter
    initializeBlogFilter();
    
    // Initialize Teachers Page
    initializeTeachersPage();

    // Pricing toggle functionality
    const pricingToggle2 = document.getElementById('pricingToggle');
    const monthlyPrices = document.querySelectorAll('.price.monthly');
    const yearlyPrices = document.querySelectorAll('.price.yearly');

    if (pricingToggle2) {
        pricingToggle2.addEventListener('change', function () {
            if (this.checked) {
                // Switch to yearly pricing
                monthlyPrices.forEach(price => price.style.display = 'none');
                yearlyPrices.forEach(price => price.style.display = 'inline');
            } else {
                // Switch to monthly pricing
                monthlyPrices.forEach(price => price.style.display = 'inline');
                yearlyPrices.forEach(price => price.style.display = 'none');
            }
        });
    }

    // Pricing Page Specific FAQ Fix
console.log('Checking for pricing page FAQs...');

// Pricing page ke liye specific handler
const pricingFaqItems = document.querySelectorAll('.faq-pricing .faq-item');

if (pricingFaqItems.length > 0) {
    console.log('Pricing page FAQs found:', pricingFaqItems.length);
    
    pricingFaqItems.forEach(item => {
        // Question h4 element ko target karein
        const question = item.querySelector('h4');
        // Answer p element ko target karein  
        const answer = item.querySelector('p');
        
        if (question && answer) {
            // Initially hide answer
            answer.style.display = 'none';
            
            // Question par click handler add karein
            question.addEventListener('click', function() {
                console.log('Pricing FAQ clicked');
                
                const isActive = item.classList.contains('active');
                
                // Close all other pricing FAQs
                pricingFaqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('p');
                        if (otherAnswer) {
                            otherAnswer.style.display = 'none';
                        }
                    }
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.display = 'block';
                } else {
                    item.classList.remove('active');
                    answer.style.display = 'none';
                }
            });
            
            // Pointer cursor add karein
            question.style.cursor = 'pointer';
        }
    });
}


    // Plan button click handlers - CONTACT PAGE REDIRECT
    const planButtons2 = document.querySelectorAll('.plan-btn');
    planButtons2.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const planName = this.closest('.pricing-card').querySelector('h3').textContent;
            
            // Redirect to contact page with plan info
            window.location.href = 'contact.html?plan=' + encodeURIComponent(planName);
        });
    });
});

// Working Hours Toggle Function
function toggleWorkingHours() {
    const hoursDropdown = document.getElementById('hoursDropdown');
    const hoursToggle = document.querySelector('.hours-toggle');
    
    if (hoursDropdown.style.display === 'none' || hoursDropdown.style.display === '') {
        hoursDropdown.style.display = 'block';
        hoursToggle.textContent = 'Hide Timings';
        hoursToggle.style.color = '#FFD700';
    } else {
        hoursDropdown.style.display = 'none';
        hoursToggle.textContent = 'View Timings';
        hoursToggle.style.color = '#FFFFFF';
    }
}

// Blog Categories Filter Functionality
function initializeBlogFilter() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (categoryButtons.length === 0 || blogCards.length === 0) return;
    
    // Filter blogs by category
    function filterBlogs(category) {
        blogCards.forEach(card => {
            const cardCategory = card.querySelector('.blog-category').textContent.toLowerCase();
            
            if (category === 'all' || cardCategory.includes(category)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Add click event to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category from href
            const category = this.getAttribute('href').replace('#', '');
            
            // Filter blogs
            filterBlogs(category);
        });
    });
}

// Teachers Page Functionality
function initializeTeachersPage() {
    // Teacher Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const teacherCards = document.querySelectorAll('.teacher-card');
    
    if (filterButtons.length > 0 && teacherCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter teachers
                teacherCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        const teacherSkills = card.querySelector('.teacher-skills').textContent.toLowerCase();
                        if (teacherSkills.includes(filterValue)) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 100);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
    }
    
    // Teacher Card Hover Effects
    teacherCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
    
    // Specialization Cards Interaction
    const specCards = document.querySelectorAll('.specialization-card');
    specCards.forEach(card => {
        card.addEventListener('click', function() {
            const link = this.querySelector('.spec-link');
            if (link) {
                window.location.href = link.getAttribute('href');
            }
        });
    });
}

console.log('Main.js loaded successfully');

