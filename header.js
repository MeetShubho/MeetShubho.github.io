// header.js
// Injects a shared, center-aligned header and handles mobile hamburger + active link detection.
// Assumes header.css contains the styles (centered menu, active underline, sticky behavior).
// Keep header.html small — all dynamic so you can change links here.

(function () {
  const NAV_LINKS = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About Me" },
    { href: "career.html", label: "Professional Career" },
    { href: "education.html", label: "Education" },
    { href: "certifications.html", label: "Certifications" },
    { href: "contact.html", label: "Contact" }
  ];

  const MOBILE_BREAKPOINT = 768; // px

  function createHeaderHTML() {
    // commented slot for brand / nav-brand (kept commented as requested)
    // if you want to enable brand later, add: <div class="nav-brand">Subhabrata</div>
    return `
      <nav class="navbar" role="navigation" aria-label="Main navigation">
        <!-- nav-brand slot (commented) -->
        <!-- <div class="nav-brand" aria-hidden="true"><!-- Subhabrata --></div> -->
        <button class="hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="primary-nav">
          <span class="bar"></span><span class="bar"></span><span class="bar"></span>
        </button>

        <ul id="primary-nav" class="nav-list" role="menubar">
          ${NAV_LINKS.map(link => `<li role="none"><a role="menuitem" href="${link.href}">${link.label}</a></li>`).join("")}
        </ul>
      </nav>

      <!-- Mobile overlay (injected here so CSS can style it) -->
      <div class="nav-overlay" aria-hidden="true"></div>
    `;
  }

  function getCurrentPageName() {
    const path = window.location.pathname;
    let filename = path.substring(path.lastIndexOf("/") + 1);
    if (!filename) filename = "index.html";
    return filename;
  }

  function markActiveLink(navRoot) {
    const current = getCurrentPageName();
    const links = navRoot.querySelectorAll("a");
    links.forEach(a => {
      // Normalize: compare just filename portion
      const href = a.getAttribute("href") || "";
      const hrefFile = href.split("/").pop() || "index.html";
      if (hrefFile === current) {
        a.classList.add("active"); // header.css should style .active as underline + color
        a.setAttribute("aria-current", "page");
      } else {
        a.classList.remove("active");
        a.removeAttribute("aria-current");
      }
    });
  }

  function setupHamburgerBehavior(navRoot) {
    const hamburger = navRoot.querySelector(".hamburger");
    const navList = navRoot.querySelector(".nav-list");
    const overlay = document.querySelector(".nav-overlay");

    if (!hamburger || !navList) return;

    function openMenu() {
      navRoot.classList.add("open");
      hamburger.setAttribute("aria-expanded", "true");
      overlay.style.display = "block";
      // Allow CSS transitions; focus the first link for accessibility
      const firstLink = navList.querySelector("a");
      if (firstLink) firstLink.focus();
      document.body.style.overflow = "hidden"; // prevent background scroll on mobile
    }

    function closeMenu() {
      navRoot.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      overlay.style.display = "none";
      document.body.style.overflow = ""; // restore scroll
    }

    hamburger.addEventListener("click", (e) => {
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      if (expanded) closeMenu();
      else openMenu();
    });

    // close when clicking overlay or selecting a link
    overlay.addEventListener("click", closeMenu);
    navRoot.querySelectorAll(".nav-list a").forEach(a => {
      a.addEventListener("click", () => {
        // small delay so anchor navigation still works on single-page test servers
        setTimeout(closeMenu, 80);
      });
    });

    // close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navRoot.classList.contains("open")) {
        closeMenu();
      }
    });

    // if window resized beyond mobile, ensure menu closed
    window.addEventListener("resize", () => {
      if (window.innerWidth > MOBILE_BREAKPOINT && navRoot.classList.contains("open")) {
        closeMenu();
      }
    });
  }

  function insertHeader() {
    // If there is already a <header> element in the page, replace its contents.
    // Otherwise create one and prepend to body.
    let headerEl = document.querySelector("header");
    const headerHTML = createHeaderHTML();

    if (headerEl) {
      headerEl.innerHTML = headerHTML;
    } else {
      headerEl = document.createElement("header");
      headerEl.innerHTML = headerHTML;
      document.body.insertBefore(headerEl, document.body.firstChild);
    }

    // mark active link
    const navRoot = headerEl.querySelector(".navbar");
    if (navRoot) markActiveLink(navRoot);

    // Setup hamburger and overlay
    setupHamburgerBehavior(navRoot);

    // Enhance keyboard accessibility: trap focus when menu open (lightweight)
    setupFocusTrap(navRoot);
  }

  // Lightweight focus trap for mobile menu to improve keyboard nav
  function setupFocusTrap(navRoot) {
    const hamburger = navRoot.querySelector(".hamburger");
    const navList = navRoot.querySelector(".nav-list");
    const focusableSelector = 'a, button';
    let firstFocusable = null;
    let lastFocusable = null;

    function updateFocusables() {
      const focusables = navList.querySelectorAll(focusableSelector);
      firstFocusable = focusables[0];
      lastFocusable = focusables[focusables.length - 1];
    }

    navRoot.addEventListener("keydown", (e) => {
      if (!navRoot.classList.contains("open")) return;
      if (e.key !== "Tab") return;
      updateFocusables();
      if (!firstFocusable || !lastFocusable) return;

      if (e.shiftKey && document.activeElement === firstFocusable) {
        // shift+tab on first => move focus to last
        e.preventDefault();
        lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        // tab on last => move focus to first
        e.preventDefault();
        firstFocusable.focus();
      }
    });
  }

  // Public init
  function init() {
    insertHeader();

    // Observe DOM mutations in case pages re-render header; re-run active-link detection
    const observer = new MutationObserver(() => {
      const nav = document.querySelector(".navbar");
      if (nav) markActiveLink(nav);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Wait for DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
