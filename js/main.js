/* ============================================
   Main Application — Premium
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCustomCursor();
  initNavbar();
  initMobileMenu();
  initProjectFilters();
  initContactForm();
  initCurrentYear();
  initBackToTop();
  initTiltCards();
  initHolographicCards();
  init3DProjectCards();
  initAudioToggle();
});

/* ── Cinematic Page Loader ── */
function initLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  document.body.classList.add('no-scroll');
  window.scrollTo(0, 0);

  const dismiss = () => {
    loader.classList.add('hidden');
    document.body.classList.remove('no-scroll');
    window.scrollTo(0, 0);
    setTimeout(() => loader.remove(), 800);
  };

  // Dismiss on mouse move
  document.addEventListener('mousemove', () => {
    const audio = document.getElementById('bgAudio');
    if (audio) {
      audio.muted = false;
      audio.play();
    }
    dismiss();
  }, { once: true });
}

/* ── Holographic Skill Cards (cursor-tracking foil) ── */
function initHolographicCards() {
  if (window.matchMedia('(hover: none)').matches) return;
  const cards = document.querySelectorAll('.skill-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = Math.round(((e.clientX - r.left) / r.width) * 100);
      const y = Math.round(((e.clientY - r.top) / r.height) * 100);
      card.style.setProperty('--holo-x', x);
      card.style.setProperty('--holo-y', y);

      // Subtle 3D tilt on skill card too
      const rx = ((y / 100) - 0.5) * 8;
      const ry = ((x / 100) - 0.5) * -8;
      card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.setProperty('--holo-x', 50);
      card.style.setProperty('--holo-y', 50);
    });
  });
}

/* ── 3D Perspective Project Cards ── */
function init3DProjectCards() {
  if (window.matchMedia('(hover: none)').matches) return;
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    let rafId;

    card.addEventListener('mousemove', (e) => {
      if (rafId) return; // throttle to rAF
      rafId = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        const xPct = (e.clientX - r.left) / r.width;
        const yPct = (e.clientY - r.top) / r.height;
        const rx = (yPct - 0.5) * -10;  // max ±5°
        const ry = (xPct - 0.5) * 10;
        card.style.transform =
          `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
        rafId = null;
      });
    });

    card.addEventListener('mouseleave', () => {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease';
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
}



/* ── Cosmic Canvas Cursor ── */
function initCustomCursor() {
  const canvas = document.getElementById('cosmicCursor');
  if (!canvas) return;
  if (window.matchMedia('(hover: none)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }, { passive: true });

  // ── State
  let mx = -500, my = -500;
  let visible = false;
  let isHovering = false;
  let angle = 0;          // reticle rotation
  let targetBracket = 22;     // how far bracket lines are from centre
  let curBracket = 22;

  // ── Palette (matches legendary-bg.js)
  const PALETTE = [
    [245, 100, 69],   // violet
    [165, 100, 55],   // cyan
    [300, 90, 65],   // magenta
    [32, 100, 60],   // amber
    [200, 100, 65],   // sky
  ];

  // ── Comet trail particles
  const TRAIL_MAX = 48;
  const trail = [];

  function addTrailParticle() {
    const pal = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    trail.push({
      x: mx, y: my,
      r: Math.random() * 2.4 + 0.8,
      life: 1,
      decay: 0.028 + Math.random() * 0.022,
      h: pal[0], s: pal[1], l: pal[2],
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
    });
    if (trail.length > TRAIL_MAX) trail.shift();
  }

  // ── Shockwave rings on click
  const shockwaves = [];
  document.addEventListener('click', (e) => {
    shockwaves.push({ x: e.clientX, y: e.clientY, r: 0, life: 1 });
  });

  // ── Interactive hover detection
  const INTERACTIVE = 'a, button, .btn, .project-card, .skill-card, .achievement-card, .activity-card, .social-icon, .navbar__link, .projects__filter-btn';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(INTERACTIVE)) { isHovering = true; targetBracket = 10; }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(INTERACTIVE)) { isHovering = false; targetBracket = 22; }
  });

  // ── Mouse tracking
  let trailTimer = 0;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    visible = true;
    // Spawn trail particle every 2 frames via mousemove
    trailTimer++;
    if (trailTimer % 2 === 0) addTrailParticle();
  }, { passive: true });
  document.addEventListener('mouseleave', () => { visible = false; });
  document.addEventListener('mouseenter', () => { visible = true; });

  // ── Draw reticle
  function drawReticle(x, y, bracketDist, alpha) {
    const bLen = 10;    // bracket arm length
    const center = 4;     // inner circle radius
    const outerR = bracketDist + bLen + 3;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.globalAlpha = alpha;

    // Outer faint circle
    ctx.beginPath();
    ctx.arc(0, 0, outerR, 0, Math.PI * 2);
    ctx.strokeStyle = `hsla(245,100%,69%,0.18)`;
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // 4 bracket corners (rotated 45° each quadrant)
    const corners = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
    corners.forEach(base => {
      const cos = Math.cos(base);
      const sin = Math.sin(base);
      const px = cos * bracketDist;
      const py = sin * bracketDist;

      ctx.strokeStyle = isHovering
        ? `hsla(165,100%,55%,0.95)` // cyan when hovering = lock-on
        : `hsla(245,100%,75%,0.9)`;  // violet default
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = isHovering ? 14 : 8;
      ctx.shadowColor = isHovering ? `hsla(165,100%,55%,0.8)` : `hsla(245,100%,69%,0.7)`;

      ctx.beginPath();
      // Horizontal arm
      ctx.moveTo(px, py);
      ctx.lineTo(px + cos * bLen, py);
      ctx.stroke();

      ctx.beginPath();
      // Vertical arm
      ctx.moveTo(px, py);
      ctx.lineTo(px, py + sin * bLen);
      ctx.stroke();
    });

    // Center dot glow
    const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, center + 3);
    grd.addColorStop(0, isHovering ? `hsla(165,100%,80%,${alpha})` : `hsla(245,100%,90%,${alpha})`);
    grd.addColorStop(1, 'transparent');
    ctx.shadowBlur = 20;
    ctx.shadowColor = isHovering ? `hsla(165,100%,55%,0.9)` : `hsla(245,100%,69%,0.9)`;
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(0, 0, center, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // ── Main render loop
  function render() {
    requestAnimationFrame(render);
    ctx.clearRect(0, 0, W, H);

    if (!visible) return;

    // Lerp bracket distance for smooth lock-on
    curBracket += (targetBracket - curBracket) * 0.1;
    angle += isHovering ? 0.015 : 0.008;  // faster spin on hover

    // ── Comet trail
    for (let i = trail.length - 1; i >= 0; i--) {
      const p = trail[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      if (p.life <= 0) { trail.splice(i, 1); continue; }

      const rNow = p.r * p.life;
      ctx.save();
      ctx.globalAlpha = p.life * 0.75;
      ctx.shadowBlur = 6;
      ctx.shadowColor = `hsl(${p.h},${p.s}%,${p.l}%)`;
      ctx.fillStyle = `hsl(${p.h},${p.s}%,${p.l}%)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, rNow, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // ── Shockwave rings
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const s = shockwaves[i];
      s.r += 4.5;
      s.life -= 0.03;
      if (s.life <= 0) { shockwaves.splice(i, 1); continue; }

      ctx.save();
      ctx.globalAlpha = s.life * 0.7;
      ctx.strokeStyle = `hsla(245,100%,72%,${s.life})`;
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 20;
      ctx.shadowColor = `hsla(245,100%,69%,0.6)`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.stroke();

      // Second inner ring (accent color)
      ctx.strokeStyle = `hsla(165,100%,50%,${s.life * 0.6})`;
      ctx.lineWidth = 0.8;
      ctx.shadowColor = `hsla(165,100%,50%,0.5)`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 0.6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // ── Reticle
    drawReticle(mx, my, curBracket, 1);
  }

  render();
}



/* ── Navbar Scroll Effect ── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Mobile Menu ── */
function initMobileMenu() {
  const toggle = document.querySelector('.navbar__toggle');
  const links = document.querySelector('.navbar__links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
    if (links.classList.contains('open')) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  });

  links.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });
}

