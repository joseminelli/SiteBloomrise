// ==================== Configuracoes ====================
const showTrailer = true;
let isAnimating = false;

// ==================== Dados carregados de JSON ====================
let galleryData = [];
let charactersData = [];

const DATA_FILES = {
  gallery: "data/gallery.json",
  characters: "data/characters.json",
};

const I18N_BASE_PATH = "data/i18n";
const I18N_STORAGE_KEY = "site-language";
const SUPPORTED_LOCALES = ["pt-BR", "en-US"];

let currentLocale = "pt-BR";
let i18nMessages = {};

// ==================== Elementos principais ====================
const galleryContainer = document.querySelector(".gallery");
const charactersContainer = document.querySelector(".characters");
const menuToggle = document.getElementById("menu-toggle");
const menuToggleImg = document.getElementById("menu-toggle-img");
const sideNav = document.querySelector(".side-nav");
const overlay = document.getElementById("overlay");
const backToTopButton = document.getElementById("back-to-top");
const languageDropdown = document.querySelector("[data-language-dropdown]");
const languageDropdownButton = document.getElementById("language-dropdown-button");
const languageDropdownValue = document.getElementById("language-dropdown-value");
const languageDropdownMenu = document.getElementById("language-dropdown-menu");
const languageDropdownOptions = document.querySelectorAll(
  ".language-dropdown-option[data-lang]"
);
const languageGate = document.getElementById("language-gate");
const languageGateButtons = document.querySelectorAll(".lang-option[data-lang]");

const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const modalClose = document.getElementById("modal-close");
const modalPrev = document.getElementById("modal-prev");
const modalNext = document.getElementById("modal-next");
const modalCaption = document.getElementById("modal-caption");

let currentIndex = -1;
let zoomed = false;

function isArray(value) {
  return Array.isArray(value);
}

function normalizeLocale(locale) {
  if (!locale) return "pt-BR";
  if (SUPPORTED_LOCALES.includes(locale)) return locale;
  return locale.toLowerCase().startsWith("en") ? "en-US" : "pt-BR";
}

function getStoredLocale() {
  try {
    const stored = localStorage.getItem(I18N_STORAGE_KEY);
    return stored ? normalizeLocale(stored) : null;
  } catch {
    return null;
  }
}

function getBrowserLocale() {
  return normalizeLocale(navigator.language || "pt-BR");
}

function saveLocale(locale) {
  try {
    localStorage.setItem(I18N_STORAGE_KEY, locale);
  } catch {
  }
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
  const [gallery, characters] = await Promise.all([
    loadJsonArray(DATA_FILES.gallery, []),
    loadJsonArray(DATA_FILES.characters, []),
  ]);

  galleryData = gallery;
  charactersData = characters;
}

function getTranslationValue(key) {
  return key.split(".").reduce((accumulator, chunk) => {
    if (accumulator && typeof accumulator === "object") {
      return accumulator[chunk];
    }
    return undefined;
  }, i18nMessages);
}

function t(key, fallback = "") {
  const value = getTranslationValue(key);
  return typeof value === "string" ? value : fallback;
}

function getLocalizedValue(value, locale = currentLocale) {
  if (typeof value === "string") return value;

  if (value && typeof value === "object") {
    if (typeof value[locale] === "string") return value[locale];
    if (typeof value["pt-BR"] === "string") return value["pt-BR"];

    const firstString = Object.values(value).find(
      (item) => typeof item === "string"
    );

    if (firstString) return firstString;
  }

  return "";
}

async function loadLocaleMessages(locale) {
  const normalized = normalizeLocale(locale);

  try {
    const response = await fetch(`${I18N_BASE_PATH}/${normalized}.json`, {
      cache: "no-store",
    });
    if (!response.ok) throw new Error("locale-not-found");
    return await response.json();
  } catch {
    if (normalized !== "pt-BR") {
      try {
        const fallbackResponse = await fetch(`${I18N_BASE_PATH}/pt-BR.json`, {
          cache: "no-store",
        });
        if (fallbackResponse.ok) return await fallbackResponse.json();
      } catch {
        return {};
      }
    }

    return {};
  }
}

