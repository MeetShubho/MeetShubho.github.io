// portfolio.js
// Tabs + inner-tabs + accessible behavior + staggered reveal + card keyboard click

document.addEventListener("DOMContentLoaded", () => {
  // Top-level tabs
  const tabs = Array.from(document.querySelectorAll(".tab-btn"));
  const contents = Array.from(document.querySelectorAll(".tab-content"));

  // inner tabs
  const innerTabs = Array.from(document.querySelectorAll(".inner-tab-btn"));
  const innerContents = Array.from(document.querySelectorAll(".inner-tab-content"));

  // set initial states (first active)
  if (tabs.length) {
    tabs.forEach((t, i) => {
      const panel = contents[i];
      t.setAttribute("role", "tab");
      if (i === 0) {
        t.classList.add("active");
        t.setAttribute("aria-selected", "true");
        panel.classList.add("active");
        panel.setAttribute("aria-hidden", "false");
      } else {
        t.setAttribute("aria-selected", "false");
        panel.setAttribute("aria-hidden", "true");
      }
    });
  }

  tabs.forEach((tab, idx) => {
    tab.addEventListener("click", () => activateTab(tab, idx));
    tab.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        const prev = tabs[(idx - 1 + tabs.length) % tabs.length];
        prev.focus();
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        const next = tabs[(idx + 1) % tabs.length];
        next.focus();
      } else if (e.key === "Enter" || e.key === " ") {
        activateTab(tab, idx);
      }
    });
  });

  function activateTab(tab, idx) {
    tabs.forEach((t, i) => {
      const panel = contents[i];
      const active = t === tab;
      t.classList.toggle("active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
      panel.classList.toggle("active", active);
      panel.setAttribute("aria-hidden", active ? "false" : "true");
    });

    const hero = document.querySelector(".portfolio-hero");
    if (hero) hero.scrollIntoView({ behavior: "smooth", block: "start" });
    resetInnerTabs();
    runRevealObserver();
  }

  // Inner Tabs logic
  if (innerTabs.length) {
    innerTabs.forEach((btn, i) => {
      btn.setAttribute("role", "tab");
      const panel = innerContents[i];
      if (i === 0) {
        btn.classList.add("active");
        panel.classList.add("active");
        panel.setAttribute("aria-hidden", "false");
      } else {
        panel.setAttribute("aria-hidden", "true");
      }

      btn.addEventListener("click", () => {
        innerTabs.forEach((b, j) => {
          const active = b === btn;
          b.classList.toggle("active", active);
          innerContents[j].classList.toggle("active", active);
          innerContents[j].setAttribute("aria-hidden", active ? "false" : "true");
        });
        runRevealObserver();
      });
    });
  }

  function resetInnerTabs() {
    innerTabs.forEach((b, i) => {
      const panel = innerContents[i];
      if (i === 0) {
        b.classList.add("active");
        panel.classList.add("active");
        panel.setAttribute("aria-hidden", "false");
      } else {
        b.classList.remove("active");
        panel.classList.remove("active");
        panel.setAttribute("aria-hidden", "true");
      }
    });
  }

  // Make cards clickable & keyboard friendly
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
      const href = card.getAttribute("data-detail");
      if (href) window.location.href = href;
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const href = card.getAttribute("data-detail");
        if (href) window.location.href = href;
      }
    });
  });

  // Reveal animation for cards using IntersectionObserver + stagger
  const runRevealObserver = () => {
    const visibleCards = document.querySelectorAll(".tab-content.active .project-card, .inner-tab-content.active .project-card");
    const options = { root: null, rootMargin: "0px", threshold: 0.12 };
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const list = Array.from(entry.target.parentElement.querySelectorAll(".project-card"));
          list.forEach((c, i) => {
            if (!c.classList.contains("revealed")) {
              setTimeout(() => c.classList.add("revealed"), i * 120 + 60);
            }
          });
          obs.disconnect();
        }
      });
    }, options);

    visibleCards.forEach(card => observer.observe(card));
  };

  runRevealObserver();
  window.addEventListener("resize", runRevealObserver);
});
