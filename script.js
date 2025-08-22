// ---------- Typing animation (I am ...)
const roles = [
  "Project Manager",
  "Program Manager",
  "Agile Coach",
  "Product Manager",
  "AI/ ML Enthusiast",
  "Father"
];
let r = 0, c = 0, node = null;
document.addEventListener('DOMContentLoaded', () => {
  node = document.getElementById('typed-role');
  type();
  revealOnScroll();
  document.getElementById('year').textContent = new Date().getFullYear();
});
function type(){
  const current = roles[r];
  if(c < current.length){
    node.textContent += current[c++];
    setTimeout(type, 90);
  }else{
    setTimeout(erase, 1200);
  }
}
function erase(){
  if(c > 0){
    node.textContent = node.textContent.slice(0, -1);
    c--;
    setTimeout(erase, 45);
  }else{
    r = (r + 1) % roles.length;
    setTimeout(type, 350);
  }
}

// ---------- Reveal on scroll
function revealOnScroll(){
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add('visible'); }
    });
  }, {threshold: .25});
  els.forEach(el => io.observe(el));
}

// ---------- Smooth scroll offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if(target){
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({top: y, behavior:'smooth'});
    }
  });
});
