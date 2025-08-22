// -------- Roles Typing Animation --------
const roles = [
  "Project Manager",
  "Program Manager",
  "Agile Coach",
  "Product Manager",
  "AI/ML Enthusiast",
  "Father"
];

let roleIndex = 0;
let charIndex = 0;
let currentRole = "";
let isDeleting = false;
const roleElement = document.getElementById("roles");

function typeEffect() {
  if (isDeleting) {
    currentRole = roles[roleIndex].substring(0, charIndex--);
  } else {
    currentRole = roles[roleIndex].substring(0, charIndex++);
  }

  roleElement.innerHTML = `<span>${currentRole}</span>`;

  let typingSpeed = isDeleting ? 80 : 120;

  if (!isDeleting && charIndex === roles[roleIndex].length) {
    typingSpeed = 1500; // Pause before deleting
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 500; // Pause before typing next role
  }

  setTimeout(typeEffect, typingSpeed);
}

// Start animation after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});
