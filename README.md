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
* **🌐 Localização integrada:** O site exibe um modal de idioma na primeira visita e salva a preferência do usuário para as próximas sessões.
* **🗂️ Dados em JSON:** Galeria e personagens são carregados de arquivos JSON com suporte a múltiplos idiomas.
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

## 📣 Atualizações do Jogo

As atualizações e patch notes oficiais são publicadas em:

* Discord da comunidade
* Comunidade Steam de Tales of Bloomrise

## 🌐 Localização (i18n)

O site possui suporte a localização com seletor de idioma no topo.

Arquivos de tradução:

* `data/i18n/pt-BR.json`
* `data/i18n/en-US.json`

Como funciona:

* Na primeira visita, o usuário escolhe o idioma em um modal obrigatório.
* Após a escolha inicial, o idioma pode ser alterado pelo seletor no rodapé.
* A escolha manual fica salva no `localStorage`.
* Textos estáticos do HTML (incluindo alguns atributos como `aria-label`) são atualizados automaticamente.
* Conteúdos dinâmicos (ex.: `alt` da galeria e descrições de personagens) também mudam de idioma.

Para adicionar um novo idioma:

1. Crie um novo arquivo em `data/i18n/` (ex.: `es-ES.json`)
2. Duplique a estrutura de chaves existente
3. Adicione o idioma em `SUPPORTED_LOCALES` no `script.js`
4. Inclua a nova opção no seletor `<select id="language-select-footer">` em `index.html`

## 🔗 Links do Jogo

* **🎮 Google Play Store:** [Baixe Tales of Bloomrise](https://play.google.com/store/apps/details?id=com.minelli.talesofbloomrise)
* **💬 Comunidade no Discord:** [Junte-se ao nosso Discord](https://discord.gg/4QSxuG7RK7)

---

© 2025 Whiskline Studio