/* ── Project Filters ── */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.projects__filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach((card, i) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 60);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });
}

/* ── Contact Form — Formspree Submission ── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.btn--primary');
    const originalHTML = submitBtn.innerHTML;
    const url = form.action;

    // Show loading state
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    const formData = new FormData(form);

    fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(async response => {
        if (response.ok) {
          submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
          submitBtn.style.background = 'linear-gradient(135deg, hsl(145, 80%, 45%), hsl(165, 100%, 42%))';
          submitBtn.style.opacity = '';
          form.reset();

          setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }, 4000);
        } else {
          // Attempt to parse JSON error, fallback to status text
          let errorMessage = `Status ${response.status}`;
          try {
            const data = await response.json();
            if (data && data.errors) {
              errorMessage = data.errors.map(err => err.message).join(", ");
            } else if (data && data.error) {
              errorMessage = data.error;
            }
          } catch (e) {
            errorMessage = `Server Error (${response.status}: ${response.statusText})`;
          }
          throw new Error(errorMessage);
        }
      })
      .catch((error) => {
        console.error('Contact Form Error:', error);
        submitBtn.innerHTML = `<span>Error: ${error.message.split(',')[0]}</span>`;
        submitBtn.style.background = 'linear-gradient(135deg, hsl(0, 80%, 50%), hsl(20, 100%, 45%))';
        submitBtn.style.opacity = '';

        setTimeout(() => {
          submitBtn.innerHTML = originalHTML;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 5000);
      });
  });
}

/* ── Current Year ── */
function initCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
/**
 * 8. Background Audio Toggle
 */
function initAudioToggle() {
  const audio = document.getElementById('bgAudio');
  const toggleBtn = document.getElementById('audioToggle');

  if (!audio || !toggleBtn) return;

  audio.volume = 0.3;

  const updateToggleState = () => {
    const isPlaying = !audio.paused;
    toggleBtn.classList.toggle('playing', isPlaying);
  };

  // Force play muted immediately
  setTimeout(() => {
    audio.play().then(() => {
      updateToggleState();
    }).catch(() => {
      updateToggleState();
    });
  }, 500);

  // Unmute on first interaction
  const unmute = () => {
    audio.muted = false;
    if (audio.paused) {
      audio.play().then(updateToggleState);
    }
  };

  document.body.addEventListener('click', unmute, { once: true });
  document.body.addEventListener('mousemove', unmute, { once: true });
  document.body.addEventListener('touchstart', unmute, { once: true });

  audio.onplaying = updateToggleState;
  audio.onpause = updateToggleState;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    audio.muted = false;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });
}

/* ── Back to Top ── */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Smooth Scroll handled by scroll.js ── */

/* ── Tilt effect on glass cards ── */
function initTiltCards() {
  if (window.matchMedia('(hover: none)').matches) return;

  const cards = document.querySelectorAll('.project-card, .skill-card, .achievement-card, .activity-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
}

/* ── Active Nav Link Highlighting ── */
function setActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-30% 0px -70% 0px' }
  );

  sections.forEach(section => observer.observe(section));
}

window.addEventListener('load', setActiveNavLink);