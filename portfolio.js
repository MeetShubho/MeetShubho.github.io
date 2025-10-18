// portfolio.js — Clean & Stable Version (2025 Optimized)
// Handles tab switching, nested inner-tabs, accessibility, and card animations.

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

    // Handle tab clicks and keyboard navigation
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

      // Smooth scroll for context on mobile
      document.querySelector(".portfolio-hero")?.scrollIntoView({ behavior: "smooth", block: "start" });

      // Reset nested inner-tabs to default state
      resetAllInnerTabs();

      // Trigger animation for newly active section
      runRevealObserver();
    }
  }

  /* ===== INNER-TABS (Scoped per Section) ===== */
  document.querySelectorAll(".tab-content").forEach((section) => {
    const innerTabs = section.querySelectorAll(".inner-tab-btn");
    const innerContents = section.querySelectorAll(".inner-tab-content");

    if (innerTabs.length && innerContents.length) {
      // Initialize defaults
      innerTabs.forEach((btn, i) => {
        const panel = innerContents[i];
        const active = i === 0;
        btn.setAttribute("role", "tab");
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-hidden", !active);
        btn.classList.toggle("active", active);
        panel.classList.toggle("active", active);

        btn.addEventListener("click", () => {
          innerTabs.forEach((b, j) => {
            const isActive = b === btn;
            b.classList.toggle("active", isActive);
            innerContents[j].classList.toggle("active", isActive);
            innerContents[j].setAttribute("aria-hidden", !isActive);
          });
          runRevealObserver();
        });
      });
    }
  });

  function resetAllInnerTabs() {
    document.querySelectorAll(".inner-tabs").forEach((group) => {
      const buttons = group.querySelectorAll(".inner-tab-btn");
      const panels = group.parentElement.querySelectorAll(".inner-tab-content");
      buttons.forEach((btn, i) => {
        const active = i === 0;
        btn.classList.toggle("active", active);
        panels[i].classList.toggle("active", active);
        panels[i].setAttribute("aria-hidden", !active);
      });
    });
  }

  /* ===== MAKE PROJECT CARDS CLICKABLE ===== */
  document.querySelectorAll(".project-card").forEach((card) => {
    const href = card.getAttribute("data-detail");
    if (!href) return;

    const openDetail = () => window.location.href = href;

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
