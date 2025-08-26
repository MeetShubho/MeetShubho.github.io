// =============================  
// Rotating Roles on Home Page
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const roles = [
    "a Project Manager",
    "a Program Manager",
    "an Agile Coach", // fixed grammar here
    "a Product Manager",
    "an AI/ML Enthusiast",
    "a Father"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const delayBetweenRoles = 1500;
  const roleElement = document.querySelector(".role-highlight");

  function typeRole() {
    if (!roleElement) return; // If element not found, skip
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      roleElement.textContent = currentRole.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        charIndex = 0; // reset index when switching roles
        setTimeout(typeRole, typingSpeed);
        return;
      }
    } else {
      roleElement.textContent = currentRole.substring(0, charIndex++);
      if (charIndex > currentRole.length) {
        isDeleting = true;
        setTimeout(typeRole, delayBetweenRoles);
        return;
      }
    }

    setTimeout(typeRole, isDeleting ? erasingSpeed : typingSpeed);
  }

  typeRole();
});

// =============================
// Scroll Animations
// =============================
window.addEventListener("scroll", () => {
  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
      el.style.transition = "all 1s ease";
    }
  });

  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      item.classList.add("show");
    }
  });
});
