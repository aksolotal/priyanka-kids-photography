const collage = document.querySelector('[data-collage]');

if (collage) {
  const collageSources = [
    'Pic1.jpeg', 'Pic2.webp', 'Pic3.jpeg', 'Pic4.webp', 'Pic5.jpeg',
    ...Array.from({ length: 45 }, (_, index) => `images/priyanka-kids-photography/${index + 1}.webp`)
  ];

  collageSources.forEach((source, index) => {
    const tile = document.createElement('figure');
    const image = document.createElement('img');
    const baseTilt = (Math.random() * 5 - 2.5).toFixed(2);

    tile.className = 'collage-tile';
    tile.style.setProperty('--base-tilt', `${baseTilt}deg`);
    tile.style.setProperty('--tile-delay', `${(index % 8) * 35}ms`);
    image.alt = 'Priyanka Kids Photography portrait';
    image.loading = 'lazy';
    image.src = source;
    tile.append(image);
    collage.append(tile);

    tile.addEventListener('mouseenter', () => {
      const hoverTilt = (Math.random() * 14 - 7).toFixed(2);
      tile.style.setProperty('--hover-tilt', `${hoverTilt}deg`);
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));
