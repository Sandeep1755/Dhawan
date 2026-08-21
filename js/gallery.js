/**
 * Dhawan Hospital - Clinical Gallery Lightbox
 * Adheres to Section 66
 */

export function initGalleryLightbox() {
  const lightbox = document.getElementById("gallery-lightbox");
  const lightboxImg = lightbox ? lightbox.querySelector(".lightbox-img") : null;
  const lightboxCaption = lightbox ? lightbox.querySelector(".lightbox-caption") : null;
  const closeBtn = lightbox ? lightbox.querySelector(".lightbox-close") : null;
  const galleryItems = document.querySelectorAll(".gallery-item-card");

  if (!lightbox || !galleryItems.length) return;

  const images = Array.from(galleryItems).map(item => ({
    src: item.getAttribute("data-full-img") || item.querySelector("img").src,
    caption: item.getAttribute("data-caption") || item.querySelector(".gallery-caption-title")?.textContent || "Hospital Facility"
  }));

  let currentIndex = 0;

  function showImage(index) {
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    currentIndex = index;

    lightboxImg.src = images[currentIndex].src;
    lightboxCaption.textContent = images[currentIndex].caption;
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  galleryItems.forEach((item, idx) => {
    item.addEventListener("click", () => openLightbox(idx));
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
  });
}
