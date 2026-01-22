const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const navbar = document.querySelector(".navbar");
hamburger.addEventListener("click", (event) => {
  event.stopPropagation();

  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  const isOpen = hamburger.classList.contains("active");
  hamburger.setAttribute("aria-expanded", isOpen);
  hamburger.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && hamburger.classList.contains("active")) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.focus();
  }
});
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (window.getComputedStyle(hamburger).display !== "none") {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
});
document.addEventListener("click", (event) => {
  if (
    !navbar.contains(event.target) &&
    hamburger.classList.contains("active")
  ) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  }
});
let scrollTimeout;
window.addEventListener("scroll", () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }

  scrollTimeout = window.requestAnimationFrame(() => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");
  const navHeight = navbar.offsetHeight;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - navHeight - 100) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
});
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault();

      const target = document.querySelector(href);
      const navHeight = navbar.offsetHeight;
      const targetPosition = target.offsetTop - navHeight;

      /* Scroll to target with smooth behavior */
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});
hamburger.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    hamburger.click();
  }
});
navLinks.forEach((link) => {
  link.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      return;
    }
  });
});
hamburger.addEventListener("click", (event) => {
  event.stopPropagation();
});
hamburger.setAttribute("aria-expanded", "false");
hamburger.setAttribute("aria-label", "Open navigation menu");
hamburger.setAttribute("aria-controls", "navMenu");
navMenu.setAttribute("role", "navigation");
navMenu.setAttribute("aria-label", "Primary navigation");

console.log(
  "Custom responsive navbar with smooth animations loaded successfully!",
);
