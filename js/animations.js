/**
 * Dhawan Hospital - GSAP & ScrollTrigger Animation Engine
 * Adheres strictly to Sections 52 - 85
 */

import { ANIMATION_CONFIG } from './tokens.js';

export function initHeroAnimation() {
  if (!window.gsap) return;

  const prefersReducedMotion = window.matchMedia(ANIMATION_CONFIG.breakpoints.reducedMotion).matches;
  if (prefersReducedMotion) return;

  const heroTimeline = gsap.timeline({
    defaults: { ease: ANIMATION_CONFIG.ease.smooth }
  });

  heroTimeline
    .from(".site-header", {
      y: -50,
      opacity: 0,
      duration: ANIMATION_CONFIG.duration.normal
    })
    .from(".hero-badge", {
      y: 25,
      opacity: 0,
      duration: ANIMATION_CONFIG.duration.fast
    }, "-=0.3")
    .from(".hero-title", {
      y: 40,
      opacity: 0,
      duration: ANIMATION_CONFIG.duration.normal
    }, "-=0.25")
    .from(".hero-description", {
      y: 25,
      opacity: 0,
      duration: ANIMATION_CONFIG.duration.fast
    }, "-=0.3")
    .from(".hero-actions", {
      y: 20,
      opacity: 0,
      duration: ANIMATION_CONFIG.duration.fast
    }, "-=0.25")
    .from(".hero-trust-bar", {
      y: 20,
      opacity: 0,
      duration: ANIMATION_CONFIG.duration.fast
    }, "-=0.2")
    .from(".hero-image-card", {
      scale: 1.08,
      opacity: 0,
      duration: ANIMATION_CONFIG.duration.slow,
      ease: "power2.out"
    }, "-=0.8")
    .from(".floating-stat-1", {
      x: -30,
      opacity: 0,
      duration: ANIMATION_CONFIG.duration.fast,
      ease: "back.out(1.4)"
    }, "-=0.4")
    .from(".floating-stat-2", {
      x: 30,
      opacity: 0,
      duration: ANIMATION_CONFIG.duration.fast,
      ease: "back.out(1.4)"
    }, "-=0.3");

  // Subtle ambient floating on stats
  gsap.to(".floating-stat-1", {
    y: "-=8",
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".floating-stat-2", {
    y: "+=8",
    duration: 3.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.5
  });
}

export function initHorizontalFacilities() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const mm = gsap.matchMedia();

  mm.add(ANIMATION_CONFIG.breakpoints.desktop, () => {
    const horizontalSection = document.querySelector(".facilities-section");
    const horizontalTrack = document.querySelector(".horizontal-track");
    const progressFill = document.querySelector(".progress-fill-bar");
    const currentNumEl = document.querySelector(".curr-facility-num");

    if (!horizontalSection || !horizontalTrack) return;

    const getScrollAmount = () => {
      return horizontalTrack.scrollWidth - window.innerWidth + 80;
    };

    const horizontalTween = gsap.to(horizontalTrack, {
      x: () => -getScrollAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: horizontalSection,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        onUpdate: (self) => {
          if (progressFill) {
            progressFill.style.transform = `scaleX(${Math.max(0.16, self.progress)})`;
          }
          if (currentNumEl) {
            const panelCount = 6;
            const currentIdx = Math.min(panelCount, Math.floor(self.progress * panelCount) + 1);
            currentNumEl.textContent = `0${currentIdx}`;
          }
        }
      }
    });

    return () => {
      horizontalTween.kill();
    };
  });
}

export function initStorytellingSection() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const mm = gsap.matchMedia();

  mm.add(ANIMATION_CONFIG.breakpoints.desktop, () => {
    const storytellingSection = document.querySelector(".storytelling-section");
    const stepNavItems = document.querySelectorAll(".story-step-nav-item");
    const stageCards = document.querySelectorAll(".story-stage-card");

    if (!storytellingSection || !stepNavItems.length || !stageCards.length) return;

    function activateStoryStep(index) {
      stepNavItems.forEach((item, idx) => {
        if (idx === index) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });

      stageCards.forEach((card, idx) => {
        if (idx === index) {
          card.classList.add("active");
        } else {
          card.classList.remove("active");
        }
      });
    }

    const storyST = ScrollTrigger.create({
      trigger: storytellingSection,
      start: "top top",
      end: "+=2200",
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const stepCount = stageCards.length;
        const currentStep = Math.min(stepCount - 1, Math.floor(self.progress * stepCount));
        activateStoryStep(currentStep);
      }
    });

    stepNavItems.forEach((item, idx) => {
      item.addEventListener("click", () => {
        activateStoryStep(idx);
      });
    });

    return () => {
      storyST.kill();
    };
  });
}

export function initParallaxSections() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const prefersReducedMotion = window.matchMedia(ANIMATION_CONFIG.breakpoints.reducedMotion).matches;
  if (prefersReducedMotion) return;

  // Subtle image parallax inside clipped containers
  const parallaxImages = document.querySelectorAll(".parallax-image");
  parallaxImages.forEach(img => {
    const container = img.closest(".parallax-container") || img.parentElement;
    gsap.to(img, {
      yPercent: -ANIMATION_CONFIG.parallax.imageRange,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  // Subtle text parallax on major section headings
  const parallaxTitles = document.querySelectorAll(".parallax-title");
  parallaxTitles.forEach(title => {
    gsap.to(title, {
      yPercent: -ANIMATION_CONFIG.parallax.textRange,
      ease: "none",
      scrollTrigger: {
        trigger: title,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });
}

export function initCounters() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const counters = document.querySelectorAll(".counter-value");
  counters.forEach(counter => {
    const target = parseFloat(counter.getAttribute("data-target")) || 0;
    const isDecimal = counter.getAttribute("data-decimal") === "true";
    const suffix = counter.getAttribute("data-suffix") || "";

    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: counter,
        start: "top 85%",
        once: true
      },
      onUpdate: () => {
        counter.textContent = isDecimal ? obj.val.toFixed(1) + suffix : Math.floor(obj.val).toLocaleString() + suffix;
      }
    });
  });
}

export function initCardStaggers() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const prefersReducedMotion = window.matchMedia(ANIMATION_CONFIG.breakpoints.reducedMotion).matches;
  if (prefersReducedMotion) return;

  // Department cards stagger
  const deptGrid = document.querySelector(".departments-grid");
  if (deptGrid) {
    gsap.from(".department-card", {
      y: 40,
      opacity: 0,
      stagger: 0.08,
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.ease.smooth,
      scrollTrigger: {
        trigger: deptGrid,
        start: "top 80%",
        once: true
      }
    });
  }

  // Doctor cards stagger
  const docGrid = document.querySelector(".doctors-grid");
  if (docGrid) {
    gsap.from(".doctor-card", {
      y: 45,
      opacity: 0,
      stagger: 0.1,
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.ease.smooth,
      scrollTrigger: {
        trigger: docGrid,
        start: "top 80%",
        once: true
      }
    });
  }

  // Triage cards stagger
  const triageGrid = document.querySelector(".triage-grid");
  if (triageGrid) {
    gsap.from(".triage-card", {
      y: 30,
      opacity: 0,
      stagger: 0.08,
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.ease.smooth,
      scrollTrigger: {
        trigger: triageGrid,
        start: "top 90%",
        once: true
      }
    });
  }
}
