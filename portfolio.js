// ===== Portfolio Tabs Logic =====

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".tab-content");

  // Set the first tab active by default
  if (tabs.length > 0) {
    tabs[0].classList.add("active");
    contents[0].classList.add("active");
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      // Remove active states from all tabs & contents
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));

      // Add active states to clicked tab & its corresponding content
      tab.classList.add("active");
      contents[index].classList.add("active");

      // Smooth scroll to top of portfolio content when switching tabs
      const scrollTarget = document.querySelector(".portfolio-hero");
      if (scrollTarget) {
        scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
