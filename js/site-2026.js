const menuButton = document.querySelector('.menu-toggle');
const menuLinks = document.querySelectorAll('.primary-nav a');

function closeMenu() {
  document.body.classList.remove('menu-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}

menuButton?.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

menuLinks.forEach((link) => link.addEventListener('click', closeMenu));

const revealItems = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8%', threshold: 0.08 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const lightbox = document.querySelector('[data-lightbox-dialog]');
const lightboxImage = lightbox?.querySelector('img');
const lightboxClose = lightbox?.querySelector('[data-lightbox-close]');

function closeLightbox() {
  if (!lightbox?.open) return;
  lightbox.close();
  document.body.classList.remove('lightbox-open');
}

document.querySelectorAll('[data-lightbox]').forEach((button) => {
  button.addEventListener('click', () => {
    const sourceImage = button.querySelector('img');
    lightboxImage.src = button.dataset.lightbox;
    lightboxImage.alt = sourceImage?.alt || 'Portfolio photograph';
    document.body.classList.add('lightbox-open');
    lightbox.showModal();
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
lightbox?.addEventListener('close', () => document.body.classList.remove('lightbox-open'));
