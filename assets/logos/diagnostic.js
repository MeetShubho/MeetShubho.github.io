// Diagnostic script for certifications timeline
// Place this in the same folder as your HTML (e.g., /assets/js/diagnostic.js)
// Add <script src="diagnostic.js" defer></script> before </body> in your HTML

(() => {
  const timeline = document.querySelector('.cert-timeline');
  if (!timeline) {
    console.warn('cert-timeline element not found');
    return;
  }

  console.log('--- Certification Timeline Diagnostics ---');
  console.log('Timeline display:', getComputedStyle(timeline).display);
  console.log('Timeline height:', Math.round(timeline.getBoundingClientRect().height));
  console.log('Timeline left (approx center line):', Math.round(timeline.getBoundingClientRect().left + timeline.offsetWidth/2));

  const points = document.querySelectorAll('.cert-point');
  if (!points.length) {
    console.warn('No .cert-point elements found');
    return;
  }

  points.forEach((p, i) => {
    const rect = p.getBoundingClientRect();
    console.log(`Point ${i}: top=${Math.round(rect.top)}, left=${Math.round(rect.left)}`);

    // Visual overlay: add red border if left position is off-center (approx 50% of timeline)
    const timelineCenter = timeline.getBoundingClientRect().left + timeline.offsetWidth / 2;
    if (Math.abs(rect.left - timelineCenter) > 5) {
      p.style.border = '3px solid red';
      p.style.boxShadow = '0 0 8px red';
    }
  });

  console.log('--- Diagnostics Complete ---');
})();
