const looks = [
  { no: "01", name: "Pink Casual Chic", group: "light", strip: "light", pos: 0, tags: ["hell", "mild"], pieces: ["Wide-Leg-Jeans", "Weißes Top", "Rosa Blazer", "Sneaker"] },
  { no: "02", name: "Lemon Soft", group: "light", strip: "lemon", pos: 0, tags: ["hell", "mild"], pieces: ["Wide-Leg-Jeans", "Weißes Top", "Lemon-Cardigan", "Sneaker"] },
  { no: "03", name: "Creamy Autumn", group: "light", strip: "light", pos: 1, tags: ["hell", "kühl"], pieces: ["Wide-Leg-Jeans", "Creme-Pullover", "Sneaker"] },
  { no: "04", name: "Preppy Classic", group: "light", strip: "lemon", pos: 1, tags: ["hell", "kühl"], pieces: ["Kariertes Kleid", "Thermostrumpfhose", "Boots"] },
  { no: "05", name: "Cozy & Chic", group: "light", strip: "lemon", pos: 2, tags: ["hell", "mild"], pieces: ["Wide-Leg-Jeans", "Weißes Top", "Lemon-Cardigan", "Sneaker"] },
  { no: "06", name: "Range Rover Mami", group: "dark sporty", strip: "dark", pos: 0, tags: ["dunkel", "sportlich"], pieces: ["Sportleggings", "Weißes Top", "Schwarzer Blazer", "Cap", "Sneaker"] },
  { no: "07", name: "Leather Chic", group: "dark", strip: "dark", pos: 1, tags: ["dunkel", "kühl"], pieces: ["Lederleggings", "Weißes Top", "Lederjacke", "Boots"] },
  { no: "08", name: "Leo Elegant", group: "dark", strip: "dresses", pos: 1, tags: ["dunkel", "schick"], pieces: ["Leo-Midikleid", "Schwarzer Blazer", "Boots"] },
  { no: "09", name: "All Black", group: "dark", strip: "dark", pos: 2, tags: ["dunkel", "kühl"], pieces: ["Lederleggings", "Schwarzes Longsleeve", "Schwarzer Blazer", "Boots"] },
  { no: "10", name: "Business Casual", group: "dark", strip: "dark", pos: 3, tags: ["dunkel", "schick"], pieces: ["Stoffhose", "Schwarzes Longsleeve", "Schwarzer Blazer", "Boots"] },
  { no: "11", name: "Leo Cozy", group: "mixed", strip: "dresses", pos: 0, tags: ["gemischt", "kühl"], pieces: ["Leo-Midikleid", "Lemon-Cardigan", "Boots"] },
  { no: "12", name: "Leo Chic", group: "dark", strip: "dresses", pos: 1, tags: ["dunkel", "kühl"], pieces: ["Leo-Midikleid", "Lederjacke", "Boots"] },
  { no: "13", name: "Leo Layering", group: "mixed", strip: "dresses", pos: 0, tags: ["gemischt", "kühl"], pieces: ["Leo-Midikleid", "Creme-Pullover", "Boots"] },
  { no: "14", name: "Kariert & Gelb", group: "light", strip: "lemon", pos: 1, tags: ["hell", "kühl"], pieces: ["Kariertes Kleid", "Lemon-Cardigan", "Thermostrumpfhose", "Boots"] },
  { no: "15", name: "Sporty Oversized", group: "mixed sporty", strip: "more", pos: 1, tags: ["sportlich", "mild"], pieces: ["Grüne Sportleggings", "Sporttop", "Weißes Hemd", "Cap", "Sneaker"] },
  { no: "16", name: "Brown & Blue", group: "mixed", strip: "mixed", pos: 2, tags: ["gemischt", "mild"], pieces: ["Wide-Leg-Jeans", "Braunes T-Shirt", "Lemon-Cardigan", "Sneaker"] },
  { no: "17", name: "Kariert & Leder", group: "mixed", strip: "dresses", pos: 2, tags: ["gemischt", "kühl"], pieces: ["Kariertes Kleid", "Lederjacke", "Thermostrumpfhose", "Boots"] },
  { no: "18", name: "Evening Ready", group: "dark", strip: "dresses", pos: 1, tags: ["dunkel", "schick"], pieces: ["Leo-Midikleid", "Schwarzer Blazer", "Boots"] }
];

const stripFiles = { light: "assets/lookbook-light.jpg", dark: "assets/lookbook-dark.jpg", mixed: "assets/lookbook-mixed.jpg", more: "assets/lookbook-more.jpg", lemon: "assets/lookbook-lemon-check.jpg", dresses: "assets/lookbook-dresses.jpg" };

function renderLooks(filter = "all") {
  const visible = looks.filter(look => filter === "all" || look.group.includes(filter));
  document.getElementById("lookCount").textContent = `${visible.length} ${visible.length === 1 ? "Look" : "Looks"}`;
  document.getElementById("lookbookGrid").innerHTML = visible.map(look => {
    const triple = look.strip === "lemon" || look.strip === "dresses";
    const position = (triple ? ["0%", "50%", "100%"] : ["0%", "33.333%", "66.667%", "100%"]) [look.pos];
    return `<article class="library-card">
      <div class="library-photo ${triple ? "triple-strip" : ""}" role="img" aria-label="${look.name}" style="background-image:url('${stripFiles[look.strip]}');background-position:${position} center"></div>
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
