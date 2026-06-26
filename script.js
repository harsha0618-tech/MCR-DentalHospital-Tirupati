/* ============================================
   MCR MULTISPECIALITY DENTAL HOSPITAL
   JAVASCRIPT - Premium Dental Website
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // SPLASH SCREEN (sessionStorage)
    // Shows only on first visit per tab session
    // ============================================
    function initSplash() {
        const splash = document.getElementById('splash-screen');
        if (!splash) return;

        // Check if already shown in this session
        if (sessionStorage.getItem('splashShown')) {
            splash.style.display = 'none';
        } else {
            // Mark as shown
            sessionStorage.setItem('splashShown', 'true');

            // Remove from DOM after animation completes
            setTimeout(() => {
                splash.style.display = 'none';
            }, 2500);
        }
    }

    // ============================================
    // MOBILE MENU TOGGLE
    // Hamburger button opens/closes slide menu
    // ============================================
    function initMenu() {
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuLinks = document.querySelectorAll('.menu-link');

        if (!menuBtn || !mobileMenu) return;

        // Toggle menu on hamburger click
        menuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });

        // Close menu when clicking a link + smooth scroll
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                // Close menu
                menuBtn.classList.remove('active');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';

                // Smooth scroll to section
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ============================================
    // SCROLL REVEAL ANIMATION
    // Elements fade in as they enter viewport
    // ============================================
    function initScrollReveal() {
        // Add reveal class to all cards and sections
        const revealElements = document.querySelectorAll(
            '.about-card, .equip-card, .treat-card, .testi-card, ' +
            '.doctor-card, .timing-card, .map-card, .contact-form, .contact-info, .faq-item'
        );

        revealElements.forEach(function(el) {
            el.classList.add('reveal');
        });

        // Intersection Observer for scroll reveal
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Unobserve after revealing
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(function(el) {
            observer.observe(el);
        });
    }

    // ============================================
    // HEADER SCROLL EFFECT
    // Add shadow to header when scrolling down
    // ============================================
    function initHeaderScroll() {
        const header = document.getElementById('main-header');
        if (!header) return;

        let lastScroll = 0;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            } else {
                header.style.boxShadow = 'none';
            }

            lastScroll = currentScroll;
        });
    }

    // ============================================
    // FAQ ACCORDION
    // Toggle FAQ answers with smooth animation
    // ============================================
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(function(item) {
            const question = item.querySelector('.faq-question');

            question.addEventListener('click', function() {
                // Close all other items
                faqItems.forEach(function(otherItem) {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }

    // ============================================
    // CONTACT FORM VALIDATION
    // Client-side validation before submit
    // ============================================
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;

            // Name validation
            const nameInput = document.getElementById('contact-name');
            const nameError = document.getElementById('error-name');
            if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
                nameError.classList.add('show');
                nameInput.style.borderColor = '#EF4444';
                isValid = false;
            } else {
                nameError.classList.remove('show');
                nameInput.style.borderColor = '';
            }

            // Phone validation (Indian format)
            const phoneInput = document.getElementById('contact-phone');
            const phoneError = document.getElementById('error-phone');
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
            if (!phoneRegex.test(phoneInput.value.trim())) {
                phoneError.classList.add('show');
                phoneInput.style.borderColor = '#EF4444';
                isValid = false;
            } else {
                phoneError.classList.remove('show');
                phoneInput.style.borderColor = '';
            }

           
            // Message validation
            const messageInput = document.getElementById('contact-message');
            const messageError = document.getElementById('error-message');
            if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
                messageError.classList.add('show');
                messageInput.style.borderColor = '#EF4444';
                isValid = false;
            } else {
                messageError.classList.remove('show');
                messageInput.style.borderColor = '';
            }

            // If valid, show success message (in production, send to server)
            if (isValid) {
                alert('Thank you! Your message has been sent. We will contact you soon.');
                form.reset();
            }
        });

        // Real-time validation on input
        const inputs = form.querySelectorAll('.form-input');
        inputs.forEach(function(input) {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
                const errorId = 'error-' + this.id.replace('contact-', '');
                const errorEl = document.getElementById(errorId);
                if (errorEl) errorEl.classList.remove('show');
            });
        });
    }

  

    // ============================================
    // FLOATING BUTTON ANIMATION
    // Subtle entrance animation for floating buttons
    // ============================================
    function initFloatingButtons() {
        const floatBtns = document.querySelectorAll('.float-btn');

        floatBtns.forEach(function(btn, index) {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';

            setTimeout(function() {
                btn.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, 1000 + (index * 200));
        });
    }

    // ============================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // Highlight current section in menu
    // ============================================
    function initActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const menuLinks = document.querySelectorAll('.menu-link');

        window.addEventListener('scroll', function() {
            let current = '';

            sections.forEach(function(section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (window.pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            menuLinks.forEach(function(link) {
                link.style.color = '';
                if (link.getAttribute('href') === '#' + current) {
                    link.style.color = '#14B8A6';
                }
            });
        });
    }
    document.querySelectorAll(".treat-btn").forEach(button => {
    button.addEventListener("click", () => {
        const treatment = button.dataset.treatment;
        const query = `${treatment} treatment meaning, uses, purpose, who needs it, benefits, risks, symptoms it treats, before and after images`;
        const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(url, "_blank");
    });
});

    // ============================================
    // LAZY LOAD IMAGES
    // Use native lazy loading with fallback
    // ============================================
    function initLazyLoad() {
        // Native lazy loading is handled by 'loading="lazy"' attribute
        // This adds a fade-in effect when images load
        const images = document.querySelectorAll('img[loading="lazy"]');

        images.forEach(function(img) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';

            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });

            // If already cached
            if (img.complete) {
                img.style.opacity = '1';
            }
        });
    }

    // ============================================
    // INITIALIZE ALL FUNCTIONS
    // ============================================
    function init() {
        initSplash();
        initMenu();
        initScrollReveal();
        initHeaderScroll();
        initFAQ();
        initContactForm();
        initFloatingButtons();
        initActiveNav();
        initLazyLoad();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
const dateInput = document.getElementById("appointment-date");
const timeSelect = document.getElementById("appointment-time");

/* Disable past dates */

