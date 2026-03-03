/* ============================================
   MICRO-INTERACTIONS & PREMIUM UI EFFECTS
   ============================================ */

(function() {
    'use strict';

    // Button ripple effect on click
    function initButtonRipple() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn');
            if (!btn) return;

            const ripple = document.createElement('span');
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, hsla(255,255,255,0.4) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                animation: rippleExpand 0.6s ease-out;
            `;

            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });

        const style = document.createElement('style');
        style.textContent = `
            @keyframes rippleExpand {
                from { transform: scale(0); opacity: 1; }
                to { transform: scale(2); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Smooth reveal on scroll with stagger
    function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-blur, .reveal-rotate, .reveal-scale');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 50);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        reveals.forEach(el => observer.observe(el));
    }

    // Parallax effect for hero background glows
    function initParallaxGlow() {
        const glows = document.querySelectorAll('.hero__bg-glow');
        if (!glows.length) return;

        let ticking = false;

        window.addEventListener('mousemove', (e) => {
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth - 0.5) * 2;
                const y = (e.clientY / window.innerHeight - 0.5) * 2;

                glows.forEach((glow, i) => {
                    const speed = (i + 1) * 0.5;
                    glow.style.transform = `translate(${x * 30 * speed}px, ${y * 30 * speed}px)`;
                });

                ticking = false;
            });
        }, { passive: true });
    }

    // Smooth number counter for stats
    function initStatCounters() {
        const stats = document.querySelectorAll('.stat__number');
        if (!stats.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseFloat(entry.target.dataset.target);
                    const suffix = entry.target.dataset.suffix || '';
                    
                    entry.target.classList.add('animating');
                    
                    if (window.animateCounter) {
                        window.animateCounter(entry.target, target, 2000);
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    }

    // Enhanced card tilt with light reflection
    function initCardReflection() {
        if (window.matchMedia('(hover: none)').matches) return;

        const cards = document.querySelectorAll('.glass-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                card.style.setProperty('--mouse-x', `${x}%`);
                card.style.setProperty('--mouse-y', `${y}%`);
            });

            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--mouse-x', '50%');
                card.style.setProperty('--mouse-y', '50%');
            });
        });
    }

    // Smooth scroll with easing
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();
                
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            });
        });
    }

    // Ambient section orb that follows scroll
    function initAmbientOrb() {
        const orb = document.getElementById('ambient-orb');
        if (!orb) return;

        let ticking = false;
        let lastKnownScrollPosition = 0;

        window.addEventListener('scroll', () => {
            lastKnownScrollPosition = window.scrollY;
            
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(() => {
                const sections = document.querySelectorAll('.section');
                const scrollPos = lastKnownScrollPosition + window.innerHeight / 2;

                sections.forEach((section, i) => {
                    const rect = section.getBoundingClientRect();
                    const sectionTop = lastKnownScrollPosition + rect.top;
                    const sectionBottom = sectionTop + rect.height;

                    if (scrollPos >= sectionTop && scrollPos <= sectionBottom) {
                        const colors = [
                            'hsla(245, 100%, 69%, 0.15)',
                            'hsla(165, 100%, 50%, 0.15)',
                            'hsla(300, 90%, 65%, 0.15)',
                            'hsla(32, 100%, 60%, 0.15)',
                            'hsla(200, 100%, 65%, 0.15)'
                        ];
                        orb.style.background = `radial-gradient(circle, ${colors[i % colors.length]}, transparent 70%)`;
                    }
                });

                ticking = false;
            });
        }, { passive: true });
    }

    // Enhanced typing cursor blink
    function initTypingCursor() {
        const cursor = document.querySelector('.typed-cursor');
        if (!cursor) return;

        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 530);
    }

    // Project card image parallax on hover
    function initProjectImageParallax() {
        if (window.matchMedia('(hover: none)').matches) return;

        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            const img = card.querySelector('.project-card__image');
            if (!img) return;

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
                
                img.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
            });

            card.addEventListener('mouseleave', () => {
                img.style.transform = '';
            });
        });
    }

    // Navbar hide on scroll down, show on scroll up
    function initSmartNavbar() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScroll = 0;
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(() => {
                const currentScroll = window.scrollY;

                if (currentScroll <= 100) {
                    navbar.style.transform = 'translateY(0)';
                } else if (currentScroll > lastScroll && currentScroll > 200) {
                    navbar.style.transform = 'translateY(-100%)';
                } else if (currentScroll < lastScroll) {
                    navbar.style.transform = 'translateY(0)';
                }

                lastScroll = currentScroll;
                ticking = false;
            });
        }, { passive: true });
    }

    // Initialize all micro-interactions
    function init() {
        initButtonRipple();
        initScrollReveal();
        initParallaxGlow();
        initStatCounters();
        initCardReflection();
        initSmoothScroll();
        initAmbientOrb();
        initTypingCursor();
        initProjectImageParallax();
        initSmartNavbar();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
