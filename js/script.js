(() => {
  "use strict";

  document.documentElement.classList.add("js-enabled");

  const header = document.getElementById("site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.getElementById("main-nav");
  const year = document.getElementById("year");

  const heroImage = document.querySelector(".hero-media img");
  if (heroImage) {
    fetch("assets/lionbeat-hero.webp.b64")
      .then(response => {
        if (!response.ok) throw new Error("Hero image unavailable");
        return response.text();
      })
      .then(encodedImage => {
        heroImage.src = `data:image/webp;base64,${encodedImage.trim()}`;
      })
      .catch(() => {});
  }
  const progressBar = document.getElementById("scroll-progress-bar");
  const revealItems = document.querySelectorAll(".reveal");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (year) year.textContent = String(new Date().getFullYear());

  let ticking = false;
  const updateScrollUI = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle("scrolled", scrollTop > 24);
    if (progressBar) {
      const progress = scrollable > 0 ? Math.min(100, (scrollTop / scrollable) * 100) : 0;
      progressBar.style.width = progress + "%";
    }
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollUI);
      ticking = true;
    }
  }, { passive: true });
  updateScrollUI();

  const setMenu = (open, returnFocus = false) => {
    if (!menuToggle || !mainNav) return;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    mainNav.classList.toggle("open", open);
    mainNav.setAttribute("aria-hidden", String(!open));
    const mobileViewport = window.innerWidth < 768;
    mainNav.inert = mobileViewport && !open;
    mainNav.setAttribute("aria-hidden", String(mobileViewport && !open));
    document.body.classList.toggle("menu-open", open);
    if (open && mobileViewport) {
      const firstLink = mainNav.querySelector("a");
      if (firstLink && window.innerWidth < 768) firstLink.focus({ preventScroll: true });
    } else if (returnFocus) {
      menuToggle.focus({ preventScroll: true });
    }
  };

  if (menuToggle && mainNav) {
    const mobileViewport = window.innerWidth < 768;
    mainNav.inert = mobileViewport;
    mainNav.setAttribute("aria-hidden", String(mobileViewport));
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      setMenu(!isOpen);
    });
    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => setMenu(false));
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        setMenu(false, true);
      }
    });
    document.addEventListener("click", event => {
      if (menuToggle.getAttribute("aria-expanded") === "true" &&
          !mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
        setMenu(false);
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        setMenu(false);
        mainNav.inert = false;
        mainNav.setAttribute("aria-hidden", "false");
      } else if (menuToggle.getAttribute("aria-expanded") !== "true") {
        mainNav.inert = true;
        mainNav.setAttribute("aria-hidden", "true");
      }
    });
  }

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