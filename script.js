document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  // Scroll-spy: highlight the nav link for the section in view
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length && navAnchors.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navAnchors.forEach((a) => {
              a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => spy.observe(s));
  }

  // Certificate lightbox
  const credImg = document.getElementById('credentialImg');
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightboxClose');

  if (credImg && lightbox && lightboxClose) {
    const open = () => { lightbox.hidden = false; };
    const close = () => { lightbox.hidden = true; };

    credImg.addEventListener('click', open);
    lightboxClose.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  // Typewriter
  const phrases = ['code', 'play games', 'watch movies'];
  const el = document.getElementById('typewriter');
  const typeSpeed = 90;
  const pauseAfterType = 1100;
  const pauseAfterDelete = 400;
  let phraseIndex = 0;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function typeLoop() {
    while (true) {
      const word = phrases[phraseIndex];

      for (let i = 1; i <= word.length; i++) {
        el.textContent = word.slice(0, i);
        await sleep(typeSpeed);
      }
      await sleep(pauseAfterType);

      for (let i = word.length; i >= 0; i--) {
        el.textContent = word.slice(0, i);
        await sleep(typeSpeed);
      }
      await sleep(pauseAfterDelete);

      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  if (el) typeLoop();
});
