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
