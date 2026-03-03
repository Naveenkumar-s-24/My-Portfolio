/* ============================================
   PROJECT DETAILS MODAL + GALLERY LIGHTBOX
   ============================================ */

(function () {
    'use strict';

    /* ── Project details modal HTML ── */
    const modalHTML = `
        <div id="project-modal" class="project-modal">
            <div class="project-modal__overlay"></div>
            <div class="project-modal__content">
                <button class="project-modal__close" aria-label="Close">&times;</button>
                <div class="project-modal__body">
                    <h2 class="project-modal__title"></h2>
                    <p class="project-modal__description"></p>
                    
                    <div class="project-modal__section">
                        <h3>Key Features</h3>
                        <ul class="project-modal__features"></ul>
                    </div>
                    
                    <div class="project-modal__section">
                        <h3>Technologies Used</h3>
                        <div class="project-modal__tech"></div>
                    </div>
                    
                    <div class="project-modal__section">
                        <h3>Challenges &amp; Solutions</h3>
                        <p class="project-modal__challenges"></p>
                    </div>
                    
                    <div class="project-modal__section">
                        <h3>Impact</h3>
                        <p class="project-modal__impact"></p>
                    </div>
                    
                    <div class="project-modal__actions"></div>
                </div>
            </div>
        </div>
    `;

    /* ── Gallery lightbox HTML ── */
    const galleryHTML = `
        <div id="project-gallery" class="pg-gallery">
            <div class="pg-gallery__overlay"></div>
            <button class="pg-gallery__close" aria-label="Close">&times;</button>

            <div class="pg-gallery__main">
                <button class="pg-gallery__nav pg-gallery__nav--prev" aria-label="Previous">&#8592;</button>
                <div class="pg-gallery__stage">
                    <img class="pg-gallery__img" src="" alt="" />
                    <div class="pg-gallery__counter"></div>
                </div>
                <button class="pg-gallery__nav pg-gallery__nav--next" aria-label="Next">&#8594;</button>
            </div>

            <div class="pg-gallery__thumbs"></div>
        </div>
    `;

    /* ── Inject both into DOM ── */
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.insertAdjacentHTML('beforeend', galleryHTML);

    /* ────────────────────────────────
       PROJECT DETAILS MODAL
    ─────────────────────────────────*/
    const modal = document.getElementById('project-modal');
    const overlay = modal.querySelector('.project-modal__overlay');
    const closeBtn = modal.querySelector('.project-modal__close');

    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    window.openProjectModal = function (projectId) {
        const details = projectDetails[projectId];
        if (!details) return;

        modal.querySelector('.project-modal__title').textContent = details.title;
        modal.querySelector('.project-modal__description').textContent = details.description;

        const featuresList = modal.querySelector('.project-modal__features');
        featuresList.innerHTML = details.features.map(f => `<li>${f}</li>`).join('');

        const techContainer = modal.querySelector('.project-modal__tech');
        techContainer.innerHTML = details.tech.map(t => `<span class="chip">${t}</span>`).join('');

        modal.querySelector('.project-modal__challenges').textContent = details.challenges;
        modal.querySelector('.project-modal__impact').textContent = details.impact;

        /* ── Actions row ── */
        const actionsEl = modal.querySelector('.project-modal__actions');
        actionsEl.innerHTML = '';

        /* Clone existing card links (GitHub etc.) */
        const card = document.querySelector(`[data-project="${projectId}"]`);
        const links = card?.querySelector('.project-card__links')?.cloneNode(true);
        if (links) {
            /* Remove the "More Details" button from the clone */
            links.querySelectorAll('.btn').forEach(btn => {
                if (btn.textContent.includes('More Details')) btn.remove();
            });
            actionsEl.appendChild(links);
        }

        /* Gallery button – only if images exist for this project */
        if (details.gallery && details.gallery.length > 0) {
            const galleryBtn = document.createElement('button');
            galleryBtn.className = 'btn btn--outline';
            galleryBtn.innerHTML = '<span>View Gallery →</span>';
            galleryBtn.onclick = (e) => {
                e.preventDefault();
                openGallery(details.gallery, details.title);
            };
            actionsEl.appendChild(galleryBtn);
        }

        modal.classList.add('active');
        document.body.classList.add('no-scroll');
    };

    /* ────────────────────────────────
       GALLERY LIGHTBOX
    ─────────────────────────────────*/
    const gallery = document.getElementById('project-gallery');
    const galOverlay = gallery.querySelector('.pg-gallery__overlay');
    const galClose = gallery.querySelector('.pg-gallery__close');
    const galImg = gallery.querySelector('.pg-gallery__img');
    const galCounter = gallery.querySelector('.pg-gallery__counter');
    const galThumbs = gallery.querySelector('.pg-gallery__thumbs');
    const galPrev = gallery.querySelector('.pg-gallery__nav--prev');
    const galNext = gallery.querySelector('.pg-gallery__nav--next');

    let galImages = [];
    let galIndex = 0;

    function showImage(index) {
        galIndex = (index + galImages.length) % galImages.length;
        galImg.style.opacity = '0';
        setTimeout(() => {
            galImg.src = galImages[galIndex];
            galImg.alt = `Screenshot ${galIndex + 1}`;
            galCounter.textContent = `${galIndex + 1} / ${galImages.length}`;
            galImg.style.opacity = '1';
        }, 180);

        /* Highlight active thumb */
        galThumbs.querySelectorAll('.pg-gallery__thumb').forEach((t, i) => {
            t.classList.toggle('active', i === galIndex);
        });
    }

    function openGallery(images, title) {
        galImages = images;

        /* Build thumbnails */
        galThumbs.innerHTML = images.map((src, i) =>
            `<img class="pg-gallery__thumb${i === 0 ? ' active' : ''}"
                  src="${src}" alt="Screenshot ${i + 1}"
                  data-index="${i}" />`
        ).join('');

        galThumbs.querySelectorAll('.pg-gallery__thumb').forEach(thumb => {
            thumb.addEventListener('click', () => showImage(+thumb.dataset.index));
        });

        showImage(0);
        gallery.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    function closeGallery() {
        gallery.classList.remove('active');
        document.body.classList.add('no-scroll'); /* keep modal scroll lock */
    }

    galClose.addEventListener('click', closeGallery);
    galOverlay.addEventListener('click', closeGallery);
    galPrev.addEventListener('click', () => showImage(galIndex - 1));
    galNext.addEventListener('click', () => showImage(galIndex + 1));

    /* Keyboard nav for gallery */
    document.addEventListener('keydown', (e) => {
        if (!gallery.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') showImage(galIndex - 1);
        if (e.key === 'ArrowRight') showImage(galIndex + 1);
        if (e.key === 'Escape') closeGallery();
    });

    /* Touch swipe support */
    let touchStartX = 0;
    gallery.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    gallery.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(dx) > 50) showImage(dx < 0 ? galIndex + 1 : galIndex - 1);
    });

    /* ────────────────────────────────
       INIT CARDS
    ─────────────────────────────────*/
    function initProjectCards() {
        const cards = document.querySelectorAll('.project-card');
        const projectIds = [
            'footwear-qc', 'metrops', 'cueblink', 'dropnex',
            'fusion-circle', 'crop-codex', 'decentralized-media', 'northern-lights',
            'culina', 'whatsapp-clone'
        ];

        cards.forEach((card, index) => {
            const projectId = projectIds[index];
            card.setAttribute('data-project', projectId);

            const linksSection = card.querySelector('.project-card__links');
            const detailsBtn = document.createElement('button');
            detailsBtn.className = 'btn btn--ghost';
            detailsBtn.innerHTML = '<span>More Details →</span>';
            detailsBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                openProjectModal(projectId);
            };
            linksSection.appendChild(detailsBtn);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProjectCards);
    } else {
        initProjectCards();
    }
})();
