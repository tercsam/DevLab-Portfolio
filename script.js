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

// --- Musique d'ambiance ---
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
bgMusic.volume = 0.2;

// Fonction d'update visuelle
function updateMusicButton(isPlaying) {
  if (isPlaying) {
    musicToggle.classList.add('playing');
    musicToggle.textContent = '🔇';
  } else {
    musicToggle.classList.remove('playing');
    musicToggle.textContent = '🎧';
  }
}

// Lecture avec gestion d'erreur
async function tryPlayMusic() {
  try {
    await bgMusic.play();
    updateMusicButton(true);
    localStorage.setItem('music', 'on');
  } catch (err) {
    console.warn('Lecture bloquée par le navigateur : interaction requise.');
    updateMusicButton(false);
  }
}

// Pause musique
function stopMusic() {
  bgMusic.pause();
  updateMusicButton(false);
  localStorage.setItem('music', 'off');
}

// Charger la préférence utilisateur
if (localStorage.getItem('music') === 'on') {
  tryPlayMusic();
} else {
  updateMusicButton(false);
}

// Clic sur le bouton 🎧 / 🔇
musicToggle.addEventListener('click', () => {
  if (bgMusic.paused) {
    tryPlayMusic();
  } else {
    stopMusic();
  }
});

// Certains navigateurs nécessitent un premier clic sur le document
document.body.addEventListener('click', () => {
  if (localStorage.getItem('music') === 'on' && bgMusic.paused) {
    tryPlayMusic();
  }
}, { once: true });
