// ============================================
// header.js — Shared Dynamic Header Injection
// ============================================

(function () {
  const NAV_LINKS = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About Me" },
    { href: "career.html", label: "Professional Career" },
    { href: "education.html", label: "Education" },
    { href: "certifications.html", label: "Certifications" },
    { href: "portfolio.html", label: "Portfolio" },
    { href: "contact.html", label: "Contact" }
  ];

  function createHeaderHTML() {
    return `
      <nav class="navbar" role="navigation" aria-label="Main navigation">
        <button class="hamburger" aria-label="Open menu" aria-expanded="false">
          <span class="bar"></span><span class="bar"></span><span class="bar"></span>
        </button>
        <ul class="nav-list">
          ${NAV_LINKS.map(link => `<li><a href="${link.href}">${link.label}</a></li>`).join("")}
        </ul>
      </nav>
      <div class="nav-overlay" aria-hidden="true"></div>
    `;
  }

  function getCurrentPage() {
    const path = window.location.pathname;
    let file = path.substring(path.lastIndexOf("/") + 1);
    if (!file) file = "index.html";
    return file;
  }

  function highlightActiveLink(header) {
    const current = getCurrentPage();
    const links = header.querySelectorAll(".nav-list a");
    links.forEach(link => {
      const hrefFile = link.getAttribute("href").split("/").pop();
      if (hrefFile === current) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  }

  function setupMobileMenu(header) {
    const hamburger = header.querySelector(".hamburger");
    const navList = header.querySelector(".nav-list");
    const overlay = header.querySelector(".nav-overlay");

    function openMenu() {
      header.classList.add("open");
      hamburger.setAttribute("aria-expanded", "true");
      overlay.classList.add("visible");
      document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      header.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      overlay.classList.remove("visible");
      document.body.style.overflow = "";
    }

    hamburger.addEventListener("click", () => {
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      expanded ? closeMenu() : openMenu();
    });

    overlay.addEventListener("click", closeMenu);
    navList.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  function injectHeader() {
    let header = document.querySelector("header");
    if (!header) {
      header = document.createElement("header");
      document.body.prepend(header);
    }
    header.innerHTML = createHeaderHTML();

    highlightActiveLink(header);
    setupMobileMenu(header);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectHeader);
  } else {
    injectHeader();
  }
})();
