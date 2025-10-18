// portfolio.js — Stable & Fixed (Product Teardowns Click Issue Solved)
// Handles main tabs, nested inner tabs, accessibility, and card animations.

document.addEventListener("DOMContentLoaded", () => {
  /* ===== TOP-LEVEL TABS ===== */
  const tabs = Array.from(document.querySelectorAll(".tab-btn"));
  const contents = Array.from(document.querySelectorAll(".tab-content"));

  if (tabs.length && contents.length) {
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
        if (["ArrowLeft", "ArrowUp"].includes(e.key))
          tabs[(i - 1 + tabs.length) % tabs.length].focus();
        else if (["ArrowRight", "ArrowDown"].includes(e.key))
          tabs[(i + 1) % tabs.length].focus();
        else if (["Enter", " "].includes(e.key))
          activateTab(i);
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

      // Scroll to hero for context (mobile)
      document.querySelector(".portfolio-hero")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Reset nested inner tabs for this section only
      const activeSection = contents[index];
      resetInnerTabs(activeSection);

      // Trigger reveal animations
      runRevealObserver();
    }
  }

  /* ===== INNER TABS (Scoped properly) ===== */
  function initInnerTabs() {
    document.querySelectorAll(".tab-content").forEach((section) => {
      const innerTabs = section.querySelectorAll(".inner-tab-btn");
      const innerContents = section.querySelectorAll(".inner-tab-content");

      if (!innerTabs.length || !innerContents.length) return;

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

          // Refresh animations when switching inner tabs
          runRevealObserver();
        });
      });
    });
  }

  function resetInnerTabs(section) {
    if (!section) return;
    const innerTabs = section.querySelectorAll(".inner-tab-btn");
    const innerContents = section.querySelectorAll(".inner-tab-content");
    innerTabs.forEach((btn, i) => {
      const active = i === 0;
      btn.classList.toggle("active", active);
      innerContents[i].classList.toggle("active", active);
      innerContents[i].setAttribute("aria-hidden", !active);
    });
  }

  initInnerTabs();

  /* ===== CLICKABLE PROJECT CARDS ===== */
  document.querySelectorAll(".project-card").forEach((card) => {
    const href = card.getAttribute("data-detail");
    if (!href) return;

    const openDetail = () => (window.location.href = href);

    card.addEventListener("click", openDetail);
    card.addEventListener("keydown", (e) => {
      if (["Enter", " "].includes(e.key)) {
        e.preventDefault();
        openDetail();
      }
    });
  });

  /* ===== REVEAL ANIMATION ===== */
  function runRevealObserver() {
    const cards = document.querySelectorAll(
      ".tab-content.active .project-card, .inner-tab-content.active .project-card"
    );
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const siblings = Array.from(
              entry.target.parentElement.querySelectorAll(".project-card")
            );
            siblings.forEach((c, i) => {
              if (!c.classList.contains("revealed")) {
                setTimeout(() => c.classList.add("revealed"), i * 100);
              }
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));
  }

  runRevealObserver();
  window.addEventListener("resize", runRevealObserver);
});
