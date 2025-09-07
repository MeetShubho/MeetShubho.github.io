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
  // Scroll Reveal for Certifications & Career
  // =============================
  const revealItems = document.querySelectorAll(".cert-item, .career-item");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  const revealItem = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  };

  if (revealItems.length > 0) {
    const observer = new IntersectionObserver(revealItem, observerOptions);
    revealItems.forEach(item => observer.observe(item));
  }

  // =============================
  // Career Toggle Buttons
  // =============================
  document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      content.classList.toggle("active");
      btn.textContent = content.classList.contains("active") 
        ? "Show Less" 
        : "Show More";
    });
  });
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

  // Timeline line animation
  const timelineLine = document.querySelector(".timeline-line");
  if (timelineLine) {
    const timeline = document.querySelector(".career-timeline");
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const visibleHeight = Math.min(windowHeight - rect.top, rect.height);
      timelineLine.style.height = `${visibleHeight}px`;
    }
  }
});
