// ==== Configurações ====
const showTrailer = true;
let isAnimating = false;

// ==== Dados carregados de JSON ==== 
let fallbackDevlogData = [];
let TAG_MAP = [];
let galleryData = [];
let charactersData = [];

const DATA_FILES = {
  tags: "data/tags.json",
  gallery: "data/gallery.json",
  characters: "data/characters.json",
  devlogs: "data/devlogs.json",
};

function isArray(value) {
  return Array.isArray(value);
}

async function loadJsonArray(path, fallback = []) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) return fallback;

    const data = await response.json();
    return isArray(data) ? data : fallback;
  } catch {
    return fallback;
  }
}

async function loadDataFiles() {
  const [tags, gallery, characters] = await Promise.all([
    loadJsonArray(DATA_FILES.tags, []),
    loadJsonArray(DATA_FILES.gallery, []),
    loadJsonArray(DATA_FILES.characters, []),
  ]);

  TAG_MAP = tags;
  galleryData = gallery;
  charactersData = characters;
}

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

function getTagsAndIcons(title, content) {
  const lowerTitle = title.toLowerCase();
  const lowerContent = content.toLowerCase();

  const foundTags = [];

  for (const item of TAG_MAP) {
    // Verifica se alguma keyword aparece no título ou conteúdo
    if (
      item.keywords.some(
        (keyword) =>
          lowerTitle.includes(keyword.toLowerCase()) ||
          lowerContent.includes(keyword.toLowerCase())
      )
    ) {
      // Evita tags duplicadas
      if (!foundTags.some((tag) => tag.tag === item.tag)) {
        foundTags.push({ tag: item.tag, icon: item.icon });
      }
    }

    // Limita a 5 tags no máximo
    if (foundTags.length >= 5) break;
  }

  // Se nada foi encontrado, retorna "Geral"
  if (foundTags.length === 0) {
    return [{ tag: "Geral", icon: "🌿" }];
  }

  return foundTags;
}

const devlogContainer = document.getElementById("devlog-container");

function isValidDevlogEntry(entry) {
  return (
    entry &&
    typeof entry.date === "string" &&
    typeof entry.title === "string" &&
    typeof entry.content === "string"
  );
}

function sortDevlogsByDateDesc(entries) {
  return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function renderDevlog(entries) {
  devlogContainer.innerHTML = "";

  sortDevlogsByDateDesc(entries).forEach((entry) => {
    const div = document.createElement("div");
    div.className = "devlog-entry";

    // Pega ate 5 tags a partir do titulo + conteudo
    const tags = getTagsAndIcons(entry.title, entry.content);

    // Converte a data para o formato brasileiro
    const formattedDate = new Date(entry.date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    // Renderiza todas as tags encontradas
    const tagsHTML = tags
      .map(
        ({ tag, icon }) =>
          `<span class="devlog-tag tag-${tag.toLowerCase()}">${icon} ${tag}</span>`
      )
      .join(" ");

    div.innerHTML = `
      <div class="devlog-tags">
        ${tagsHTML}
      </div>
      <h3>${entry.title}</h3>
      <small>${formattedDate}</small>
      <p>${entry.content}</p>
    `;

    devlogContainer.appendChild(div);
  });
}

async function loadExternalDevlogs() {
  try {
    const parsed = await loadJsonArray(DATA_FILES.devlogs, null);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidDevlogEntry);
  } catch {
    return [];
  }
}

async function initDevlog() {
  const externalDevlogs = await loadExternalDevlogs();
  const sourceData =
    externalDevlogs.length > 0 ? externalDevlogs : fallbackDevlogData;

  renderDevlog(sourceData);
}

const galleryContainer = document.querySelector(".gallery");

function renderGallery() {
  galleryContainer.innerHTML = "";

  // Criar as imagens e já adicionar evento para abrir modal (ATUALIZADO)
  galleryData.forEach((imgData, i) => {
    const figure = document.createElement("figure");
    figure.className = "gallery-item";

    const img = document.createElement("img");
    img.src = `img/galeria/${imgData.src}`;
    img.alt = imgData.alt; // Usa alt descritivo e unico
    img.loading = "lazy";
    img.decoding = "async";
    img.style.cursor = "pointer";

    img.addEventListener("click", () => openModal(i));

    const caption = document.createElement("figcaption");
    caption.textContent = imgData.alt;

    figure.appendChild(img);
    figure.appendChild(caption);
    galleryContainer.appendChild(figure);
  });
}

const charactersContainer = document.querySelector(".characters");

function renderCharacters() {
  charactersContainer.innerHTML = "";

  charactersData.forEach((char) => {
    const article = document.createElement("article");
    article.className = "character-card";
    article.innerHTML = `
      <img src="img/personagens/${char.image}" alt="${char.name} - Tales of Bloomrise" />
      <h3>${char.name}</h3>
      <p>${char.description}</p>
    `;
    charactersContainer.appendChild(article);
  });

  // 🔹 Cria JSON-LD com os personagens (URL CORRIGIDA)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Tales of Bloomrise",
    character: charactersData.map((char) => ({
      "@type": "VideoGameCharacter",
      name: char.name,
      description: char.description,
      image: `https://talesofbloomrise.com/img/personagens/${char.image}`, // URL CORRIGIDA
    })),
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.text = JSON.stringify(schemaData, null, 2);
  document.head.appendChild(script);

  updateMaskClasses(charactersContainer); // se quiser aplicar fade também
}

async function initDataDrivenSections() {
  await loadDataFiles();
  await initDevlog();
  renderGallery();
  renderCharacters();
  updateMaskClasses(devlogContainer);
  updateMaskClasses(charactersContainer);
}

initDataDrivenSections();

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

  if (!isAnimating) {
    isAnimating = true;
    requestAnimationFrame(animate);
  }
});

