document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.tour-gallery');
  if (!gallery) return;

  const items = [...gallery.querySelectorAll('button img')];
  if (!items.length) return;

  gallery.querySelectorAll('button').forEach((button, index) => {
    button.setAttribute('aria-label', `Open image ${index + 1} of ${items.length}`);
    button.setAttribute('aria-haspopup', 'dialog');
  });

  const lightbox = document.createElement('div');
  lightbox.className = 'tour-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Tour image gallery');
  lightbox.innerHTML = `
    <button class="tour-lightbox-close" type="button" aria-label="Close gallery"><i class="bi bi-x-lg"></i></button>
    <figure><img src="" alt=""><figcaption><small></small></figcaption></figure>
    <div class="tour-lightbox-controls">
      <button class="tour-lightbox-nav tour-lightbox-prev" type="button" aria-label="Previous image"><i class="bi bi-chevron-left"></i></button>
      <button class="tour-lightbox-nav tour-lightbox-next" type="button" aria-label="Next image"><i class="bi bi-chevron-right"></i></button>
    </div>`;
  document.body.appendChild(lightbox);

  const fullImage = lightbox.querySelector('figure img');
  const counter = lightbox.querySelector('figcaption small');
  const closeButton = lightbox.querySelector('.tour-lightbox-close');
  const previousButton = lightbox.querySelector('.tour-lightbox-prev');
  const nextButton = lightbox.querySelector('.tour-lightbox-next');
  let currentIndex = 0;
  let previousFocus = null;
  let touchStartX = 0;

  const showImage = index => {
    currentIndex = (index + items.length) % items.length;
    const source = items[currentIndex];
    fullImage.src = source.currentSrc || source.src;
    fullImage.alt = source.alt;
    counter.textContent = `${currentIndex + 1} / ${items.length}`;
  };

  const openGallery = index => {
    previousFocus = document.activeElement;
    showImage(index);
    lightbox.classList.add('open');
    document.body.classList.add('lightbox-open');
    closeButton.focus();
  };

  const closeGallery = () => {
    lightbox.classList.remove('open');
    document.body.classList.remove('lightbox-open');
    if (previousFocus) previousFocus.focus();
  };

  gallery.querySelectorAll('button').forEach((button, index) => button.addEventListener('click', () => openGallery(index)));
  previousButton.addEventListener('click', () => showImage(currentIndex - 1));
  nextButton.addEventListener('click', () => showImage(currentIndex + 1));
  closeButton.addEventListener('click', closeGallery);
  lightbox.addEventListener('click', event => { if (event.target === lightbox) closeGallery(); });
  lightbox.addEventListener('touchstart', event => { touchStartX = event.changedTouches[0].clientX; }, {passive:true});
  lightbox.addEventListener('touchend', event => {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 50) showImage(currentIndex + (distance < 0 ? 1 : -1));
  }, {passive:true});
  document.addEventListener('keydown', event => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') closeGallery();
    if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (event.key === 'ArrowRight') showImage(currentIndex + 1);
  });
});
