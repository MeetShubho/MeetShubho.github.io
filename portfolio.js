// ===== Portfolio Tabs Logic (Outer + Inner) =====

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Outer Tabs ---------- */
  const outerTabs = document.querySelectorAll(".tab-btn");
  const outerContents = document.querySelectorAll(".tab-content");

  // Activate first outer tab by default
  if (outerTabs.length > 0) {
    outerTabs[0].classList.add("active");
    outerContents[0].classList.add("active");
  }

  outerTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      // Reset all outer tabs & contents
      outerTabs.forEach((t) => t.classList.remove("active"));
      outerContents.forEach((c) => c.classList.remove("active"));

      // Activate clicked outer tab
      tab.classList.add("active");
      outerContents[index].classList.add("active");

      // Smooth scroll back to the hero section
      const scrollTarget = document.querySelector(".portfolio-hero");
      if (scrollTarget) {
        scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ---------- Inner Tabs (Product Management only) ---------- */
  const innerTabs = document.querySelectorAll(".inner-tab-btn");
  const innerContents = document.querySelectorAll(".inner-tab-content");

  if (innerTabs.length > 0) {
    // Activate first inner tab by default
    innerTabs[0].classList.add("active");
    innerContents[0].classList.add("active");

    innerTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        // Reset inner tabs & contents
        innerTabs.forEach((t) => t.classList.remove("active"));
        innerContents.forEach((c) => c.classList.remove("active"));

        // Activate clicked inner tab
        tab.classList.add("active");
        innerContents[index].classList.add("active");

        // Optional: smooth scroll to the start of Product Management content
        const productSection = document.querySelector(".tab-content.active");
        if (productSection) {
          productSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }
});