function applyI18nToDom() {
  document.documentElement.lang = currentLocale.toLowerCase();

  document.title = t("meta.title", document.title);

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      t("meta.description", metaDescription.getAttribute("content") || "")
    );
  }

  const metaOgDescription = document.querySelector(
    'meta[property="og:description"]'
  );
  if (metaOgDescription) {
    metaOgDescription.setAttribute(
      "content",
      t(
        "meta.ogDescription",
        metaOgDescription.getAttribute("content") || ""
      )
    );
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (!key) return;
    element.textContent = t(key, element.textContent || "");
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const key = element.getAttribute("data-i18n-html");
    if (!key) return;
    element.innerHTML = t(key, element.innerHTML || "");
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    const attrMap = element.getAttribute("data-i18n-attr");
    if (!attrMap) return;

    attrMap.split(",").forEach((pair) => {
      const [attrName, key] = pair.split(":").map((part) => part.trim());
      if (!attrName || !key) return;

      const currentValue = element.getAttribute(attrName) || "";
      element.setAttribute(attrName, t(key, currentValue));
    });
  });

  if (languageDropdownValue) {
    languageDropdownValue.textContent =
      currentLocale === "en-US" ? "English (US)" : "Português (BR)";
  }

  if (languageDropdownOptions) {
    languageDropdownOptions.forEach((option) => {
      const isActive = option.getAttribute("data-lang") === currentLocale;
      option.classList.toggle("active", isActive);
      option.setAttribute("aria-selected", String(isActive));
      option.tabIndex = isActive ? 0 : -1;
    });
  }
}

function renderGallery() {
  if (!galleryContainer) return;

  galleryContainer.innerHTML = "";

  galleryData.forEach((imgData, index) => {
    const altText = getLocalizedValue(imgData.alt);

    const figure = document.createElement("figure");
    figure.className = "gallery-item";

    const img = document.createElement("img");
    img.src = `img/galeria/${imgData.src}`;
    img.alt = altText;
    img.loading = "lazy";
    img.decoding = "async";
    img.style.cursor = "pointer";
    img.addEventListener("click", () => openModal(index));

    const caption = document.createElement("figcaption");
    caption.textContent = altText;

    figure.appendChild(img);
    figure.appendChild(caption);
    galleryContainer.appendChild(figure);
  });
}

function renderCharacters() {
  if (!charactersContainer) return;

  charactersContainer.innerHTML = "";

  charactersData.forEach((char) => {
    const description = getLocalizedValue(char.description);

    const article = document.createElement("article");
    article.className = "character-card";
    article.innerHTML = `
      <img src="img/personagens/${char.image}" alt="${char.name} - Tales of Bloomrise" />
      <h3>${char.name}</h3>
      <p>${description}</p>
    `;
    charactersContainer.appendChild(article);
  });

  const oldSchemaScript = document.getElementById("characters-schema");
  if (oldSchemaScript) oldSchemaScript.remove();

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Tales of Bloomrise",
    character: charactersData.map((char) => ({
      "@type": "VideoGameCharacter",
      name: char.name,
      description: getLocalizedValue(char.description),
      image: `https://talesofbloomrise.com/img/personagens/${char.image}`,
    })),
  };

  const schemaScript = document.createElement("script");
  schemaScript.id = "characters-schema";
  schemaScript.type = "application/ld+json";
  schemaScript.text = JSON.stringify(schemaData, null, 2);
  document.head.appendChild(schemaScript);

  updateMaskClasses(charactersContainer);
}

function rerenderLocalizedData() {
  renderGallery();
  renderCharacters();

  if (currentIndex >= 0 && currentIndex < galleryData.length) {
    const currentImage = galleryData[currentIndex];
    const localizedAlt = getLocalizedValue(currentImage.alt);
    modalImg.alt = localizedAlt;
    if (modalCaption) modalCaption.textContent = localizedAlt;
  }
}

function openLanguageDropdown() {
  if (!languageDropdown || !languageDropdownMenu || !languageDropdownButton) return;

  languageDropdown.classList.add("open");
  languageDropdownMenu.hidden = false;
  languageDropdownButton.setAttribute("aria-expanded", "true");
}

function closeLanguageDropdown() {
  if (!languageDropdown || !languageDropdownMenu || !languageDropdownButton) return;

  languageDropdown.classList.remove("open");
  languageDropdownMenu.hidden = true;
  languageDropdownButton.setAttribute("aria-expanded", "false");
}

