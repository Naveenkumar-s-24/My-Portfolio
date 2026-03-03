// ============================================
// Stats Counter Animation
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initStatsCounter();
});

function initStatsCounter() {
    // Corrected selector: .stat__number instead of .counter
    const counters = document.querySelectorAll(".stat__number");
    if (!counters.length) return;

    let counterStarted = false;

    const startCounters = () => {
        if (counterStarted) return;
        counterStarted = true;

        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute("data-target"));
            if (isNaN(target)) return;

            // If it's the CGPA (target 8.8) or has a suffix
            const isFloat = String(target).includes('.') || counter.dataset.suffix;
            const suffix = counter.dataset.suffix || '';

            let count = 0;
            const duration = 2000;
            const frameRate = 1000 / 60;
            const totalFrames = duration / frameRate;
            const increment = target / totalFrames;

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    if (isFloat) {
                        counter.innerText = count.toFixed(1) + suffix;
                    } else {
                        counter.innerText = Math.floor(count).toLocaleString() + suffix;
                    }
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target.toLocaleString() + suffix;
                }
            };

            updateCount();
        });
    };

    // Use IntersectionObserver for better performance and reliability
    const achievementsSection = document.querySelector("#about"); // Stats are in About section
    if (!achievementsSection) return;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startCounters();
            observer.unobserve(achievementsSection);
        }
    }, { threshold: 0.2 });

    observer.observe(achievementsSection);
}

console.log("Stats counter initialized ✓");