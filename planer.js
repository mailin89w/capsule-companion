const wardrobe = [
  {name:"Wide-Leg-Jeans",type:"bottom",tone:"light",weather:"all",icon:"♢"},{name:"Stoffhose",type:"bottom",tone:"dark",weather:"all",icon:"◇"},{name:"Lederleggings",type:"bottom",tone:"dark",weather:"cool",icon:"◐"},{name:"Shorts",type:"bottom",tone:"dark",weather:"cool",icon:"◫"},
  {name:"Leo-Midikleid",type:"dress",tone:"dark",weather:"all",icon:"◉"},{name:"Kariertes Kleid",type:"dress",tone:"light",weather:"cool",icon:"▦"},
  {name:"Weißes Top",type:"top",tone:"light",weather:"all",icon:"○"},{name:"Schwarzes Longsleeve",type:"top",tone:"dark",weather:"cool",icon:"●"},{name:"Braunes T-Shirt",type:"top",tone:"dark",weather:"mild",icon:"◒"},{name:"Creme-Pullover",type:"top",tone:"light",weather:"cool",icon:"⌁"},{name:"Oversized-Hemd",type:"top",tone:"light",weather:"all",icon:"⌇"},
  {name:"Rosa Blazer",type:"layer",tone:"light",weather:"all",icon:"✦"},{name:"Schwarzer Blazer",type:"layer",tone:"dark",weather:"all",icon:"✧"},{name:"Lederjacke",type:"layer",tone:"dark",weather:"cool",icon:"◈"},{name:"Beiger Cardigan",type:"layer",tone:"light",weather:"cool",icon:"≈"},{name:"Lemon-Cardigan",type:"layer",tone:"light",weather:"cool",icon:"☼"},{name:"Regenjacke",type:"outer",tone:"dark",weather:"rain",icon:"☂"},
  {name:"Thermostrumpfhose",type:"extra",tone:"dark",weather:"cool",icon:"◑"},{name:"Schwarze Cap",type:"extra",tone:"dark",weather:"all",icon:"⌒"}
];

const priority = {
  balanced:["Wide-Leg-Jeans","Lederleggings","Stoffhose","Weißes Top","Schwarzes Longsleeve","Creme-Pullover","Oversized-Hemd","Rosa Blazer","Schwarzer Blazer","Beiger Cardigan","Leo-Midikleid","Kariertes Kleid"],
  light:["Wide-Leg-Jeans","Kariertes Kleid","Weißes Top","Creme-Pullover","Oversized-Hemd","Rosa Blazer","Beiger Cardigan","Lemon-Cardigan","Leo-Midikleid"],
  dark:["Stoffhose","Lederleggings","Leo-Midikleid","Schwarzes Longsleeve","Weißes Top","Schwarzer Blazer","Lederjacke","Creme-Pullover"],
  sporty:["Lederleggings","Wide-Leg-Jeans","Stoffhose","Weißes Top","Oversized-Hemd","Creme-Pullover","Schwarzer Blazer","Lederjacke","Schwarze Cap"]
};

function calculate(days, weather, style) {
  const counts = { bottom: days <= 5 ? 2 : 3, top: days <= 5 ? 3 : 4, layer: weather === "mild" ? 2 : 3, dress: days >= 7 ? 1 : 0 };
  const chosen=[];
  const ordered=[...priority[style],...wardrobe.map(x=>x.name)];
  for (const type of ["bottom","top","layer","dress"]) {
    const options=[...new Set(ordered)].map(n=>wardrobe.find(x=>x.name===n)).filter(x=>x&&x.type===type);
    chosen.push(...options.slice(0,counts[type]));
  }
  if (weather==="rain") chosen.push(wardrobe.find(x=>x.name==="Regenjacke"));
  if (weather==="cold"||weather==="mixed") chosen.push(wardrobe.find(x=>x.name==="Thermostrumpfhose"));
  const unique=[...new Map(chosen.filter(Boolean).map(x=>[x.name,x])).values()];
  const bottoms=unique.filter(x=>x.type==="bottom").length, tops=unique.filter(x=>x.type==="top").length, layers=unique.filter(x=>x.type==="layer").length, dresses=unique.filter(x=>x.type==="dress").length;
  return {items:unique, combinations:bottoms*tops*Math.max(1,layers)+dresses*Math.max(1,layers)};
}

function renderResult() {
  const days=+document.getElementById("days").value, weather=document.getElementById("weather").value, style=document.getElementById("style").value;
  const result=calculate(days,weather,style);
  document.getElementById("optimizerResult").innerHTML=`<div class="result-summary"><span><strong>${result.items.length}</strong> Teile</span><span><strong>${result.combinations}+</strong> Kombinationen</span><span><strong>${days}</strong> Tage</span></div><h2>Deine kompakte Auswahl</h2><div class="result-chips">${result.items.map(x=>`<span>${x.icon} ${x.name}</span>`).join("")}</div><p class="result-note">Schuhe, Sportsets, Unterwäsche und Pflege-Basics werden separat gerechnet. Der Vorschlag maximiert kombinierbare Oberteile, Unterteile und Layer.</p>`;
}

document.getElementById("wardrobeGrid").innerHTML=wardrobe.map(x=>`<article class="wardrobe-item"><span>${x.icon}</span><div><strong>${x.name}</strong><small>${({bottom:"Unterteil",top:"Oberteil",dress:"Kleid",layer:"Layer",outer:"Wetterschutz",extra:"Extra"})[x.type]}</small></div></article>`).join("");
document.getElementById("optimizerForm").addEventListener("submit",e=>{e.preventDefault();renderResult();});
renderResult();
