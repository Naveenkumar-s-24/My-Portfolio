// ============================================
// Scroll Effects — Enhanced Premium
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initSmoothScroll();
    initScrollProgress();
    initStaggerChildren();
    initCounterReveal();
    addHeadingUnderlines();
    initActiveNav();
    initAmbientOrb();
});

/**
 * Smart active nav link tracking using IntersectionObserver.
 * Highlights the navbar link matching the section currently in view.
 */
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar__link');
    if (!sections.length || !navLinks.length) return;

    const setActive = (id) => {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActive(entry.target.id);
            }
        });
    }, {
        rootMargin: '-30% 0px -65% 0px',  // fires when section is ~middle of viewport
        threshold: 0
    });

    sections.forEach(s => observer.observe(s));
}

/**
 * Per-section ambient orb color switching.
 * Toggles body.ambient--{sectionId} as sections scroll into view.
 */
function initAmbientOrb() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    // Set initial class
    document.body.classList.add('ambient--hero');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove all ambient classes
                document.body.className = document.body.className
                    .replace(/ambient--\S+/g, '').trim();
                // Add the new one
                document.body.classList.add(`ambient--${entry.target.id}`);
            }
        });
    }, {
        rootMargin: '-25% 0px -65% 0px',
        threshold: 0
    });

    sections.forEach(s => observer.observe(s));
}



/**
 * Scroll progress bar — pure scaleX transform (GPU, no layout)
 */
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    let ticking = false;
    let lastKnownScrollPosition = 0;
    
    window.addEventListener('scroll', () => {
        lastKnownScrollPosition = window.scrollY;
        
        if (ticking) return;
        ticking = true;
        
        requestAnimationFrame(() => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? lastKnownScrollPosition / docHeight : 0;
            bar.style.transform = `scaleX(${progress})`;
            ticking = false;
        });
    }, { passive: true });
}

/**
 * Reveal elements as they enter the viewport
 * Supports: .reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .reveal-rotate
 */
function initScrollReveal() {
    const selector = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .reveal-rotate';
    const revealElements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // fire once → better perf
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/**
 * Stagger children within .reveal-stagger-children
 */
function initStaggerChildren() {
    const staggerParents = document.querySelectorAll('.reveal-stagger-children');
    if (!staggerParents.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = [...entry.target.children];
                children.forEach((child, i) => {
                    child.style.transitionDelay = `${i * 80}ms`;
                });
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    staggerParents.forEach(el => observer.observe(el));
}

/**
 * Counter animation triggered by scroll — wires to animateCounter from animations.js
 */
function initCounterReveal() {
    const counters = document.querySelectorAll('[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.dataset.target);
                const suffix = el.dataset.suffix || '';

                el.classList.add('animating');

                if (typeof window.animateCounter === 'function') {
                    window.animateCounter(el, target, 1800);
                } else {
                    // fallback: plain number
                    el.textContent = target + suffix;
                }
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

/**
 * Add gradient underline spans to section titles and animate them
 */
function addHeadingUnderlines() {
    const headers = document.querySelectorAll('.section__header');
    headers.forEach(header => {
        // Avoid double injection
        if (header.querySelector('.section__title-underline')) return;
        const title = header.querySelector('.section__title');
        if (!title) return;
        const underline = document.createElement('span');
        underline.className = 'section__title-underline';
        title.insertAdjacentElement('afterend', underline);
    });
}

/**
 * Smooth scroll for navigation links
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.navbar__links a, .footer__links a, .hero__cta a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetId === '') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (targetSection) {
                    const offset = 80;
                    window.scrollTo({
                        top: targetSection.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

console.log('Scroll enhanced ✓');


