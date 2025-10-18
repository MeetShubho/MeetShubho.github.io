// portfolio.js — Diagnostic Version (2025)
// Logs everything about tab activation and DOM bindings

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM fully loaded. Running portfolio.js diagnostics...");

  /* ===== TOP-LEVEL TABS ===== */
  const tabs = Array.from(document.querySelectorAll(".tab-btn"));
  const contents = Array.from(document.querySelectorAll(".tab-content"));
  console.log("🔹 Found top-level tabs:", tabs.length, "contents:", contents.length);

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
      tab.addEventListener("click", () => {
        console.log("👉 Outer tab clicked:", tab.textContent.trim());
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
        console.log(`   ↳ [Outer ${t.textContent.trim()}] active=${active}`);
      });

      document.querySelector(".portfolio-hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
      resetAllInnerTabs();
      runRevealObserver();
    }
  }

  /* ===== INNER-TABS (Scoped per Section) ===== */
  const allInnerTabGroups = document.querySelectorAll(".inner-tabs");
  console.log("🔹 Found inner-tab groups:", allInnerTabGroups.length);

  allInnerTabGroups.forEach((group, groupIndex) => {
    const innerTabs = group.querySelectorAll(".inner-tab-btn");
    const innerContents = group.parentElement.querySelectorAll(".inner-tab-content");

    console.log(`   ↳ Group ${groupIndex + 1}:`, innerTabs.length, "buttons,", innerContents.length, "contents");

    innerTabs.forEach((btn, i) => {
      const tabName = btn.dataset.innerTab;
      const panel = innerContents[i];
      if (!panel) {
        console.warn(`⚠️ No matching content panel for inner tab '${tabName}' at index ${i}`);
        return;
      }

      const active = i === 0;
      btn.classList.toggle("active", active);
      panel.classList.toggle("active", active);
      panel.setAttribute("aria-hidden", !active);

      btn.addEventListener("click", () => {
        console.log(`👉 Inner tab clicked: '${tabName}' (index ${i})`);
        innerTabs.forEach((b, j) => {
          const isActive = b === btn;
          b.classList.toggle("active", isActive);
          innerContents[j].classList.toggle("active", isActive);
          innerContents[j].setAttribute("aria-hidden", !isActive);
          console.log(`   ↳ [${b.dataset.innerTab}] active=${isActive}`);
        });
        runRevealObserver();
      });
    });
  });

  function resetAllInnerTabs() {
    console.log("🔄 Resetting inner tabs to default (first active)");
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

  /* ===== CARD CLICKABILITY ===== */
  const cards = document.querySelectorAll(".project-card");
  console.log("🔹 Found project cards:", cards.length);
  cards.forEach((card) => {
    const href = card.getAttribute("data-detail");
    if (href) {
      card.addEventListener("click", () => console.log("🧭 Navigating to:", href));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          console.log("🧭 Keyboard nav to:", href);
        }
      });
    }
  });

  /* ===== REVEAL ANIMATION ===== */
  function runRevealObserver() {
    const cards = document.querySelectorAll(".tab-content.active .project-card, .inner-tab-content.active .project-card");
    console.log("✨ Reveal observer running — cards visible:", cards.length);
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

  /* ===== GLOBAL CLICK LOGGER ===== */
  document.addEventListener("click", (e) => {
    if (e.target.matches(".inner-tab-btn")) {
      console.log("🟢 Global listener detected inner-tab click:", e.target.dataset.innerTab);
    }
  });
});
