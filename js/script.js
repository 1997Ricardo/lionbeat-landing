(() => {
  "use strict";

  document.documentElement.classList.add("js-enabled");

  const header = document.getElementById("site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.getElementById("main-nav");
  const year = document.getElementById("year");

  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          instance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", event => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
    });
  });
})();