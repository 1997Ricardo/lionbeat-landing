(() => {
  "use strict";

  const root = document.documentElement;
  const header = document.getElementById("site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.getElementById("main-nav");
  const year = document.getElementById("year");
  const progressBar = document.getElementById("scroll-progress-bar");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileQuery = window.matchMedia("(max-width: 767px)");
  const revealItems = Array.from(document.querySelectorAll(".reveal"));

  if (year) year.textContent = String(new Date().getFullYear());

  const closeMenu = (restoreFocus = false) => {
    if (!menuToggle || !mainNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    mainNav.classList.remove("open");
    mainNav.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
    if (restoreFocus) menuToggle.focus();
  };

  if (menuToggle && mainNav) {
    mainNav.setAttribute("aria-hidden", mobileQuery.matches ? "true" : "false");

    menuToggle.addEventListener("click", () => {
      const opening = menuToggle.getAttribute("aria-expanded") !== "true";
      menuToggle.setAttribute("aria-expanded", String(opening));
      menuToggle.setAttribute("aria-label", opening ? "Cerrar menú" : "Abrir menú");
      mainNav.classList.toggle("open", opening);
      mainNav.setAttribute("aria-hidden", String(!opening));
      document.body.classList.toggle("menu-open", opening);
      if (opening) {
        const firstLink = mainNav.querySelector("a");
        if (firstLink) firstLink.focus({ preventScroll: true });
      }
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => closeMenu());
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu(true);
      }
      if (event.key === "Tab" && menuToggle.getAttribute("aria-expanded") === "true") {
        const focusable = Array.from(mainNav.querySelectorAll("a[href]"));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    document.addEventListener("click", event => {
      if (menuToggle.getAttribute("aria-expanded") === "true" &&
          !mainNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });

    const handleViewportChange = event => {
      if (!event.matches) closeMenu();
      mainNav.setAttribute("aria-hidden", event.matches ? "true" : "false");
    };
    if (mobileQuery.addEventListener) mobileQuery.addEventListener("change", handleViewportChange);
    else mobileQuery.addListener(handleViewportChange);
  }

  let scrollTicking = false;
  const updateScrollUI = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progressBar) progressBar.style.width = progress + "%";
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);
    scrollTicking = false;
  };
  window.addEventListener("scroll", () => {
    if (!scrollTicking) {
      scrollTicking = true;
      window.requestAnimationFrame(updateScrollUI);
    }
  }, { passive: true });
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

  // Progressive enhancement: content remains visible if observation is unavailable or fails.
  if ("IntersectionObserver" in window && !reducedMotion.matches && revealItems.length) {
    let observer;
    try {
      observer = new IntersectionObserver((entries, instance) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            instance.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

      revealItems.forEach(item => observer.observe(item));
      root.classList.add("js-enabled");
    } catch (error) {
      if (observer) observer.disconnect();
      root.classList.remove("js-enabled");
      revealItems.forEach(item => item.classList.add("is-visible"));
    }
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }
})();