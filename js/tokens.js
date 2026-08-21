/**
 * Dhawan Hospital - GSAP Animation Tokens & Configuration
 * Follows medical/professional aesthetic: smooth, subtle, intentional, fast, non-distracting.
 */

export const ANIMATION_CONFIG = {
  duration: {
    instant: 0.2,
    fast: 0.4,
    normal: 0.75,
    slow: 1.1,
    extended: 1.6
  },
  ease: {
    smooth: "power3.out",
    reveal: "power2.out",
    gentle: "power1.out",
    inOut: "power2.inOut",
    linear: "none",
    magnetic: "power2.out"
  },
  breakpoints: {
    desktop: "(min-width: 1024px)",
    tablet: "(min-width: 768px) and (max-width: 1023px)",
    mobile: "(max-width: 767px)",
    reducedMotion: "(prefers-reduced-motion: reduce)"
  },
  parallax: {
    imageRange: 15, // percent
    textRange: 12   // percent
  }
};
