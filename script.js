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

// Musique
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
bgMusic.volume = 0.2;

// Lecture auto si activée précédemment
if (localStorage.getItem('music') === 'on') {
  bgMusic.play().catch(() => {});
  musicToggle.classList.add('playing');
  musicToggle.textContent = '🔇';
}

// Clic sur le bouton musique
musicToggle.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.classList.add('playing');
    musicToggle.textContent = '🔇';
    localStorage.setItem('music', 'on');
  } else {
    bgMusic.pause();
    musicToggle.classList.remove('playing');
    musicToggle.textContent = '🎧';
    localStorage.setItem('music', 'off');
  }
});

// S’assure que la musique démarre après 1er clic utilisateur
document.body.addEventListener('click', () => {
  if (localStorage.getItem('music') === 'on' && bgMusic.paused) {
    bgMusic.play().catch(() => {});
  }
}, { once: true });