const today = new Date().toISOString().split("T")[0];
dateInput.min = today;

/* Time Slots */

const weekdaySlots = [

"10:00 AM",
"10:30 AM",
"11:00 AM",
"11:30 AM",
"12:00 PM",
"12:30 PM",

"4:00 PM",
"4:30 PM",
"5:00 PM",
"5:30 PM",
"6:00 PM",
"6:30 PM",
"7:00 PM",
"7:30 PM",
"8:00 PM",
"8:30 PM"

];

const sundaySlots = [

"10:00 AM",
"10:30 AM",
"11:00 AM",
"11:30 AM",
"12:00 PM",
"12:30 PM"

];

dateInput.addEventListener("change", function () {

    const selectedDate = new Date(this.value);

    const day = selectedDate.getDay();

    timeSelect.innerHTML =
        '<option value="">Select Time Slot</option>';

    const slots = day === 0 ? sundaySlots : weekdaySlots;

    slots.forEach(slot => {

        const option = document.createElement("option");

        option.value = slot;

        option.textContent = slot;

        timeSelect.appendChild(option);

    });

});
/* ===========================================
   MCR Dental Hospital WhatsApp Appointment
=========================================== */

const appointmentForm = document.getElementById("contact-form");

appointmentForm.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("contact-name").value.trim();

    const age = document.getElementById("patient-age").value.trim();

    const gender = document.getElementById("patient-gender").value;

    const phone = document.getElementById("contact-phone").value.trim();

    const date = document.getElementById("appointment-date").value;

    const time = document.getElementById("appointment-time").value;

    if(
        name === "" ||
        age === "" ||
        gender === "" ||
        phone === "" ||
        date === "" ||
        time === ""
    ){

        alert("Please fill all the details.");

        return;

    }

    const formattedDate = new Date(date).toLocaleDateString("en-IN",{
        day:"2-digit",
        month:"long",
        year:"numeric"
    });

    const message =
`🦷 *NEW APPOINTMENT REQUEST*

👤 Name: ${name}

🎂 Age: ${age}

⚧ Gender: ${gender}

📞 Phone: ${phone}

📅 Appointment Date: ${formattedDate}

🕒 Time Slot: ${time}

Please confirm my appointment.

Thank you.`;

    const whatsappNumber = "919949579688";

    const whatsappURL =
`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL,"_blank");

});