function animate() {
  // 1. Se o valor atual está "praticamente" igual ao alvo, pare.
  if (Math.abs(targetY - currentY) < 0.1) {
    currentY = targetY;
    bg.style.transform = `translateY(${currentY}px)`;
    isAnimating = false; // Parar a animação
    return;
  }

  // 2. Continue a animação se não parou
  currentY += (targetY - currentY) * 0.1;
  bg.style.transform = `translateY(${currentY}px)`;
  requestAnimationFrame(animate); // Continua o loop
}

// ==== Menu lateral (mobile) (ATUALIZADO) ====
const menuToggle = document.getElementById("menu-toggle");
const menuToggleImg = document.getElementById("menu-toggle-img");
const sideNav = document.querySelector(".side-nav");
const overlay = document.getElementById("overlay");

function toggleMenu() {
  const isExpanded = sideNav.classList.toggle("open"); // Verifica se está abrindo
  menuToggle.classList.toggle("active");
  changeMenuIcon();
  overlay.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", isExpanded); // Define o estado de acessibilidade
}

menuToggle.addEventListener("click", toggleMenu);

function changeMenuIcon() {
  menuToggleImg.classList.add("shrinking");

  setTimeout(() => {
    menuToggleImg.src = sideNav.classList.contains("open")
      ? "img/hud/voltarBtn.png"
      : "img/hud/btn_menu.png";

    menuToggleImg.classList.remove("shrinking");
    menuToggleImg.classList.add("growing");

    setTimeout(() => {
      menuToggleImg.classList.remove("growing");
    }, 200);
  }, 200);
}

overlay.addEventListener("click", toggleMenu); // Reutiliza a função de toggle

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

// ==== Modal da galeria (ATUALIZADO) ====
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const modalClose = document.getElementById("modal-close");
const modalPrev = document.getElementById("modal-prev");
const modalNext = document.getElementById("modal-next");
const modalCaption = document.getElementById("modal-caption");

// Variáveis para controle
let currentIndex = -1;
let zoomed = false;

// Função abrir modal com índice da imagem (ATUALIZADA)
function openModal(index) {
  currentIndex = index;
  const currentImage = galleryData[currentIndex];

  if (currentImage) {
    modalImg.src = `img/galeria/${currentImage.src}`;
    modalImg.alt = currentImage.alt; // Usa o alt descritivo
    if (modalCaption) modalCaption.textContent = currentImage.alt;
  } else {
    modalImg.src = "";
    modalImg.alt = "Imagem não encontrada";
    if (modalCaption) modalCaption.textContent = "";
  }

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