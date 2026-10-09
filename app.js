const capsuleItems = [
  { name: "Wide-Leg-Jeans", detail: "hellblau · casual", icon: "♢", color: "#afc4d0", tags: ["light"] },
  { name: "Stoffhose", detail: "schwarz · schick", icon: "◇", color: "#3b403e", tags: ["dark"] },
  { name: "Lederleggings", detail: "schwarz · edgy", icon: "◐", color: "#242625", tags: ["dark"] },
  { name: "Shorts", detail: "schwarz · feminin", icon: "◫", color: "#797b78", tags: ["dark"] },
  { name: "Weißes Top", detail: "clean · vielseitig", icon: "○", color: "#eee8df", tags: ["light"] },
  { name: "Longsleeve", detail: "schwarz · warm", icon: "●", color: "#424440", tags: ["dark"] },
  { name: "Braunes T-Shirt", detail: "warm · lässig", icon: "◒", color: "#9a6d52", tags: ["dark"] },
  { name: "Creme-Pullover", detail: "weich · oversized", icon: "⌁", color: "#e1d3c0", tags: ["light", "layer"] },
  { name: "Oversized-Hemd", detail: "weiß · Layer", icon: "⌇", color: "#e8e4dc", tags: ["light", "layer"] },
  { name: "Rosa Blazer", detail: "feminin · smart", icon: "✦", color: "#d6a6a7", tags: ["light", "layer"] },
  { name: "Schwarzer Blazer", detail: "clean · elegant", icon: "✧", color: "#323534", tags: ["dark", "layer"] },
  { name: "Lederjacke", detail: "schwarz · cool", icon: "◈", color: "#1d1f1e", tags: ["dark", "layer"] },
  { name: "Strickjacke", detail: "creme · gemütlich", icon: "≈", color: "#d6c6ae", tags: ["light", "layer"] },
  { name: "Regenjacke", detail: "wind- & wetterfest", icon: "☂", color: "#758077", tags: ["dark", "layer"] },
  { name: "Thermostrumpfhose", detail: "80 DEN · warm", icon: "◑", color: "#524946", tags: ["dark"] },
  { name: "Schwarze Cap", detail: "sporty · casual", icon: "⌒", color: "#2b2d2c", tags: ["dark"] }
];

const defaultCategories = {
  capsule: { title: "Capsule", icon: "✦", items: capsuleItems.map(item => item.name) },
  basics: { title: "Basics", icon: "◌", items: ["Unterwäsche", "Socken", "Schlafsachen", "BHs", "Waschbeutel", "Wäschebeutel"] },
  beauty: { title: "Beauty & Pflege", icon: "♡", items: ["Zahnbürste", "Zahnpasta", "Make-up", "Abschminkzeug", "Gesichtspflege", "Deo", "Shampoo", "Bürste", "Föhn"] },
  technik: { title: "Technik", icon: "⌁", items: ["Handy-Ladekabel", "Kopfhörer", "Powerbank"] },
  dokumente: { title: "Unterwegs", icon: "→", items: ["Portemonnaie", "Ausweis", "Schlüssel", "Medikamente", "Trinkflasche", "Regenschirm"] }
};

