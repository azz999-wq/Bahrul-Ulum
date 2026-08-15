document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (navbar) {
    let ticking = false;

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            if (window.scrollY > 20) {
              navbar.classList.add("scrolled");
            } else {
              navbar.classList.remove("scrolled");
            }
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  if (menuBtn && navLinks) {
    // Toggle menu navigasi mobile
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navLinks.classList.toggle("active");
    });

    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("active");
      }
    });

    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        navLinks.classList.remove("active");
      }
    });
  }
});