function toggleLanguageDropdown() {
  if (!languageDropdownMenu || languageDropdownMenu.hidden) {
    openLanguageDropdown();
  } else {
    closeLanguageDropdown();
  }
}

async function chooseLanguage(locale) {
  await setLanguage(locale, { persist: true, rerender: true });
  closeLanguageDropdown();
}

async function setLanguage(locale, { persist = true, rerender = true } = {}) {
  currentLocale = normalizeLocale(locale);
  i18nMessages = await loadLocaleMessages(currentLocale);

  applyI18nToDom();

  if (persist) {
    saveLocale(currentLocale);
  }

  if (rerender) {
    rerenderLocalizedData();
  }
}

function showLanguageGate() {
  if (!languageGate) return;
  languageGate.classList.add("show");
  languageGate.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function hideLanguageGate() {
  if (!languageGate) return;
  languageGate.classList.remove("show");
  languageGate.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

function setupLanguageGate() {
  if (!languageGate || languageGateButtons.length === 0) return;

  languageGateButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const locale = button.getAttribute("data-lang") || "pt-BR";
      await setLanguage(locale, { persist: true, rerender: true });
      hideLanguageGate();
    });
  });
}

function setupLanguageFooterSelector() {
  if (!languageDropdown || !languageDropdownButton || !languageDropdownMenu) {
    return;
  }

  languageDropdownButton.addEventListener("click", () => {
    toggleLanguageDropdown();
  });

  languageDropdownOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const locale = option.getAttribute("data-lang") || "pt-BR";
      chooseLanguage(locale);
    });
  });

  document.addEventListener("click", (event) => {
    if (!languageDropdown.contains(event.target)) {
      closeLanguageDropdown();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!languageDropdownMenu || languageDropdownMenu.hidden) return;

    if (event.key === "Escape") {
      closeLanguageDropdown();
      languageDropdownButton.focus();
    }
  });

  languageDropdownButton.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLanguageDropdown();
      const activeOption = languageDropdownMenu.querySelector(".language-dropdown-option.active") ||
        languageDropdownMenu.querySelector(".language-dropdown-option[data-lang]");
      activeOption?.focus();
    }
  });

  languageDropdownOptions.forEach((option) => {
    option.addEventListener("keydown", async (event) => {
      const currentIndex = Array.from(languageDropdownOptions).indexOf(option);

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const nextOption = languageDropdownOptions[currentIndex + 1] || languageDropdownOptions[0];
        nextOption.focus();
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        const previousOption = languageDropdownOptions[currentIndex - 1] || languageDropdownOptions[languageDropdownOptions.length - 1];
        previousOption.focus();
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const locale = option.getAttribute("data-lang") || "pt-BR";
        await chooseLanguage(locale);
        languageDropdownButton.focus();
      }
    });
  });
}

// ==================== Trailer Section (opcional) ====================
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

// ==================== Parallax suave ====================
const bg = document.querySelector(".parallax-bg");
let targetY = 0;
let currentY = 0;

window.addEventListener("scroll", () => {
  if (!bg) return;

  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;
  const bgHeight = bg.clientHeight;

  const maxScroll = docHeight - windowHeight;
  const maxTranslateY = windowHeight - bgHeight;
  const scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0;

  targetY = Math.max(maxTranslateY * scrollPercent, maxTranslateY);

  if (!isAnimating) {
    isAnimating = true;
    requestAnimationFrame(animate);
  }
});

function animate() {
  if (!bg) {
    isAnimating = false;
    return;
  }

  if (Math.abs(targetY - currentY) < 0.1) {
    currentY = targetY;
    bg.style.transform = `translateY(${currentY}px)`;
    isAnimating = false;
    return;
  }

  currentY += (targetY - currentY) * 0.1;
  bg.style.transform = `translateY(${currentY}px)`;
  requestAnimationFrame(animate);
}

// ==================== Menu lateral (mobile) ====================
function toggleMenu() {
  if (!sideNav || !menuToggle || !overlay) return;

  const isExpanded = sideNav.classList.toggle("open");
  menuToggle.classList.toggle("active");
  changeMenuIcon();
  overlay.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", String(isExpanded));
}

if (menuToggle) {
  menuToggle.addEventListener("click", toggleMenu);
}

