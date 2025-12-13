/*MOBILE NAV*/
function initMobileNav() {
  const sidebarBtn = document.querySelector(".sidebar-btn");
  const mobileNav = document.getElementById("mobileNav");

  if (!sidebarBtn || !mobileNav) return;

  const openNav = () => mobileNav.classList.add("show");
  const closeNav = () => mobileNav.classList.remove("show");
  const toggleNav = () => mobileNav.classList.toggle("show");

  sidebarBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleNav();
  });

  document.addEventListener("click", (e) => {
    if (!mobileNav.contains(e.target) && !sidebarBtn.contains(e.target)) {
      closeNav();
    }
  });

  mobileNav.addEventListener("click", closeNav);
}

initMobileNav();

/*CV DOWNLOAD*/
function initCvDownload() {
  const downloadBtn = document.getElementById("downloadCvBtn");
  if (!downloadBtn) return;

  downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = "src/files/CV.pdf";
    link.download = "CV.pdf";
    link.click();
  });
}

initCvDownload();

/*HERO SLIDER*/
function initHeroSlider() {
  const slides = document.querySelectorAll(".slide");
  const sliderContainer = document.querySelector(".hero-image");

  if (!slides.length || !sliderContainer) return;

  let activeIndex = 0;
  let intervalId = null;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
  };

  const startSlider = () => {
    showSlide(activeIndex);

    intervalId = setInterval(() => {
      activeIndex = (activeIndex + 1) % slides.length;
      showSlide(activeIndex);
    }, 5000);
  };

  const stopSlider = () => {
    if (!intervalId) return;
    clearInterval(intervalId);
    intervalId = null;
  };

  sliderContainer.addEventListener("mouseenter", stopSlider);
  sliderContainer.addEventListener("mouseleave", startSlider);

  startSlider();
}

initHeroSlider();

/*FORM ANIMATION*/

const aboutSection = document.querySelector("#aboutMe");
const ranges = aboutSection.querySelectorAll("input[type='range']");

let hasAnimated = false;

function animateRanges() {
  if (hasAnimated) return;

  const sectionTop = aboutSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight - 150) {
    ranges.forEach((range) => {
      const target = Number(range.dataset.value);
      let current = 0;

      const interval = setInterval(() => {
        if (current >= target) {
          clearInterval(interval);
        } else {
          current++;
          range.value = current;
          updateRangeFill(range, current);
          updateRangeFill(range, current);
        }
      }, 20);
    });

    hasAnimated = true;
  }

  function updateRangeFill(range, value) {
    range.style.background = `linear-gradient(
    to right,
    #fd6f00 ${value}%,
    #e0e0e0 ${value}%
  )`;
  }
}

window.addEventListener("scroll", animateRanges);
