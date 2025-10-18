// portfolio.js — Fully Fixed (2025 release)
// Handles main + inner tabs, accessibility, smooth scroll & reveal animations

document.addEventListener("DOMContentLoaded", () => {

  /* ===== TOP-LEVEL TABS ===== */
  const tabs = Array.from(document.querySelectorAll(".tab-btn"));
  const contents = Array.from(document.querySelectorAll(".tab-content"));

  if (tabs.length && contents.length) {
    // Initialize first tab as active
    tabs.forEach((tab, i) => {
      const panel = contents[i];
      const active = i === 0;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", active);
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-hidden", !active);
      tab.classList.toggle("active", active);
      panel.classList.toggle("active", active);
    });

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => activateTab(i));
      tab.addEventListener("keydown", (e) => {
        const key = e.key;
        if (key === "ArrowLeft" || key === "ArrowUp") tabs[(i - 1 + tabs.length) % tabs.length].focus();
        else if (key === "ArrowRight" || key === "ArrowDown") tabs[(i + 1) % tabs.length].focus();
        else if (key === "Enter" || key === " ") activateTab(i);
      });
    });

    function activateTab(index) {
      tabs.forEach((t, i) => {
        const panel = contents[i];
        const active = i === index;
        t.classList.toggle("active", active);
        t.setAttribute("aria-selected", active);
        panel.classList.toggle("active", active);
        panel.setAttribute("aria-hidden", !active);
      });

      // Smooth scroll to hero section for context on mobile
      document.querySelector(".portfolio-hero")?.scrollIntoView({ behavior: "smooth", block: "start" });

      // Rebind inner tabs for the active section
      const activePanel = contents[index];
      if (activePanel.querySelector(".inner-tabs")) {
        setupInnerTabs(activePanel);
      }

      runRevealObserver();
    }
  }

  /* ===== INNER-TABS (Scoped per Section) ===== */
  function setupInnerTabs(section) {
    const innerTabs = Array.from(section.querySelectorAll(".inner-tab-btn"));
    const innerContents = Array.from(section.querySelectorAll(".inner-tab-content"));
    if (!innerTabs.length || !innerContents.length) return;

    // Reset all
    innerTabs.forEach(btn => btn.classList.remove("active"));
    innerContents.forEach(c => {
      c.classList.remove("active");
      c.setAttribute("aria-hidden", "true");
    });

    // Activate the first inner tab
    innerTabs[0].classList.add("active");
    innerContents[0].classList.add("active");
    innerContents[0].setAttribute("aria-hidden", "false");

    // Add event listeners (use data-inner-tab mapping)
    innerTabs.forEach(btn => {
      const targetId = btn.getAttribute("data-inner-tab");
      const panel = section.querySelector(`#${targetId}`);
      if (!panel) return;

      btn.addEventListener("click", () => {
        innerTabs.forEach(b => b.classList.remove("active"));
        innerContents.forEach(pc => {
          pc.classList.remove("active");
          pc.setAttribute("aria-hidden", "true");
        });

        btn.classList.add("active");
        panel.classList.add("active");
        panel.setAttribute("aria-hidden", "false");

        console.log("Inner tab switched →", targetId);
        runRevealObserver();
      });
    });
  }

  // Initialize inner-tabs for default active section (first one)
  const initialActive = document.querySelector(".tab-content.active");
  if (initialActive && initialActive.querySelector(".inner-tabs")) {
    setupInnerTabs(initialActive);
  }

  /* ===== CLICKABLE PROJECT CARDS ===== */
  document.querySelectorAll(".project-card").forEach((card) => {
    const href = card.getAttribute("data-detail");
    if (!href) return;
    const openDetail = () => (window.location.href = href);

    card.addEventListener("click", openDetail);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openDetail();
      }
    });
  });

  /* ===== REVEAL ANIMATIONS ===== */
  function runRevealObserver() {
    const cards = document.querySelectorAll(".tab-content.active .project-card, .inner-tab-content.active .project-card");
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const containerCards = Array.from(entry.target.parentElement.querySelectorAll(".project-card"));
          containerCards.forEach((c, i) => {
            if (!c.classList.contains("revealed")) {
              setTimeout(() => c.classList.add("revealed"), i * 100);
            }
          });
          obs.disconnect();
        }
      });
    }, { threshold: 0.12 });

    cards.forEach((card) => observer.observe(card));
  }

  runRevealObserver();
  window.addEventListener("resize", runRevealObserver);
});
