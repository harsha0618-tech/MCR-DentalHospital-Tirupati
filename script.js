/* ============================================
   MCR MULTISPECIALITY DENTAL HOSPITAL
   JAVASCRIPT - Premium Dental Website
   ============================================ */

(function () {
    'use strict';

    // ============================================
    // SPLASH SCREEN (sessionStorage)
    // Shows only on first visit per tab session
    // ============================================
    function initSplash() {
        const splash = document.getElementById('splash-screen');
        if (!splash) return;

        if (sessionStorage.getItem('splashShown')) {
            splash.style.display = 'none';
        } else {
            sessionStorage.setItem('splashShown', 'true');
            setTimeout(() => {
                splash.style.display = 'none';
            }, 2500);
        }
    }

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    function initMenu() {
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuLinks = document.querySelectorAll('.menu-link');

        if (!menuBtn || !mobileMenu) return;

        menuBtn.addEventListener('click', function () {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });

        menuLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetSection = document.querySelector(this.getAttribute('href'));

                menuBtn.classList.remove('active');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';

                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ============================================
    // SCROLL REVEAL ANIMATION
    // ============================================
    function initScrollReveal() {
        const revealElements = document.querySelectorAll(
            '.about-card, .equip-card, .treat-card, .testi-card, ' +
            '.timing-card, .map-card, .contact-form, .contact-info, .faq-item'
        );

        revealElements.forEach(function (el) {
            el.classList.add('reveal');
        });

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px', threshold: 0.1 });

        revealElements.forEach(function (el) {
            observer.observe(el);
        });
    }

    // ============================================
    // HEADER SCROLL SHADOW
    // ============================================
    function initHeaderScroll() {
        const header = document.getElementById('main-header');
        if (!header) return;

        window.addEventListener('scroll', function () {
            header.style.boxShadow = window.pageYOffset > 50
                ? '0 4px 20px rgba(0,0,0,0.08)'
                : 'none';
        }, { passive: true });
    }

    // ============================================
    // FAQ ACCORDION
    // ============================================
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(function (item) {
            item.querySelector('.faq-question').addEventListener('click', function () {
                faqItems.forEach(function (other) {
                    if (other !== item) other.classList.remove('active');
                });
                item.classList.toggle('active');
            });
        });
    }

    // ============================================
    // FLOATING BUTTON ENTRANCE ANIMATION
    // ============================================
    function initFloatingButtons() {
        document.querySelectorAll('.float-btn').forEach(function (btn, index) {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';

            setTimeout(function () {
                btn.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, 1000 + index * 200);
        });
    }

    // ============================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ============================================
    function initActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const menuLinks = document.querySelectorAll('.menu-link');

        window.addEventListener('scroll', function () {
            let current = '';

            sections.forEach(function (section) {
                if (window.pageYOffset >= section.offsetTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            menuLinks.forEach(function (link) {
                link.style.color = link.getAttribute('href') === '#' + current ? '#14B8A6' : '';
            });
        }, { passive: true });
    }

    // ============================================
    // LAZY IMAGE FADE-IN
    // ============================================
    function initLazyLoad() {
        document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
            img.style.opacity = img.complete ? '1' : '0';
            img.style.transition = 'opacity 0.5s ease';
            img.addEventListener('load', function () {
                this.style.opacity = '1';
            });
        });
    }

    // ============================================
    // TREATMENT BUTTONS → GOOGLE SEARCH
    // ============================================
    function initTreatmentButtons() {
        document.querySelectorAll('.treat-btn').forEach(function (button) {
            button.addEventListener('click', function () {
                const query = button.dataset.treatment +
                    ' treatment meaning, uses, purpose, who needs it, benefits, risks, symptoms it treats, before and after images';
                window.open('https://www.google.com/search?q=' + encodeURIComponent(query), '_blank');
            });
        });
    }

    // ============================================
    // APPOINTMENT DATE & TIME SLOTS
    // ============================================
    function initAppointmentSlots() {
        const dateInput = document.getElementById('appointment-date');
        const timeSelect = document.getElementById('appointment-time');

        if (!dateInput || !timeSelect) return;

        // Disable past dates
        dateInput.min = new Date().toISOString().split('T')[0];

        const weekdaySlots = [
            '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
            '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
            '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'
        ];

        const sundaySlots = [
            '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'
        ];

        dateInput.addEventListener('change', function () {
            const day = new Date(this.value).getDay();
            const slots = day === 0 ? sundaySlots : weekdaySlots;

            timeSelect.innerHTML = '<option value="">Select Time Slot</option>';
            slots.forEach(function (slot) {
                const option = document.createElement('option');
                option.value = slot;
                option.textContent = slot;
                timeSelect.appendChild(option);
            });
        });
    }

    // ============================================
    // WHATSAPP APPOINTMENT FORM
    // ============================================
    function initAppointmentForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const name   = document.getElementById('contact-name').value.trim();
            const age    = document.getElementById('patient-age').value.trim();
            const gender = document.getElementById('patient-gender').value;
            const phone  = document.getElementById('contact-phone').value.trim();
            const date   = document.getElementById('appointment-date').value;
            const time   = document.getElementById('appointment-time').value;

            if (!name || !age || !gender || !phone || !date || !time) {
                alert('Please fill all the details.');
                return;
            }

            const formattedDate = new Date(date).toLocaleDateString('en-IN', {
                day: '2-digit', month: 'long', year: 'numeric'
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

            window.open(
                'https://wa.me/919949579688?text=' + encodeURIComponent(message),
                '_blank'
            );
        });
    }

    // ============================================
    // INITIALIZE ALL
    // ============================================
    function init() {
        initSplash();
        initMenu();
        initScrollReveal();
        initHeaderScroll();
        initFAQ();
        initFloatingButtons();
        initActiveNav();
        initLazyLoad();
        initTreatmentButtons();
        initAppointmentSlots();
        initAppointmentForm();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
