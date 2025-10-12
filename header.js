// =============================
// Dynamic Header Injection
// =============================

document.addEventListener("DOMContentLoaded", () => {
  const headerHTML = `
    <nav class="navbar">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About Me</a></li>
        <li><a href="career.html">Professional Career</a></li>
        <li><a href="education.html">Education</a></li>
        <li><a href="certifications.html">Certifications</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
      <div class="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  `;

  document.body.insertAdjacentHTML("afterbegin", headerHTML);

  // Highlight current page
  const currentPath = window.location.pathname.split("/").pop();
  document.querySelectorAll(".navbar a").forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });

  // Scroll shadow
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  });

  // Hamburger functionality
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".navbar ul");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("mobile-active");
    document.body.style.overflow = navMenu.classList.contains("mobile-active")
      ? "hidden"
      : "auto";
  });

  // Close menu when link clicked
  document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("mobile-active");
      document.body.style.overflow = "auto";
    });
  });
});
