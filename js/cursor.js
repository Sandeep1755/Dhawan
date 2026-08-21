/**
 * Dhawan Hospital - Custom Cursor & Magnetic Interactions
 * Desktop-only, disabled on touch devices and for users who prefer reduced motion.
 * Adheres to Sections 67 & 68.
 */

export function initCustomCursor() {
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isTouch || prefersReducedMotion || window.innerWidth < 1024) {
    return;
  }

  const cursor = document.querySelector(".custom-cursor");
  const follower = document.querySelector(".cursor-follower");
  const label = document.querySelector(".cursor-label");

  if (!cursor || !follower) return;

  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  function renderFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    if (label) {
      label.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    }
    requestAnimationFrame(renderFollower);
  }
  requestAnimationFrame(renderFollower);

  // Hover states on interactive links & buttons
  const interactives = document.querySelectorAll("a, button, .interactive-hover");
  interactives.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-hover");
    });
    el.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-hover");
    });
  });

  // Action labels on specific elements (e.g. Gallery cards -> "VIEW", Horizontal track -> "DRAG")
  const galleryItems = document.querySelectorAll(".gallery-item-card");
  galleryItems.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-action");
      if (label) label.textContent = "VIEW";
    });
    el.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-action");
      if (label) label.textContent = "";
    });
  });

  const horizontalTrack = document.querySelector(".facilities-section");
  if (horizontalTrack) {
    horizontalTrack.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-action");
      if (label) label.textContent = "EXPLORE";
    });
    horizontalTrack.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-action");
      if (label) label.textContent = "";
    });
  }
}

export function initMagneticButtons() {
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isTouch || prefersReducedMotion || window.innerWidth < 1024) {
    return;
  }

  const magneticBtns = document.querySelectorAll(".btn-magnetic");
  magneticBtns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Subtle magnetic pull (max ~8px)
      if (window.gsap) {
        gsap.to(btn, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });

    btn.addEventListener("mouseleave", () => {
      if (window.gsap) {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)"
        });
      }
    });
  });
}
