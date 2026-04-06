<div align="center">
  <a href="https://talesofbloomrise.com/" target="_blank">
    <img src="img/logo.png" alt="Tales of Bloomrise Logo" width="500"/>
  </a>
</div>

<h1 align="center">Site Oficial de Tales of Bloomrise</h1>

<div align="center">

Este é o repositório do código-fonte do site oficial de **Tales of Bloomrise**, um RPG de aventura em pixel art.

[![Site](https://img.shields.io/badge/Acesse_o_Site-talesofbloomrise.com-blue?style=for-the-badge&logo=google-chrome&logoColor=white)](https://talesofbloomrise.com/)
[![Licença](https://img.shields.io/badge/Licença-MIT-green?style=for-the-badge)](LICENSE)

</div>

## 🌱 Sobre o Projeto

Este repositório contém todo o código (HTML, CSS e JavaScript) da landing page oficial de **Tales of Bloomrise**. O site é uma página estática, construída sem frameworks, para ser leve, rápida e altamente otimizada para SEO (Search Engine Optimization).

O jogo, **Tales of Bloomrise**, é um RPG brasileiro em pixel art que combina exploração de dungeons com a vida em uma vila cheia de personagens únicos.

## ✨ Recursos do Site

O código deste site, embora simples, inclui alguns recursos interessantes:

* **🎨 Design Temático:** A interface, botões e fontes foram escolhidos para refletir a estética pixel art e retrô do jogo.
* **📜 Devlog Dinâmico:** As entradas do devlog são carregadas automaticamente de `data/devlogs.json` (quando existir conteúdo) e, em caso de ausência/erro, usam um fallback no `script.js`.
* **🏷️ Tags Automáticas:** O script do devlog analisa o conteúdo de cada postagem e aplica tags (com ícones) automaticamente com base em palavras-chave.
* **🖼️ Galeria Modal:** Uma galeria de imagens leve com um modal de visualização que inclui navegação por setas, teclado (Esc, setas) e zoom por duplo clique.
* **✨ Efeito Parallax:** Um efeito de parallax suave no background, controlado por `requestAnimationFrame` para melhor performance.
* **📱 Responsivo:** Um menu lateral (`side-nav`) garante que o site seja fácil de navegar em dispositivos móveis.
* **🚀 Otimizado para SEO:** O HTML inclui um conjunto completo de meta tags (Open Graph, Twitter Cards) e dados estruturados `Schema.org (application/ld+json)` para garantir a melhor aparência nos resultados de busca do Google e em redes sociais.

## 🛠️ Feito Com

Este projeto foi construído com tecnologias web fundamentais, sem dependência de bibliotecas ou frameworks externos.

* [HTML5](https://developer.mozilla.org/pt-BR/docs/Web/Guide/HTML/HTML5)
* [CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS) (com Variáveis, Grid e Flexbox)
* [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) (ES6+ Vanilla)

## 🚀 Como Executar Localmente

Como este é um site estático, você não precisa de um servidor complexo.

1.  Clone o repositório:
    ```sh
    git clone [https://github.com/joseminelli/SiteBloomrise.git](https://github.com/joseminelli/SiteBloomrise.git)
    ```
2.  Navegue até a pasta do projeto:
    ```sh
    cd SiteBloomrise
    ```
3.  Abra o arquivo `index.html` diretamente no seu navegador de preferência.

E é isso! Qualquer alteração feita nos arquivos `.html`, `.css` ou `.js` será refletida ao atualizar a página.

## 📝 Devlogs automáticos

Você pode publicar devlogs sem editar o `script.js`, apenas alimentando o arquivo `data/devlogs.json`.

Formato esperado:

```json
[
  {
    "date": "2026-04-06",
    "title": "Atualização 1.5.0.0",
    "content": "Novo bioma, melhorias de performance e correções de bugs."
  }
]
```

Regras:

* `date`: string no formato `YYYY-MM-DD`
* `title`: título da atualização
* `content`: texto (aceita HTML simples como `<br>`)

Se `data/devlogs.json` estiver vazio (`[]`) ou indisponível, o site usa automaticamente os devlogs fallback já existentes no `script.js`.

## 🔗 Links do Jogo

* **🎮 Google Play Store:** [Baixe Tales of Bloomrise](https://play.google.com/store/apps/details?id=com.minelli.talesofbloomrise)
* **💬 Comunidade no Discord:** [Junte-se ao nosso Discord](https://discord.gg/4QSxuG7RK7)

---

© 2025 Whiskline Studio
