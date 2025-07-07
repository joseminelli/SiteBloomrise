const devlogData = [
  {
    date: "2025-07-07",
    title: "Início do Site Oficial",
    content:
      "Publicamos a primeira versão do site oficial com trailer, links e devlog modular.",
  },
  {
    date: "2025-07-05",
    title: "NPCs agora abrem portas corretamente",
    content:
      "Corrigimos um bug em que NPCs ficavam presos ao tentar interagir com portas.",
  },
];

const container = document.getElementById("devlog-container");

devlogData.forEach((entry) => {
  const div = document.createElement("div");
  div.className = "devlog-entry";
  div.innerHTML = `<h3>${entry.title}</h3><small>${entry.date}</small><p>${entry.content}</p>`;
  container.appendChild(div);
});

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const bg = document.querySelector(".parallax-bg");
  bg.style.transform = `translateY(${scrolled * -0.4}px)`;
});
