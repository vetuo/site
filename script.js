// =============================================
// VETUO — Interactions
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav');
    const scrollIndicator = document.querySelector('.hero__scroll');

    // --- Navigation scroll effect ---
    window.addEventListener('scroll', () => {
        nav.classList.toggle('nav--scrolled', window.scrollY > 50);
        if (scrollIndicator) {
            scrollIndicator.classList.toggle('hidden', window.scrollY > 200);
        }
    }, { passive: true });

    // --- Mobile menu ---
    const toggle = document.querySelector('.nav__toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    function closeMenu() {
        toggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    }

    function openMenu() {
        toggle.classList.add('active');
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
        const firstLink = mobileMenu.querySelector('a');
        if (firstLink) firstLink.focus();
    }

    toggle.addEventListener('click', () => {
        const isOpen = toggle.classList.contains('active');
        isOpen ? closeMenu() : openMenu();
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            closeMenu();
            toggle.focus();
        }
    });

    mobileMenu.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        const links = mobileMenu.querySelectorAll('a');
        const first = links[0];
        const last = links[links.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });

    // --- Scroll reveal ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // --- Smooth scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
});
