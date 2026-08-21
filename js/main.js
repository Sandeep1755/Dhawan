/**
 * Dhawan Hospital - Premium Lightweight Orchestrator
 * Pure Vanilla JavaScript ES6+ (Zero external framework/library dependencies)
 */

import { initAppointmentModal } from './modal.js';
import { initGalleryLightbox } from './gallery.js';

document.addEventListener("DOMContentLoaded", () => {
  // 1. Navigation & Header
  initNavigation();

  // 2. Modals & Lightbox
  initAppointmentModal();
  initGalleryLightbox();

  // 3. Department & Gallery Filters, Doctor Search
  initDepartmentFilter();
  initDoctorSearch();
  initGalleryFilter();

  // 4. Interactive Storytelling Tabs
  initStorytellingTabs();

  // 5. Scroll Reveals & Number Counters (Pure IntersectionObserver)
  initScrollReveals();
  initCounters();
});

/**
 * Sticky Header & Mobile Navigation
 */
function initNavigation() {
  const header = document.querySelector(".site-header");
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".nav-link");

  // Sticky header elevation
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      mobileToggle.classList.toggle("open");
      mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        mobileToggle.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }
}

/**
 * Department Filter Controller
 */
function initDepartmentFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn:not([data-gallery-filter])");
  const deptCards = document.querySelectorAll(".department-card");

  if (!filterBtns.length || !deptCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      deptCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        if (filterValue === "all" || cardCategory === filterValue) {
          card.style.display = "flex";
          card.style.opacity = "1";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/**
 * Doctor Directory Live Search Controller
 */
function initDoctorSearch() {
  const searchInput = document.getElementById("doctor-search-input");
  const doctorCards = document.querySelectorAll(".doctor-card");

  if (!searchInput || !doctorCards.length) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();

    doctorCards.forEach(card => {
      const keywords = (card.getAttribute("data-keywords") || "").toLowerCase();
      const text = card.textContent.toLowerCase();

      if (!query || keywords.includes(query) || text.includes(query)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
}

/**
 * Gallery Category Filter Controller
 */
function initGalleryFilter() {
  const galleryFilterBtns = document.querySelectorAll("[data-gallery-filter]");
  const galleryItems = document.querySelectorAll(".gallery-item-card[data-category]");

  if (!galleryFilterBtns.length || !galleryItems.length) return;

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      galleryFilterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterVal = btn.getAttribute("data-gallery-filter");

      galleryItems.forEach(item => {
        const cat = item.getAttribute("data-category");
        if (filterVal === "all" || cat === filterVal) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

/**
 * Interactive Patient Storytelling Tabs
 */
function initStorytellingTabs() {
  const tabBtns = document.querySelectorAll(".story-tab-btn");
  const displayTitle = document.getElementById("story-display-title");
  const displayDesc = document.getElementById("story-display-desc");
  const displayImg = document.getElementById("story-display-img");
  const displayList = document.getElementById("story-display-list");

  if (!tabBtns.length || !displayTitle) return;

  const storyData = [
    {
      title: "Step 01: Discover & Rapid Consultation",
      desc: "From your initial inquiry, a dedicated patient coordinator pairs you with our veteran surgeons for comprehensive evaluation and clear treatment paths.",
      img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=80",
      points: [
        "Zero Waiting Time with Priority Pre-Booking",
        "Direct 1-on-1 Consultation with Chief Surgeon",
        "Transparent Cost Estimate & Hospital Stay Plan",
        "Cashless Insurance Pre-Authorization Desk"
      ]
    },
    {
      title: "Step 02: Precision Diagnostics & Clinical Review",
      desc: "Precise clinical outcomes rely on precision imaging and pathology. Our on-site 128-Slice CT, 4D Ultrasound, and automated biochemistry lab deliver answers rapidly.",
      img: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&w=900&q=80",
      points: [
        "Same-Day Digital Diagnostic Reports via WhatsApp/SMS",
        "Multi-Disciplinary Tumour & Joint Case Review",
        "Digital PACS Network Access for Instant Radiologist Review",
        "Low-Radiation Dose Computed Tomography Protocols"
      ]
    },
    {
      title: "Step 03: Advanced Surgical & Interventional Care",
      desc: "NABH-accredited modular surgical theatres with Class-100 laminar airflow, Karl Storz 4K towers, and veteran surgical hands ensure world-class outcomes.",
      img: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=900&q=80",
      points: [
        "Class-100 Laminar Flow Zero-Infection Suites",
        "Robotic-Assisted Joint Replacement Precision",
        "Minimally Invasive Keyhole Laparoscopic Surgery",
        "Senior Anaesthesia & Pain Management Team"
      ]
    },
    {
      title: "Step 04: Compassionate Inpatient Recovery",
      desc: "Recover in quiet, deluxe private suites supported by attentive 24/7 nursing care, clinical nutrition, and Level-III ICU standby whenever needed.",
      img: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=900&q=80",
      points: [
        "Dedicated Two-Way Nurse Call Intercom at Bedside",
        "Customized Clinical Dietetics Prescribed by Nutritionists",
        "Daily Senior Consultant & Intensivist Rounds",
        "Cashless TPA Insurance Hospitalization Settlement"
      ]
    },
    {
      title: "Step 05: Post-Operative Rehabilitation & Wellness",
      desc: "Our commitment continues until you achieve full mobility. Our dedicated physiotherapy department, follow-ups, and home care ensure lifelong health.",
      img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
      points: [
        "Personalized In-House Physiotherapy Protocol",
        "Scheduled Follow-up Reviews & Digital Prescriptions",
        "Lifelong Access to Dhawan Hospital Health Records",
        "24/7 Dedicated Patient Helpline Support"
      ]
    }
  ];

  tabBtns.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const data = storyData[idx];
      if (data) {
        displayTitle.textContent = data.title;
        displayDesc.textContent = data.desc;
        if (displayImg) displayImg.src = data.img;
        if (displayList) {
          displayList.innerHTML = data.points.map(pt => `<div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: var(--color-text-primary); font-weight: 500;"><span style="color: var(--color-teal-500); font-weight: bold;">✓</span> ${pt}</div>`).join('');
        }
      }
    });
  });
}

/**
 * Animated Number Counters (Vanilla JS)
 */
function initCounters() {
  const counters = document.querySelectorAll(".counter-value");
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseFloat(counter.getAttribute("data-target")) || 0;
        const isDecimal = counter.getAttribute("data-decimal") === "true";
        const suffix = counter.getAttribute("data-suffix") || "";

        let start = 0;
        const duration = 1500;
        const startTime = performance.now();

        function updateNumber(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3); // cubic ease out
          const currentVal = start + (target - start) * easeProgress;

          counter.textContent = isDecimal ? currentVal.toFixed(1) + suffix : Math.floor(currentVal).toLocaleString() + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          } else {
            counter.textContent = isDecimal ? target.toFixed(1) + suffix : target.toLocaleString() + suffix;
          }
        }

        requestAnimationFrame(updateNumber);
        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(counter => observer.observe(counter));
}

/**
 * Scroll Reveal Animations (Vanilla JS IntersectionObserver)
 */
function initScrollReveals() {
  const revealElements = document.querySelectorAll(".reveal-item");
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
}
