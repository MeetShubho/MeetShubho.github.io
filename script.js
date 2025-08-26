// =============================  
// Rotating Roles on Home Page
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const roles = [
    "a Project Manager",
    "a Program Manager",
    "an Agile Coach",
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
    if (!roleElement) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      roleElement.textContent = currentRole.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        charIndex = 0;
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
  // Fade-in animations
  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
      el.style.transition = "all 1s ease";
    }
  });

  // Timeline items (career, education, certifications, etc.)
  const scrollItems = document.querySelectorAll(".timeline-item, .cert-item");
  scrollItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      item.classList.add("show");
    }
  });
});