const weatherData = {
  mild: {
    label: "Mild", icon: "☀", temp: "13–17 °C",
    summary: "Leichte Layer reichen. Nutze Blazer und Hemd als variable Außenschicht und lass die dicken Teile im Koffer.",
    outfits: [
      { mood: "Light Casual", name: "Bremen Bright", pieces: ["Wide-Leg-Jeans", "Weißes Top", "Rosa Blazer", "Weiße Sneaker"] },
      { mood: "Sporty Chic", name: "Range Rover Mami", pieces: ["Sportleggings", "Weißes Top", "Schwarzer Blazer", "Cap + Sneaker"] },
      { mood: "Relaxed", name: "Soft Layer", pieces: ["Braunes T-Shirt", "Oversized-Hemd", "Stoffhose", "Sneaker"] }
    ]
  },
  kuehl: {
    label: "Kühl", icon: "◒", temp: "8–12 °C",
    summary: "Jetzt zählt das Zwiebelprinzip: Longsleeve oder Hemd unter Strick, geschlossene Schuhe und eine Jacke darüber.",
    outfits: [
      { mood: "Hell & Warm", name: "Cream & Denim", pieces: ["Wide-Leg-Jeans", "Creme-Pullover", "Lederjacke", "Sneaker"] },
      { mood: "Dark Smart", name: "City Black", pieces: ["Stoffhose", "Schwarzes Longsleeve", "Schwarzer Blazer", "Boots"] },
      { mood: "Feminine", name: "Shorts im Herbst", pieces: ["Shorts", "Thermostrumpfhose", "Creme-Pullover", "Boots"] }
    ]
  },
  regen: {
    label: "Regen", icon: "☂", temp: "wechselhaft",
    summary: "Empfindliches Wildleder bleibt geschützt. Die wetterfeste Jacke ist die äußere Schicht; darunter darf der Look trotzdem schick bleiben.",
    outfits: [
      { mood: "Rain Ready", name: "Practical Chic", pieces: ["Stoffhose", "Weißes Top", "Strickjacke", "Regenjacke"] },
      { mood: "Sporty", name: "City Walk", pieces: ["Sportleggings", "Creme-Pullover", "Regenjacke", "Cap"] },
      { mood: "Light Mix", name: "Cloudy Pastels", pieces: ["Wide-Leg-Jeans", "Longsleeve", "Rosa Blazer", "Regenjacke"] }
    ]
  },
  kalt: {
    label: "Kalt & windig", icon: "❄", temp: "4–8 °C",
    summary: "Mehrere dünne Schichten wärmen besser. Thermostrumpfhose, Longsleeve und Strick werden zu deinen wichtigsten Bausteinen.",
    outfits: [
      { mood: "Layered", name: "Warm in Black", pieces: ["Lederleggings", "Longsleeve", "Creme-Pullover", "Lederjacke"] },
      { mood: "Smart Warm", name: "Office Layer", pieces: ["Stoffhose", "Oversized-Hemd", "Strickjacke", "Regenjacke"] },
      { mood: "Feminine", name: "Tights & Texture", pieces: ["Shorts", "Thermostrumpfhose", "Longsleeve", "Blazer + Jacke"] }
    ]
  }
};

const storageKey = "capsule-companion-v1";
let saved = JSON.parse(localStorage.getItem(storageKey) || "null") || { checked: {}, custom: {} };
let activeCategory = "capsule";
let activeWeather = "mild";

function save() { localStorage.setItem(storageKey, JSON.stringify(saved)); }
function itemId(category, item) { return `${category}:${item}`; }
function categoryItems(key) { return [...defaultCategories[key].items, ...(saved.custom[key] || [])]; }

function renderCapsule(filter = "all") {
  const grid = document.getElementById("capsuleGrid");
  grid.innerHTML = capsuleItems.map(item => `
    <article class="capsule-card ${filter !== "all" && !item.tags.includes(filter) ? "hidden" : ""}">
      <span class="item-icon">${item.icon}</span>
      <h3>${item.name}</h3><p>${item.detail}</p>
      <span class="swatch" style="background:${item.color}"></span>
    </article>`).join("");
}

function renderCategories() {
  document.getElementById("categoryTabs").innerHTML = Object.entries(defaultCategories).map(([key, category]) => {
    const items = categoryItems(key);
    const count = items.filter(item => saved.checked[itemId(key, item)]).length;
    return `<button class="category-tab ${key === activeCategory ? "active" : ""}" data-category="${key}"><span>${category.icon} &nbsp;${category.title}</span><span class="count">${count}/${items.length}</span></button>`;
  }).join("");
  document.querySelectorAll(".category-tab").forEach(button => button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    renderPacking();
  }));
}

