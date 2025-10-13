// header.js — Shared Sticky Header
// Injects a centered navbar with active underline + mobile dropdown overlay

(function () {
  const NAV_LINKS = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About Me" },
    { href: "career.html", label: "Professional Career" },
    { href: "education.html", label: "Education" },
    { href: "certifications.html", label: "Certifications" },
    { href: "contact.html", label: "Contact" }
  ];

  function createHeaderHTML() {
    return `
      <nav class="navbar" role="navigation" aria-label="Main navigation">
        <button class="hamburger" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>

        <ul class="nav-list" id="primary-nav">
          ${NAV_LINKS.map(link => `<li><a href="${link.href}">${link.label}</a></li>`).join("")}
        </ul>
      </nav>
      <div class="nav-overlay" aria-hidden="true"></div>
    `;
  }

  function markActiveLink(navRoot) {
    const current = window.location.pathname.split("/").pop() || "index.html";
    navRoot.querySelectorAll("a").forEach(a => {
      const href = a.getAttribute("href");
      if (href && href.endsWith(current)) {
        a.classList.add("active");
      }
    });
  }

  function setupMenuBehavior(navbar) {
    const hamburger = navbar.querySelector(".hamburger");
    const overlay = document.querySelector(".nav-overlay");

    hamburger.addEventListener("click", () => {
      const isOpen = navbar.classList.toggle("open");
      hamburger.classList.toggle("active", isOpen);
      hamburger.setAttribute("aria-expanded", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    overlay.addEventListener("click", () => {
      navbar.classList.remove("open");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });

    // Close menu on link click (for mobile)
    navbar.querySelectorAll(".nav-list a").forEach(link => {
      link.addEventListener("click", () => {
        navbar.classList.remove("open");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  function initHeader() {
    let headerEl = document.querySelector("header");
    const headerHTML = createHeaderHTML();

    if (!headerEl) {
      headerEl = document.createElement("header");
      document.body.prepend(headerEl);
    }
    headerEl.innerHTML = headerHTML;

    const navbar = headerEl.querySelector(".navbar");
    markActiveLink(navbar);
    setupMenuBehavior(navbar);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeader);
  } else {
    initHeader();
  }
})();
