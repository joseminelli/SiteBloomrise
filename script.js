// ==== Configurações ====
const showTrailer = false;

// ==== Trailer Section (opcional) ====
if (!showTrailer) {
  const trailerSection = document.getElementById("trailer");
  if (trailerSection) trailerSection.remove();

  const trailerNavLink = document.querySelector('#main-nav a[href="#trailer"]');
  if (trailerNavLink) trailerNavLink.remove();

  const trailerSideNavLink = document.querySelector(
    '.side-nav a[href="#trailer"]'
  );
  if (trailerSideNavLink) trailerSideNavLink.remove();
}

// ==== Dados do Devlog ====
const devlogData = [
  {
    date: "2025-07-11",
    title: "Dungeon adicionada!",
    content:
      "Adicionamos a dungeon no jogo, onde os jogadores podem enfrentar inimigos como zumbis e slimes. A dungeon inclui um layout variado com recompensas ao derrotar todos os monstros!",},
  {
    date: "2025-07-10",
    title: "Primeira versão dos interiores!",
    content:
      "Adicionamos a primeira versão dos interiores, permitindo que os NPCs interajam com as casas e lojas da vila. Agora é possível entrar e sair de ambientes internos, aumentando a imersão do jogo.",
  },
  {
    date: "2025-07-07",
    title: "Novas Lojas e Correções de Rotinas",
    content:
      "Foram adicionadas lojas interativas no ferreiro, no bar local e nas máquinas de refrigerante, permitindo compras diretas de armas, bebidas e itens rápidos. Além disso, corrigimos um bug que impedia certos NPCs de executarem suas rotinas completas ao entrarem e saírem de interiores.",
  },
  {
    date: "2025-07-01",
    title: "Criação de Interiores",
    content:
      "Foram adicionados interiores como casas, lojas e outros ambientes internos, expandindo a exploração e profundidade do mundo.",
  },
  {
    date: "2025-06-25",
    title: "Novo inimigo: Zumbi",
    content:
      "Zumbis surgem à noite nas áreas externas das dungeons, adicionando mais perigo e desafio.",
  },
  {
    date: "2025-06-20",
    title: "Melhoria da IA dos NPCs",
    content:
      "Os NPCs agora possuem rotinas diárias mais complexas, como trabalhar, descansar e interagir entre si.",
  },
  {
    date: "2025-06-18",
    title: "Sistema de Clima e Ciclo Dia-Noite",
    content:
      "Implementamos um sistema de clima dinâmico com ciclos de dia e noite, afetando a visibilidade e comportamento dos NPCs.",
  },
  {
    date: "2025-06-10",
    title: "Bug fixes e Melhorias de Performance",
    content:
      "Correção de bugs críticos e otimizações de performance para melhorar a fluidez do jogo.",
  },
  {
    date: "2025-07-06",
    title: "NPCs agora acessam interiores",
    content:
      "As rotinas dos NPCs foram aprimoradas para incluir interações com o ambiente interno da vila, como casas e lojas.",
  },
  {
    date: "2025-06-15",
    title: "Adição de Missões",
    content:
      "O sistema de quests foi introduzido com missões de coleta e combate, como derrotar inimigos específicos.",
  },
  {
    date: "2025-06-08",
    title: "Diálogos e Tutorial Básico",
    content:
      "Agora o jogo conta com diálogos interativos e um tutorial inicial para orientar novos jogadores.",
  },
  {
    date: "2025-05-28",
    title: "Nova loja do NPC J. Minelli",
    content:
      "O comerciante J. Minelli agora tem uma loja funcional onde o jogador pode comprar ou vender itens.",
  },
  {
    date: "2025-05-20",
    title: "NPCs adicionados (versão inicial)",
    content:
      "Primeiros NPCs foram inseridos com visual e nomes definidos, ainda sem rotinas complexas.",
  },
  {
    date: "2025-05-08",
    title: "Novo Inventário e Sistema de Itens",
    content:
      "O sistema de inventário foi reformulado, com suporte a itens utilizáveis, empilhamento e atalhos rápidos.",
  },
  {
    date: "2025-04-30",
    title: "Melhoria do Mapa e Novos Pontos de Interesse",
    content:
      "Adicionamos áreas como lagos, ruínas e trilhas para tornar a exploração mais variada e imersiva.",
  },
  {
    date: "2025-04-15",
    title: "Melhoria da Vegetação",
    content:
      "As árvores, gramas e arbustos receberam novos sprites e distribuição mais natural.",
  },
  {
    date: "2025-04-05",
    title: "Novos inimigos: Slimes e Orcs",
    content:
      "Os primeiros inimigos do jogo foram adicionados com IA básica e animações.",
  },
  {
    date: "2025-03-25",
    title: "Adição das Ferramentas",
    content:
      "Itens como picareta, machado e arco agora estão disponíveis para coleta e uso básico.",
  },
  {
    date: "2025-03-18",
    title: "Sistema de Combate Inicial",
    content:
      "Adicionamos o combate com toque para selecionar inimigos e atacar com timing.",
  },
  {
    date: "2025-03-10",
    title: "Primeira versão do Mapa",
    content:
      "Criamos o layout inicial da vila de Bloomrise e das áreas ao redor para testes de movimentação e ambientação.",
  },
];