function changeMenuIcon() {
  if (!menuToggleImg || !sideNav) return;

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

if (overlay) {
  overlay.addEventListener("click", toggleMenu);
}

if (sideNav) {
  sideNav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (sideNav.classList.contains("open")) {
        toggleMenu();
      }
    });
  });
}

// ==================== Botao voltar ao topo ====================
if (backToTopButton) {
  window.addEventListener("scroll", () => {
    backToTopButton.classList.toggle("show", window.scrollY > 500);
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ==================== Scroll spy para destacar secao ativa ====================
const allNavLinks = [
  ...document.querySelectorAll('#main-nav a[href^="#"]'),
  ...document.querySelectorAll('.side-nav a[href^="#"]'),
];

function setActiveNavLink(sectionId) {
  allNavLinks.forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === `#${sectionId}`);
  });
}

const observedSections = document.querySelectorAll("main section[id]");
if (observedSections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visibleEntry?.target?.id) {
        setActiveNavLink(visibleEntry.target.id);
      }
    },
    {
      root: null,
      rootMargin: "-30% 0px -55% 0px",
      threshold: [0.1, 0.3, 0.6],
    }
  );

  observedSections.forEach((section) => observer.observe(section));
}

// ==================== Nav background change on scroll ====================
const navBur = document.getElementById("nav-bur");

window.addEventListener("load", () => {
  if (!navBur) return;

  const triggerPoint = navBur.getBoundingClientRect().top + window.scrollY;

  window.addEventListener("scroll", () => {
    if (window.scrollY >= triggerPoint) {
      navBur.classList.add("fixed-nav");
    } else {
      navBur.classList.remove("fixed-nav");
    }
  });
});

// ==================== Mascaras de scroll ====================
function updateMaskClasses(container) {
  if (!container) return;

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

if (charactersContainer) {
  charactersContainer.addEventListener("scroll", () => {
    updateMaskClasses(charactersContainer);
  });
}

// ==================== Modal da galeria ====================
function openModal(index) {
  currentIndex = index;
  const currentImage = galleryData[currentIndex];

  if (currentImage) {
    const localizedAlt = getLocalizedValue(currentImage.alt);
    modalImg.src = `img/galeria/${currentImage.src}`;
    modalImg.alt = localizedAlt;
    if (modalCaption) modalCaption.textContent = localizedAlt;
  } else {
    modalImg.src = "";
    modalImg.alt = t("modal.notFound", "Imagem não encontrada");
    if (modalCaption) modalCaption.textContent = "";
  }

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  zoomed = false;
  modalImg.classList.remove("zoomed");
  updateNavButtons();
  modal.focus();
}

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  zoomed = false;
  modalImg.classList.remove("zoomed");
}

function updateNavButtons() {
  modalPrev.classList.toggle("disabled", currentIndex <= 0);
  modalNext.classList.toggle("disabled", currentIndex >= galleryData.length - 1);
}

function showNext() {
  if (currentIndex < galleryData.length - 1) {
    openModal(currentIndex + 1);
  }
}

function showPrev() {
  if (currentIndex > 0) {
    openModal(currentIndex - 1);
  }
}

if (modalClose) modalClose.addEventListener("click", closeModal);
if (modalNext) modalNext.addEventListener("click", showNext);
if (modalPrev) modalPrev.addEventListener("click", showPrev);

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
}

if (modalImg) {
  modalImg.addEventListener("dblclick", () => {
    zoomed = !zoomed;
    modalImg.classList.toggle("zoomed", zoomed);
  });
}

window.addEventListener("keydown", (event) => {
  if (!modal || !modal.classList.contains("show")) return;

  switch (event.key) {
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
      event.preventDefault();
      break;
  }
});

async function initSite() {
  await loadDataFiles();

  const storedLocale = getStoredLocale();

  if (storedLocale) {
    await setLanguage(storedLocale, { persist: false, rerender: false });
  } else {
    await setLanguage(getBrowserLocale(), { persist: false, rerender: false });
  }

  renderGallery();
  renderCharacters();
  setupLanguageFooterSelector();
  setupLanguageGate();

  if (!storedLocale) {
    showLanguageGate();
  }

  updateMaskClasses(charactersContainer);
}

initSite();
