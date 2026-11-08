(() => {
  const header = document.querySelector('#header');
  const menu = document.querySelector('#menu');
  const menuButton = document.querySelector('.menu-button');

  document.querySelectorAll('.to-top').forEach(button => button.remove());

  const professionalNavLabels = {
    'zanzibar-tours-&-excursions.html': 'Zanzibar Tours',
    'tanzania-safaris.html': 'Tanzania Safaris',
    'our-services.html': 'Our Services'
  };
  menu?.querySelectorAll(':scope > a').forEach(link => {
    const label = professionalNavLabels[link.getAttribute('href')];
    if (label) link.textContent = label;
  });

  document.querySelectorAll('.footer-column').forEach(column => {
    const heading = column.querySelector('h3')?.textContent.trim().toLowerCase();
    if (heading === 'quick links') {
      column.querySelector('a[href="index.html"]')?.remove();
    }
  });

  document.querySelectorAll('.tour-booking-card').forEach(card => {
    const whatsappButton = card.querySelector('a.btn[href*="wa.me"]');
    if (whatsappButton && !card.querySelector('.tour-contact-button')) {
      const contactButton = document.createElement('a');
      contactButton.className = 'tour-contact-button';
      contactButton.href = 'contact.html';
      contactButton.innerHTML = 'Contact us <i class="bi bi-envelope"></i>';
      whatsappButton.after(contactButton);
    }
  });

  const whatsappButton = document.querySelector('.float-wa');
  if (whatsappButton && !document.querySelector('.float-email')) {
    const emailButton = document.createElement('a');
    emailButton.className = 'float-email';
    emailButton.href = 'mailto:fulltimezanzibar94@gmail.com';
    emailButton.setAttribute('aria-label', 'Email Full Time Zanzibar');
    emailButton.innerHTML = '<i class="bi bi-envelope"></i>';
    whatsappButton.before(emailButton);
  }

  document.querySelectorAll('.footer .social').forEach(social => {
    if (!social.querySelector('[data-social="youtube"]')) {
      const youtubeLink = document.createElement('a');
      youtubeLink.href = 'https://youtube.com/@fulltimezanzibar?si=4FYu-g5027VN0UyN';
      youtubeLink.target = '_blank';
      youtubeLink.rel = 'noopener';
      youtubeLink.dataset.social = 'youtube';
      youtubeLink.setAttribute('aria-label', 'YouTube');
      youtubeLink.innerHTML = '<i class="bi bi-youtube"></i>';
      social.appendChild(youtubeLink);
    }
  });

  // Keep display headings clean and consistent across every page.
  document.querySelectorAll('h1, h2, h3').forEach(heading => {
    const textNodes = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    let textNode;
    while ((textNode = textNodes.nextNode())) {
      textNode.nodeValue = textNode.nodeValue.replace(/\./g, '');
    }
  });

  // One compact navigation menu for useful secondary pages and tour collections.
  let navMore;
  if (menu && !menu.querySelector('.nav-more')) {
    const servicesLink = menu.querySelector('a[href="our-services.html"]');
    if (servicesLink) {
      navMore = document.createElement('div');
      navMore.className = 'nav-more';
      navMore.innerHTML = `<button class="nav-more-toggle" type="button" aria-expanded="false">
        Explore <i class="bi bi-chevron-down" aria-hidden="true"></i>
      </button>
      <div class="nav-more-menu">
        <a href="zanzibar-multi-day-tour-packages.html">Zanzibar multi-day packages</a>
        <a href="tanzania-safaris.html">Tanzania safari packages</a>
        <a href="zanzibar-south-tours.html">South Zanzibar tours</a>
        <a href="zanzibar-north-tours.html">North Zanzibar tours</a>
        <a href="zanzibar-town-area-tours.html">Town area tours</a>
        <a href="video_and_gallery.html">Video &amp; gallery</a>
        <a href="car-rental.html">Car rental</a>
        <a href="faq.html">FAQs</a>
      </div>`;
      servicesLink.after(navMore);

      const currentPage = location.pathname.split('/').pop() || 'index.html';
      const hasCurrentPage = [...navMore.querySelectorAll('a')]
        .some(link => link.getAttribute('href') === currentPage);
      navMore.classList.toggle('current', hasCurrentPage);

      const moreToggle = navMore.querySelector('.nav-more-toggle');
      moreToggle.addEventListener('click', event => {
        event.stopPropagation();
        const open = navMore.classList.toggle('open');
        moreToggle.setAttribute('aria-expanded', String(open));
      });

      document.addEventListener('click', event => {
        if (!navMore.contains(event.target)) {
          navMore.classList.remove('open');
          moreToggle.setAttribute('aria-expanded', 'false');
        }
      });

      document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
          navMore.classList.remove('open');
          moreToggle.setAttribute('aria-expanded', 'false');
          moreToggle.focus();
        }
      });
    }
  }

  if (menu && !menu.querySelector('.mobile-nav-meta')) {
    const meta = document.createElement('div');
    meta.className = 'mobile-nav-meta';
    meta.innerHTML = `<div class="mobile-nav-social">
      <a href="https://www.facebook.com/share/19521iXVGB/" target="_blank" rel="noopener" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
      <a href="https://www.instagram.com/zanzibarfulltime" target="_blank" rel="noopener" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
      <a href="https://wa.me/255776078745" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="bi bi-whatsapp"></i></a>
      <a href="https://youtube.com/@fulltimezanzibar?si=4FYu-g5027VN0UyN" target="_blank" rel="noopener" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
    </div><div class="mobile-nav-rating"><span>&#9733;&#9733;&#9733;&#9733;&#9733;</span><small>5.0 on TripAdvisor</small></div>`;
    menu.appendChild(meta);
  }

  const filmVideo = document.querySelector('.film video[autoplay]');
  const filmSource = filmVideo?.querySelector('source[data-src]');
  if (filmVideo && filmSource) {
    const loadFilm = () => {
      filmSource.src = filmSource.dataset.src;
      filmSource.removeAttribute('data-src');
      filmVideo.load();
    };

    if ('IntersectionObserver' in window) {
      const filmObserver = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          loadFilm();
          filmObserver.disconnect();
        }
      }, {rootMargin: '300px'});
      filmObserver.observe(filmVideo);
    } else {
      loadFilm();
    }
  }

  const scrollState = () => {
    header?.classList.toggle('stuck', scrollY > 80);
  };

  menuButton?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    document.body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open');
    navMore?.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    navMore?.querySelector('.nav-more-toggle')?.setAttribute('aria-expanded', 'false');
  }));

  const contactPlanner = document.querySelector('#contact-planner');
  if (contactPlanner) {
    const buildContactMessage = () => {
      const name = contactPlanner.querySelector('#name')?.value.trim() || 'Not provided';
      const email = contactPlanner.querySelector('#email')?.value.trim() || 'Not provided';
      const date = contactPlanner.querySelector('#date')?.value || 'Not decided yet';
      const group = contactPlanner.querySelector('#group')?.value || 'Not provided';
      const interest = contactPlanner.querySelector('#interest')?.value || 'Not provided';
      const details = contactPlanner.querySelector('#message')?.value.trim() || 'No additional details provided.';
      return `Hello Full Time Zanzibar,\n\nI would like help planning my trip.\n\nName: ${name}\nEmail: ${email}\nTravel date: ${date}\nGroup size: ${group}\nInterested in: ${interest}\n\nMore details:\n${details}`;
    };

    contactPlanner.addEventListener('submit', event => {
      event.preventDefault();
      window.open(`https://wa.me/255776078745?text=${encodeURIComponent(buildContactMessage())}`, '_blank', 'noopener');
    });

    contactPlanner.querySelector('.contact-email-submit')?.addEventListener('click', () => {
      if (!contactPlanner.reportValidity()) return;
      const subject = 'Travel plan enquiry — Full Time Zanzibar';
      window.location.href = `mailto:fulltimezanzibar94@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildContactMessage())}`;
    });
  }

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), {threshold: .1});
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
  addEventListener('scroll', scrollState, {passive: true});
  scrollState();
})();
