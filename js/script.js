(() => {
  "use strict";

  const root = document.documentElement;
  const header = document.getElementById("site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.getElementById("main-nav");
  const year = document.getElementById("year");
  const progressBar = document.getElementById("scroll-progress-bar");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealItems = Array.from(document.querySelectorAll(".reveal"));

  if (year) year.textContent = String(new Date().getFullYear());

  const closeMenu = () => {
    if (!menuToggle || !mainNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    mainNav.classList.remove("open");
    mainNav.setAttribute("aria-hidden", "true");
  };

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
      mainNav.classList.toggle("open", !isOpen);
      mainNav.setAttribute("aria-hidden", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });
    document.addEventListener("click", event => {
      if (menuToggle.getAttribute("aria-expanded") === "true" &&
          !mainNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });
  }

  const updateScrollUI = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progressBar) progressBar.style.width = progress + "%";
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", event => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "start"
      });
    });
  });

  // Reveal animation is progressive enhancement: content stays visible if observers fail.
  if ("IntersectionObserver" in window && !reducedMotion.matches && revealItems.length) {
    try {
      const observer = new IntersectionObserver((entries, instance) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            instance.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

      revealItems.forEach(item => observer.observe(item));
      root.classList.add("js-enabled");
    } catch (_) {
      revealItems.forEach(item => item.classList.add("is-visible"));
    }
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }
})();