function renderPacking() {
  renderCategories();
  const category = defaultCategories[activeCategory];
  const items = categoryItems(activeCategory);
  document.getElementById("categoryIcon").textContent = category.icon;
  document.getElementById("categoryTitle").textContent = category.title;
  document.getElementById("checklist").innerHTML = items.map(item => {
    const custom = (saved.custom[activeCategory] || []).includes(item);
    return `<label class="check-row"><input type="checkbox" data-item="${item.replaceAll('"','&quot;')}" ${saved.checked[itemId(activeCategory, item)] ? "checked" : ""}><span class="custom-check"></span><span>${item}</span>${custom ? `<button type="button" class="delete-item" data-delete="${item.replaceAll('"','&quot;')}" aria-label="${item} löschen">×</button>` : ""}</label>`;
  }).join("");
  document.querySelectorAll(".check-row input").forEach(input => input.addEventListener("change", () => {
    saved.checked[itemId(activeCategory, input.dataset.item)] = input.checked;
    save(); renderCategories(); updateProgress(); updateCategoryToggle();
  }));
  document.querySelectorAll(".delete-item").forEach(button => button.addEventListener("click", event => {
    event.preventDefault();
    const item = button.dataset.delete;
    saved.custom[activeCategory] = (saved.custom[activeCategory] || []).filter(entry => entry !== item);
    delete saved.checked[itemId(activeCategory, item)];
    save(); renderPacking(); updateProgress();
  }));
  updateCategoryToggle();
}

function updateCategoryToggle() {
  const items = categoryItems(activeCategory);
  const allDone = items.length && items.every(item => saved.checked[itemId(activeCategory, item)]);
  document.getElementById("toggleCategory").textContent = allDone ? "Auswahl aufheben" : "Alle auswählen";
}

function updateProgress() {
  const all = Object.keys(defaultCategories).flatMap(key => categoryItems(key).map(item => itemId(key, item)));
  const complete = all.filter(id => saved.checked[id]).length;
  const percent = all.length ? Math.round(complete / all.length * 100) : 0;
  document.getElementById("progressText").textContent = `${complete} von ${all.length} gepackt`;
  document.getElementById("progressPercent").textContent = `${percent}%`;
  document.getElementById("progressBar").style.width = `${percent}%`;
}

function renderWeather() {
  document.getElementById("weatherTabs").innerHTML = Object.entries(weatherData).map(([key, value]) => `<button class="weather-tab ${key === activeWeather ? "active" : ""}" data-weather="${key}"><span>${value.icon}</span>${value.label}</button>`).join("");
  document.querySelectorAll(".weather-tab").forEach(button => button.addEventListener("click", () => { activeWeather = button.dataset.weather; renderWeather(); }));
  const weather = weatherData[activeWeather];
  document.getElementById("weatherSummary").innerHTML = `<strong>${weather.icon} ${weather.temp}</strong><p>${weather.summary}</p>`;
  document.getElementById("outfitGrid").innerHTML = weather.outfits.map(outfit => `<article class="outfit-card"><span class="outfit-tag">${outfit.mood}</span><h3>${outfit.name}</h3><ul>${outfit.pieces.map(piece => `<li>${piece}</li>`).join("")}</ul></article>`).join("");
}

document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".filter").forEach(entry => entry.classList.remove("active"));
  button.classList.add("active"); renderCapsule(button.dataset.filter);
}));

document.getElementById("addItemForm").addEventListener("submit", event => {
  event.preventDefault();
  const input = document.getElementById("newItem");
  const value = input.value.trim();
  if (!value || categoryItems(activeCategory).includes(value)) return;
  saved.custom[activeCategory] = [...(saved.custom[activeCategory] || []), value];
  input.value = ""; save(); renderPacking(); updateProgress();
});

document.getElementById("toggleCategory").addEventListener("click", () => {
  const items = categoryItems(activeCategory);
  const allDone = items.every(item => saved.checked[itemId(activeCategory, item)]);
  items.forEach(item => saved.checked[itemId(activeCategory, item)] = !allDone);
  save(); renderPacking(); updateProgress();
});

document.getElementById("resetList").addEventListener("click", () => {
  if (!confirm("Möchtest du wirklich alle Häkchen und eigenen Einträge löschen?")) return;
  saved = { checked: {}, custom: {} }; save(); renderPacking(); updateProgress();
});

renderCapsule();
renderPacking();
updateProgress();
renderWeather();
