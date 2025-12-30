// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SKYVELA CHARTER — INTERACTIVE FUNCTIONALITY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

(function() {
    'use strict';

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // GLOBAL VARIABLES
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navbarMenu = document.getElementById('navbarMenu');
    const navbarLinks = document.querySelectorAll('.navbar-link');
    const fleetModal = document.getElementById('fleetModal');
    const demoModal = document.getElementById('demoModal');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let demoModalTimeout = null;

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // STICKY NAVBAR SHADOW ON SCROLL
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    function handleScroll() {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // MOBILE MENU TOGGLE
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    function toggleMobileMenu() {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';

        hamburger.setAttribute('aria-expanded', !isExpanded);
        navbarMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (!isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    function closeMobileMenu() {
        hamburger.setAttribute('aria-expanded', 'false');
        navbarMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Close menu when clicking on a link
    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navbarMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SCROLL SPY — ACTIVE NAV LINK
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navbarLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial check

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#" or placeholder links
            if (href === '#' || href === '#privacy' || href === '#legal' || href === '#imprint') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                if (prefersReducedMotion) {
                    target.scrollIntoView();
                } else {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SCROLL TO CONTACT HELPER FUNCTION
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    window.scrollToContact = function() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            if (prefersReducedMotion) {
                contactSection.scrollIntoView();
            } else {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    };

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // FLEET MODAL
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    const fleetModalData = {
        light: {
            title: 'Light Jet Class',
            images: ['images/image_5.png', 'images/image_5.png'],
            idealFor: [
                'Short to medium European routes (up to 1,400 nautical miles)',
                'Business meetings requiring rapid turnaround',
                'Small executive teams (up to 6-8 passengers)',
                'Regional travel with minimal luggage',
                'Cost-efficient charter for shorter distances'
            ],
            disclaimer: 'Aircraft availability and specifications depend on routing and operator. Typical configurations shown; actual aircraft may vary based on availability.'
        },
        cabin: {
            title: 'Cabin Comfort & Experience',
            images: ['images/image_2.png', 'images/image_3.png'],
            idealFor: [
                'Productive work environment with full connectivity',
                'Confidential business discussions in complete privacy',
                'Premium catering tailored to dietary requirements',
                'Entertainment systems for leisure travel',
                'Climate-controlled, pressurized cabin comfort'
            ],
            disclaimer: 'Cabin configurations and amenities vary by aircraft type and operator. Specific requests should be communicated during the booking process.'
        },
        engineering: {
            title: 'Engineering & Aircraft Standards',
            images: ['images/image_4.png', 'images/image_4.png'],
            idealFor: [
                'Modern avionics and navigation systems',
                'Rigorous maintenance schedules and documentation',
                'Operators meeting European safety regulations',
                'Advanced weather radar and safety equipment',
                'Transparent aircraft registration and operator details'
            ],
            disclaimer: 'We work exclusively with operators who maintain comprehensive maintenance logs and regulatory compliance. Specific aircraft details provided upon booking confirmation.'
        }
    };

    window.openFleetModal = function(type) {
        const data = fleetModalData[type];
        if (!data) return;

        const modalBody = document.getElementById('modalBody');

        modalBody.innerHTML = `
            <h2 class="modal-title" id="modalTitle">${data.title}</h2>

            <div class="modal-gallery">
                ${data.images.map(img => `
                    <div class="modal-gallery-image">
                        <img src="${img}" alt="${data.title}" onerror="this.parentElement.classList.add('image-placeholder')">
                    </div>
                `).join('')}
            </div>

            <div class="modal-section">
                <h3>Ideal For:</h3>
                <ul class="modal-list">
                    ${data.idealFor.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>

            <div class="modal-disclaimer">
                ${data.disclaimer}
            </div>
        `;

        fleetModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus management for accessibility
        const closeButton = fleetModal.querySelector('.modal-close');
        if (closeButton) {
            closeButton.focus();
        }
    };

    window.closeFleetModal = function() {
        fleetModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fleetModal.classList.contains('active')) {
            window.closeFleetModal();
        }
    });

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // DEMO MODAL
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    window.openDemoModal = function() {
        demoModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Clear any existing timeout
        if (demoModalTimeout) {
            clearTimeout(demoModalTimeout);
        }

        // Auto-close after 4 seconds
        demoModalTimeout = setTimeout(() => {
            window.closeDemoModal();
        }, 4000);

        // Focus management for accessibility
        const closeButton = demoModal.querySelector('.demo-modal-close');
        if (closeButton) {
            closeButton.focus();
        }
    };

    window.closeDemoModal = function() {
        demoModal.classList.remove('active');
        document.body.style.overflow = '';

        // Clear timeout if modal is manually closed
        if (demoModalTimeout) {
            clearTimeout(demoModalTimeout);
            demoModalTimeout = null;
        }
    };

    // Close demo modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && demoModal.classList.contains('active')) {
            window.closeDemoModal();
        }
    });

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // FAQ ACCORDION
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            // Close all other FAQ items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    otherQuestion.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current item
            question.setAttribute('aria-expanded', !isExpanded);
        });

        // Keyboard support
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // FORM HANDLING — HERO QUOTE FORM
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    const heroQuoteForm = document.getElementById('heroQuoteForm');

    if (heroQuoteForm) {
        heroQuoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate form
            if (!heroQuoteForm.checkValidity()) {
                heroQuoteForm.reportValidity();
                return;
            }

            // Get form data
            const formData = new FormData(heroQuoteForm);
            const data = Object.fromEntries(formData);

            console.log('Hero Quote Form submitted (demo):', data);

            // Show demo notice instead of actual submission
            window.openDemoModal();
        });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // FORM HANDLING — CONTACT FORM
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate form
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            console.log('Contact Form submitted (demo):', data);

            // Show demo notice instead of actual submission
            window.openDemoModal();
        });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SET MINIMUM DATE FOR DATE INPUTS (TODAY)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    function setMinDate() {
        const today = new Date().toISOString().split('T')[0];
        const dateInputs = document.querySelectorAll('input[type="date"]');

        dateInputs.forEach(input => {
            input.setAttribute('min', today);
        });
    }

    setMinDate();

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // IMAGE ERROR HANDLING (FALLBACK PLACEHOLDERS)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            // Handled by inline onerror in HTML, but this provides backup
            if (!this.classList.contains('error-handled')) {
                this.classList.add('error-handled');
                const parent = this.parentElement;
                if (parent && !parent.classList.contains('image-placeholder')) {
                    parent.classList.add('image-placeholder');
                }
            }
        });
    });

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // INTERSECTION OBSERVER — HOW IT WORKS TIMELINE ANIMATION
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    const stepsContainer = document.querySelector('.steps-container');
    const stepsTimeline = document.querySelector('.steps-timeline');
    const stepCards = document.querySelectorAll('.step-card');

    if (stepsContainer && stepsTimeline && !prefersReducedMotion) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        const stepsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger timeline draw animation
                    stepsTimeline.classList.add('animate');

                    // Trigger step cards fade-in with stagger
                    stepCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('fade-in');
                        }, 200 + (index * 150)); // Stagger by 150ms
                    });

                    // Unobserve after animation triggers (only animate once)
                    stepsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        stepsObserver.observe(stepsContainer);
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // INITIALIZATION COMPLETE
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    console.log('SKYVELA Charter — All interactive features loaded');

})();
