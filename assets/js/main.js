// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Mobile hamburger ──
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');
hamburger.addEventListener('click', () => navLinksEl.classList.toggle('open'));
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinksEl.classList.remove('open'));
});

// ── Active nav on scroll ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => sectionObs.observe(s));

// ── Scroll reveal with stagger ──
const revealEls = document.querySelectorAll(
  '.skill-card, .proj-card, .xp-item, .edu-entry, .role-item, .achieve-item, .contact-item, .astat'
);
revealEls.forEach((el, i) => {
  el.dataset.ri = i;
  el.classList.add('reveal');
});
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = (parseInt(entry.target.dataset.ri) % 5) * 75;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

// ── Marquee pause on hover ──
const marqueeSection = document.querySelector('.marquee-section');
const marqueeInner = document.getElementById('marquee-inner');
if (marqueeSection && marqueeInner) {
  marqueeSection.addEventListener('mouseenter', () => marqueeInner.style.animationPlayState = 'paused');
  marqueeSection.addEventListener('mouseleave', () => marqueeInner.style.animationPlayState = 'running');
}
