// ==== Configurações ====
const showTrailer = false;

// ==== Trailer Section (opcional) ====
if (!showTrailer) {
  const trailerSection = document.getElementById("trailer");
  if (trailerSection) {
    trailerSection.remove();
  }

  const trailerNavLink = document.querySelector('#main-nav a[href="#trailer"]');
  if (trailerNavLink) {
    trailerNavLink.remove();
  }

  const trailerSideNavLink = document.querySelector(
    '.side-nav a[href="#trailer"]'
  );
  if (trailerSideNavLink) {
    trailerSideNavLink.remove();
  }
}

// ==== Dados do Devlog ====
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

const devlogContainer = document.getElementById("devlog-container");
devlogData.forEach((entry) => {
  const div = document.createElement("div");
  div.className = "devlog-entry";
  div.innerHTML = `<h3>${entry.title}</h3><small>${entry.date}</small><p>${entry.content}</p>`;
  devlogContainer.appendChild(div);
});

// ==== Dados da Galeria ====
const galleryData = [
  "print1.webp",
  "print2.webp",
  "print3.webp",
  "print4.webp",
  // Adicione mais imagens conforme necessário
];

const galleryContainer = document.querySelector(".gallery");
galleryData.forEach((src) => {
  const img = document.createElement("img");
  img.src = `img/galeria/${src}`;
  img.alt = "Imagem da galeria";
  galleryContainer.appendChild(img);
});

// ==== Dados dos Personagens ====
const charactersData = [
  {
    name: "Rayy",
    image: "rayy.png",
    description: "Protagonista que protege Bloomrise.",
  },
  {
    name: "J. Minelli",
    image: "minelli.png",
    description: "Comerciante e marido da Rayy. Fornece a espada inicial.",
  },
  {
    name: "Victor Bloom",
    image: "victor.png",
    description: "Prefeito reservado e bibliotecário inteligente.",
  },
  {
    name: "Wade Woodson",
    image: "wade.png",
    description: "Lenhador amigável que fornece madeira e troca itens.",
  },
  {
    name: "Darius Forge",
    image: "darius.png",
    description: "Ferreiro habilidoso, responsável por armas e itens.",
  },
  {
    name: "Lupi Nuki",
    image: "lupi.png",
    description: "Tanuki curioso e tagarela, fã de sementes estranhas.",
  },
  {
    name: "Selene Hawke",
    image: "selene.png",
    description: "Dona do bar local, casada com Marcus.",
  },
  {
    name: "Marcus Hawke",
    image: "marcus.png",
    description: "Dono do bar local, casado com Selene.",
  },
  {
    name: "Lyla Quinn",
    image: "lyla.png",
    description: "Garota da cidade fascinada pela vida rural.",
  },
  {
    name: "Jaden Carter",
    image: "jaden.png",
    description: "Cantor animado com estilo único.",
  },
  {
    name: "Milo Plume",
    image: "milo.png",
    description: "Tucano calmo e observador, melhor amigo de Rayy.",
  },
  {
    name: "Max Rook",
    image: "max.png",
    description: "Antigo guerreiro obcecado por glória.",
  },
];

const charactersContainer = document.querySelector(".characters");
charactersData.forEach((char) => {
  const article = document.createElement("article");
  article.className = "character-card";
  article.innerHTML = `
      <img src="img/personagens/${char.image}" alt="${char.name} - tales of bloomrise" />
      <h3>${char.name}</h3>
      <p>${char.description}</p>
    `;
  charactersContainer.appendChild(article);
});

// ==== Parallax suave ====
const bg = document.querySelector(".parallax-bg");
let targetY = 0;
let currentY = 0;

window.addEventListener("scroll", () => {
  targetY = window.scrollY * -0.4;
});

function animate() {
  currentY += (targetY - currentY) * 0.1;
  bg.style.transform = `translateY(${currentY}px)`;
  requestAnimationFrame(animate);
}

animate();

// ==== Menu lateral (mobile) ====
const menuToggle = document.getElementById("menu-toggle");
const sideNav = document.querySelector(".side-nav");
const overlay = document.getElementById("overlay");

menuToggle.addEventListener("click", () => {
  sideNav.classList.toggle("open");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  sideNav.classList.remove("open");
  overlay.classList.remove("active");
});

// ==== nav background color change on scroll ====

const nav = document.getElementById("main-nav");
const nav_bur = document.getElementById("nav-bur");
const navOffset = nav.offsetTop;

window.addEventListener("scroll", () => {
  if (window.scrollY >= navOffset) {
    nav_bur.classList.add("fixed-nav");
  } else {
    nav_bur.classList.remove("fixed-nav");
  }
});

function updateMaskClasses(container) {
  if (container.scrollTop > 10) {
    container.classList.add("mask-top");
  } else {
    container.classList.remove("mask-top");
  }

  if (
    container.scrollTop + container.clientHeight + 10 <
    container.scrollHeight
  ) {
    container.classList.add("mask-bottom");
  } else {
    container.classList.remove("mask-bottom");
  }
}

devlogContainer.addEventListener("scroll", () =>
  updateMaskClasses(devlogContainer)
);
charactersContainer.addEventListener("scroll", () =>
  updateMaskClasses(charactersContainer)
);

// Chama no carregamento para atualizar máscara se estiver rolado
updateMaskClasses(devlogContainer);
updateMaskClasses(charactersContainer);
