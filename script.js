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

// ---- Search Engine ----
const modal = document.getElementById("searchModal");
const openBtn = document.getElementById("openSearch");
const closeBtn = document.getElementById("closeModal");

openBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

document.getElementById("runSearch").addEventListener("click", async () => {
  const query = document.getElementById("queryInput").value;
  const zone = document.getElementById("resultsZone");

  zone.innerHTML = "<p>⏳ Recherche...</p>";

  const res = await fetch("https://search-api.vercel.app/search?q=" + encodeURIComponent(query));

  const data = await res.json();

  if (!data.length) {
    zone.innerHTML = "<p>Aucun résultat trouvé ❌</p>";
    return;
  }

  zone.innerHTML = data.map(result => `
    <div class="project-card">
      <h3>${result.title}</h3>
      <a href="${result.url}" target="_blank" class="btn">Ouvrir</a>
    </div>
  `).join("");
});

const EXA_KEY = "21888cd4-da96-4a6a-aa24-1707e30a8ad3";

async function runSearch(query) {
  const response = await fetch("https://api.exa.ai/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": EXA_KEY
    },
    body: JSON.stringify({
      query: query,
      type: "keyword",
      numResults: 5
    })
  });

  const data = await response.json();
  return data.results;
}

