const looks = [
  { no: "01", name: "Pink Casual Chic", group: "light", strip: "light", pos: 0, tags: ["hell", "mild"], pieces: ["Wide-Leg-Jeans", "Weißes Top", "Rosa Blazer", "Sneaker"] },
  { no: "02", name: "Creamy Autumn", group: "light", strip: "light", pos: 1, tags: ["hell", "kühl"], pieces: ["Wide-Leg-Jeans", "Creme-Pullover", "Sneaker"] },
  { no: "03", name: "Soft & Sporty", group: "light", strip: "light", pos: 2, tags: ["hell", "mild"], pieces: ["Wide-Leg-Jeans", "Weißes Top", "Strickjacke", "Sneaker"] },
  { no: "04", name: "Casual Oversized", group: "light", strip: "light", pos: 3, tags: ["hell", "mild"], pieces: ["Wide-Leg-Jeans", "Weißes Hemd", "Sneaker"] },
  { no: "05", name: "Range Rover Mami", group: "dark sporty", strip: "dark", pos: 0, tags: ["dunkel", "sportlich"], pieces: ["Sportleggings", "Weißes Top", "Schwarzer Blazer", "Cap", "Sneaker"] },
  { no: "06", name: "Leather Chic", group: "dark", strip: "dark", pos: 1, tags: ["dunkel", "kühl"], pieces: ["Lederleggings", "Weißes Top", "Lederjacke", "Boots"] },
  { no: "07", name: "All Black", group: "dark", strip: "dark", pos: 2, tags: ["dunkel", "kühl"], pieces: ["Lederleggings", "Schwarzes Longsleeve", "Schwarzer Blazer", "Boots"] },
  { no: "08", name: "Business Casual", group: "dark", strip: "dark", pos: 3, tags: ["dunkel", "schick"], pieces: ["Stoffhose", "Schwarzes Longsleeve", "Schwarzer Blazer", "Boots"] },
  { no: "09", name: "Autumn Shorts", group: "mixed", strip: "mixed", pos: 0, tags: ["gemischt", "kühl"], pieces: ["Shorts", "Thermostrumpfhose", "Creme-Pullover", "Boots"] },
  { no: "10", name: "Pink & Leather", group: "mixed", strip: "mixed", pos: 1, tags: ["gemischt", "schick"], pieces: ["Lederleggings", "Weißes Top", "Rosa Blazer", "Sneaker oder Boots"] },
  { no: "11", name: "Brown & Blue", group: "mixed", strip: "mixed", pos: 2, tags: ["gemischt", "mild"], pieces: ["Wide-Leg-Jeans", "Braunes T-Shirt", "Strickjacke", "Sneaker"] },
  { no: "12", name: "Cozy Sport", group: "mixed sporty", strip: "mixed", pos: 3, tags: ["gemischt", "sportlich"], pieces: ["Braune Sportleggings", "Sporttop", "Creme-Pullover", "Sneaker"] },
  { no: "13", name: "Layer Look", group: "mixed", strip: "more", pos: 0, tags: ["gemischt", "kühl"], pieces: ["Shorts", "Thermostrumpfhose", "Weißes Hemd", "Rosa Blazer", "Boots"] },
  { no: "14", name: "Sporty Oversized", group: "mixed sporty", strip: "more", pos: 1, tags: ["sportlich", "mild"], pieces: ["Grüne Sportleggings", "Sporttop", "Weißes Hemd", "Cap", "Sneaker"] },
  { no: "15", name: "Casual Leather", group: "mixed", strip: "more", pos: 2, tags: ["gemischt", "kühl"], pieces: ["Wide-Leg-Jeans", "Schwarzes Longsleeve", "Lederjacke", "Boots"] },
  { no: "16", name: "Evening Ready", group: "mixed", strip: "more", pos: 3, tags: ["gemischt", "schick"], pieces: ["Stoffhose", "Weißes Top", "Rosa Blazer", "Boots"] }
];

const stripFiles = { light: "assets/lookbook-light.jpg", dark: "assets/lookbook-dark.jpg", mixed: "assets/lookbook-mixed.jpg", more: "assets/lookbook-more.jpg" };

function renderLooks(filter = "all") {
  const visible = looks.filter(look => filter === "all" || look.group.includes(filter));
  document.getElementById("lookCount").textContent = `${visible.length} ${visible.length === 1 ? "Look" : "Looks"}`;
  document.getElementById("lookbookGrid").innerHTML = visible.map(look => {
    const position = ["0%", "33.333%", "66.667%", "100%"][look.pos];
    return `<article class="library-card">
      <div class="library-photo" role="img" aria-label="${look.name}" style="background-image:url('${stripFiles[look.strip]}');background-position:${position} center"></div>
      <div class="library-copy">
        <span class="look-index">${look.no}</span>
        <h2>${look.name}</h2>
        <div class="look-tags">${look.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
        <ul>${look.pieces.map(piece => `<li>${piece}</li>`).join("")}</ul>
      </div>
    </article>`;
  }).join("");
}

document.querySelectorAll("[data-look-filter]").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll("[data-look-filter]").forEach(item => item.classList.remove("active"));
  button.classList.add("active");
  renderLooks(button.dataset.lookFilter);
}));

renderLooks();
