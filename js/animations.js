/* ============================================
   Animation Helpers — Premium
   ============================================ */

(function () {
    'use strict';

    /**
     * Parallax background shift on mouse move.
     */
    function initParallax() {
        const elements = document.querySelectorAll('[data-parallax-speed]');
        if (!elements.length) return;

        let ticking = false;

        document.addEventListener('mousemove', (e) => {
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(() => {
                const { innerWidth, innerHeight } = window;
                const x = (e.clientX / innerWidth - 0.5) * 2;
                const y = (e.clientY / innerHeight - 0.5) * 2;

                elements.forEach(el => {
                    const speed = parseFloat(el.dataset.parallaxSpeed) || 1;
                    el.style.transform = `translate(${x * speed * 25}px, ${y * speed * 25}px)`;
                });
                ticking = false;
            });
        });
    }

    /**
     * Magnetic hover effect for buttons / icons.
     */
    function initMagneticHover() {
        const magnetics = document.querySelectorAll('.magnetic');
        if (!magnetics.length) return;
        if (window.matchMedia('(hover: none)').matches) return;

        magnetics.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
                el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            });

            el.addEventListener('mouseenter', () => {
                el.style.transition = 'none';
            });
        });
    }

    /**
     * Typing / typewriter animation.
     */
    function initTypedEffect() {
        const typedElements = document.querySelectorAll('.typed');
        if (!typedElements.length) return;

        typedElements.forEach(el => {
            const words = (el.dataset.typed || '').split('|').filter(Boolean);
            if (!words.length) return;

            let wordIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            const speed = 70;
            const pause = 2200;

            function type() {
                const current = words[wordIndex];
                if (isDeleting) {
                    el.textContent = current.substring(0, charIndex--);
                } else {
                    el.textContent = current.substring(0, charIndex++);
                }

                let delay = isDeleting ? speed / 2 : speed;

                if (!isDeleting && charIndex > current.length) {
                    delay = pause;
                    isDeleting = true;
                } else if (isDeleting && charIndex < 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    delay = speed;
                }

                setTimeout(type, delay);
            }

            type();
        });
    }

    /**
     * Smooth counter animation.
     */
    window.animateCounter = function (el, target, duration = 2000) {
        const isFloat = String(target).includes('.') || el.dataset.suffix;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

            if (isFloat) {
                const suffix = el.dataset.suffix || '';
                const value = (eased * target).toFixed(1);
                el.textContent = value + suffix;
            } else {
                el.textContent = Math.floor(eased * target).toLocaleString();
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                const suffix = el.dataset.suffix || '';
                el.textContent = target.toLocaleString() + suffix;
            }
        }

        requestAnimationFrame(update);
    };

    /* ── Init ── */
    function init() {
        initParallax();
        initMagneticHover();
        initTypedEffect();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();