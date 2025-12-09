// ---- Bouton contact ----
document.getElementById('contactBtn').addEventListener('click', () => {
  window.location.href = "mailto:mascret.clement@gmail.com?subject=Contact Portfolio";
});

// ---- Fade-in scroll ----
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

// ---- Toggle carte À propos ----
const toggleBtn = document.getElementById('toggleAbout');
const aboutCard = document.getElementById('aboutCard');
toggleBtn.addEventListener('click', () => {
  aboutCard.classList.toggle('collapsed');
  toggleBtn.textContent = aboutCard.classList.contains('collapsed') ? '⬇️' : '⬆️';
});

// ---- Thème clair / sombre ----
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

// ---- Search Engine avec API Exa ----
const EXA_KEY = "21888cd4-da96-4a6a-aa24-1707e30a8ad3";

const modal = document.getElementById("searchModal");
const openBtn = document.getElementById("openSearch");
const closeBtn = document.getElementById("closeModal");
const runBtn = document.getElementById("runSearch");
const queryInput = document.getElementById("queryInput");
const resultsZone = document.getElementById("resultsZone");

// Ouvrir / fermer modale
openBtn.addEventListener("click", () => modal.style.display = "flex");
closeBtn.addEventListener("click", () => modal.style.display = "none");

// Fonction pour rechercher avec Exa API
async function runSearch(query) {
  resultsZone.innerHTML = "<p>⏳ Recherche...</p>";
  
  try {
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

    if (!data.results || data.results.length === 0) {
      resultsZone.innerHTML = "<p>Aucun résultat trouvé ❌</p>";
      return;
    }

    resultsZone.innerHTML = data.results.map(result => `
      <div class="project-card">
        <h3>${result.title}</h3>
        <p>${result.snippet || ""}</p>
        <a href="${result.url}" target="_blank" class="btn">Ouvrir</a>
      </div>
    `).join("");
  } catch (error) {
    console.error(error);
    resultsZone.innerHTML = "<p>Erreur lors de la recherche ❌</p>";
  }
}

// Bouton rechercher
runBtn.addEventListener("click", () => {
  const query = queryInput.value.trim();
  if (!query) return;
  runSearch(query);
});

window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

