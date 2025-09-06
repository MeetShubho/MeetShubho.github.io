document.addEventListener("DOMContentLoaded", () => {
  // =============================
  // Rotating Roles (Hero Section)
  // =============================
  const roles = ["a Program Manager", "a Product Manager", "an Agile Coach"];
  let roleIndex = 0, charIndex = 0, isDeleting = false;
  const typingSpeed = 100, erasingSpeed = 50, delayBetweenRoles = 1200;
  const roleElement = document.querySelector(".role-highlight");

  function typeRole() {
    if (!roleElement) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      roleElement.textContent = currentRole.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
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

  // =============================
  // Fade-in for Hero Subhead
  // =============================
  const subhead = document.querySelector(".hero-subhead");
  setTimeout(() => {
    if (subhead) subhead.classList.add("visible");
  }, 2000);

  // =============================
  // Certifications Scroll Reveal
  // =============================
  const certItems = document.querySelectorAll(".cert-item");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  const revealCertItem = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  };

  if (certItems.length > 0) {
    const observer = new IntersectionObserver(revealCertItem, observerOptions);
    certItems.forEach(item => observer.observe(item));
  }
});

// =============================
// Global Scroll Animations
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
