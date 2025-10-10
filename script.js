// Bouton contact
document.getElementById('contactBtn').addEventListener('click', () => {
  alert('Merci pour ton intérêt ! 😊 Envoie-moi un mail à : mascret.clement@gmail.com');
});

// Fade-in scroll
const faders = document.querySelectorAll('.fade');
const appearOptions = { threshold: 0.2 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// Toggle carte À propos
const toggleBtn = document.getElementById('toggleAbout');
const aboutCard = document.getElementById('aboutCard');
toggleBtn.addEventListener('click', () => {
  aboutCard.classList.toggle('collapsed');
  toggleBtn.textContent = aboutCard.classList.contains('collapsed') ? '⬇️' : '⬆️';
});

// Thème clair / sombre
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  themeToggle.textContent = '☀️';
}
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