const TAG_MAP = [
  {
    tag: "Combate",
    icon: "🧟",
    keywords: ["inimigo", "inimigos", "slime", "orc", "monstros"],
  },
  { tag: "Missão", icon: "📜", keywords: ["missão", "missões", "quest"] },
  {
    tag: "Mundo",
    icon: "🏠",
    keywords: ["interior", "interiores", "casa"],
  },
  {
    tag: "História",
    icon: "💬",
    keywords: ["diálogo", "dialogo", "história", "historia", "tutorial"],
  },
  { tag: "Personagem", icon: "🧑", keywords: ["npc", "loja", "personagem"] },
  {
    tag: "Sistema",
    icon: "⚙️",
    keywords: ["sistema", "inventário", "combate", "IA", "rotina"],
  },
  {
    tag: "Bug",
    icon: "🐛",
    keywords: ["bug", "erro", "problema", "falha"],
  },
  {
    tag: "Dungeon",
    icon: "🏰",
    keywords: ["dungeon", "masmorra", "caverna", "labirinto"],
  }
];

function getTagAndIcon(title) {
  const lowerTitle = title.toLowerCase();

  for (const item of TAG_MAP) {
    if (item.keywords.some((keyword) => lowerTitle.includes(keyword))) {
      return { tag: item.tag, icon: item.icon };
    }
  }

  return { tag: "Geral", icon: "🌿" };
}

const devlogContainer = document.getElementById("devlog-container");

devlogData.sort((a, b) => new Date(b.date) - new Date(a.date));

devlogData.forEach((entry) => {
  const div = document.createElement("div");
  div.className = "devlog-entry";
  const { tag, icon } = getTagAndIcon(entry.title);

  div.innerHTML = `
      <span class="devlog-tag tag-${tag.toLowerCase()}">${tag}</span>
      <h3>${icon} ${entry.title}</h3>
      <small>${entry.date}</small>
      <p>${entry.content}</p>
    `;

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

// Criar as imagens e já adicionar evento para abrir modal
galleryData.forEach((src, i) => {
  const img = document.createElement("img");
  img.src = `img/galeria/${src}`;
  img.alt = "Imagem da galeria";
  img.style.cursor = "pointer";

  img.addEventListener("click", () => openModal(i));

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
    description: "Grande ouvinte de todos da vila, casada com Marcus.",
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
window.addEventListener("load", () => {
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

  updateMaskClasses(charactersContainer); // se quiser aplicar fade também
});

// ==== Parallax suave ====
const bg = document.querySelector(".parallax-bg");
let targetY = 0;
let currentY = 0;

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;
  const bgHeight = bg.clientHeight;

  // Máximo scroll que o usuário pode fazer
  const maxScroll = docHeight - windowHeight;

  // Máximo deslocamento do bg para cima (valor negativo)
  const maxTranslateY = windowHeight - bgHeight;

  // Proporção do scroll atual em relação ao máximo scroll
  const scrollPercent = scrollY / maxScroll;

  // Calcula o targetY limitando proporcionalmente ao scrollPercent
  targetY = Math.max(maxTranslateY * scrollPercent, maxTranslateY);
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

// ==== Nav background change on scroll ====
const nav_bur = document.getElementById("nav-bur");

window.addEventListener("load", () => {
  const triggerPoint = nav_bur.getBoundingClientRect().top + window.scrollY;

  window.addEventListener("scroll", () => {
    if (window.scrollY >= triggerPoint) {
      nav_bur.classList.add("fixed-nav");
    } else {
      nav_bur.classList.remove("fixed-nav");
    }
  });
});

// ==== Máscaras de scroll ====
// (função para dar efeito fade nas bordas do scroll)
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

// Atualiza máscaras na carga inicial
updateMaskClasses(devlogContainer);
updateMaskClasses(charactersContainer);

// ==== Modal da galeria ====
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const modalClose = document.getElementById("modal-close");
const modalPrev = document.getElementById("modal-prev");
const modalNext = document.getElementById("modal-next");

// Variáveis para controle
let currentIndex = -1;
let zoomed = false;

// Função abrir modal com índice da imagem
function openModal(index) {
  currentIndex = index;
  modalImg.src = galleryData[currentIndex]
    ? `img/galeria/${galleryData[currentIndex]}`
    : "";
  modalImg.alt = `Imagem da galeria ${currentIndex + 1}`;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  zoomed = false;
  modalImg.classList.remove("zoomed");
  updateNavButtons();
  modal.focus();
}

// Fechar modal
function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  zoomed = false;
  modalImg.classList.remove("zoomed");
}

// Atualizar botões de navegação (desabilitar se no início ou fim)
function updateNavButtons() {
  modalPrev.classList.toggle("disabled", currentIndex <= 0);
  modalNext.classList.toggle(
    "disabled",
    currentIndex >= galleryData.length - 1
  );
}

// Mostrar próxima imagem
function showNext() {
  if (currentIndex < galleryData.length - 1) {
    openModal(currentIndex + 1);
  }
}

// Mostrar imagem anterior
function showPrev() {
  if (currentIndex > 0) {
    openModal(currentIndex - 1);
  }
}

// Eventos do modal
modalClose.addEventListener("click", closeModal);
modalNext.addEventListener("click", showNext);
modalPrev.addEventListener("click", showPrev);

// Fechar clicando fora da imagem (fundo escuro)
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Zoom com duplo clique
modalImg.addEventListener("dblclick", () => {
  zoomed = !zoomed;
  modalImg.classList.toggle("zoomed", zoomed);
});

// Navegação com teclado: ESC para fechar, setas para navegar, espaço/enter para zoom
window.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("show")) return;

  switch (e.key) {
    case "Escape":
      closeModal();
      break;
    case "ArrowRight":
      showNext();
      break;
    case "ArrowLeft":
      showPrev();
      break;
    case " ":
    case "Enter":
      zoomed = !zoomed;
      modalImg.classList.toggle("zoomed", zoomed);
      e.preventDefault();
      break;
  }
});
