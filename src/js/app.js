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

/*MY PROJECTS*/

function initProjectFilter() {
  const buttons = document.querySelectorAll(".buttons-container button");
  const cards = document.querySelectorAll(".card");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.id;

      cards.forEach((card) => {
        card.style.display =
          category === "all" || card.dataset.category === category
            ? "flex"
            : "none";
      });

      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });

  document.getElementById("all").click();
}

initProjectFilter();

/*TESTIMONIALS*/

function initTestimonialSlider() {
  const slides = document.querySelectorAll(".img-feedback");
  const buttons = document.querySelectorAll(".test-buttons button");

  let activeIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "flex" : "none";
    });

    buttons.forEach((btn) => btn.classList.remove("active"));
    buttons[index].classList.add("active");

    activeIndex = index;
  }

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      showSlide(index);
    });
  });

  showSlide(0);
}

initTestimonialSlider();

/*CONTACT*/

function initContactForm() {
  const form = document.getElementById("contactForm");
  const nameInput = form.querySelector("#name");
  const emailInput = form.querySelector("#email");
  const websiteInput = form.querySelector("#website");
  const messageInput = form.querySelector("#message");
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("closeModal");

  function removeMessage(input) {
    const existing = input.parentElement.querySelector(".input-message");
    if (existing) existing.remove();
  }

  function showError(input, text) {
    removeMessage(input);
    input.style.border = "2px solid red";
    input.classList.remove("input-shake");
    input.classList.add("input-shake");

    const msg = document.createElement("p");
    msg.className = "input-message error";
    msg.innerText = text;

    input.parentElement.appendChild(msg);
  }
  function showSuccess(input) {
    removeMessage(input);
    input.style.border = "2px solid green";
  }

  function validateName() {
    const value = nameInput.value.trim();
    if (!value) {
      showError(nameInput, "Name is required");
      return false;
    }
    if (/\d/.test(value)) {
      showError(nameInput, "Name cannot contain numbers");
      return false;
    }
    showSuccess(nameInput);
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      showError(emailInput, "Email is required");
      return false;
    }
    if (!emailRegex.test(value)) {
      showError(emailInput, "Invalid email format");
      return false;
    }
    showSuccess(emailInput);
    return true;
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    if (!value) {
      showError(messageInput, "Message is required");
      return false;
    }
    showSuccess(messageInput);
    return true;
  }

  function validateWebsite() {
    const value = websiteInput.value.trim();
    if (!value) {
      websiteInput.style.border = "2px solid #ccc";
      removeMessage(websiteInput);
      return true;
    }
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}\/?$/i;
    if (!urlRegex.test(value)) {
      showError(websiteInput, "Invalid website URL");
      return false;
    }
    showSuccess(websiteInput);
    return true;
  }

  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  messageInput.addEventListener("input", validateMessage);
  websiteInput.addEventListener("input", validateWebsite);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    const isWebsiteValid = validateWebsite();

    if (!(isNameValid && isEmailValid && isMessageValid && isWebsiteValid))
      return;

    const data = {
      title: nameInput.value,
      body: `${messageInput.value} | Email:${emailInput.value} | Website: ${websiteInput.value}`,
      userId: 1,
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        showModal();
        form.reset();

        [nameInput, emailInput, websiteInput, messageInput].forEach((input) => {
          input.style.border = "none";
          removeMessage(input);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  function showModal() {
    modal.style.display = "flex";
  }
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

initContactForm();
