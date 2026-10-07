/* =========================================================
   LIONBEAT PERFORMANCE SYSTEM
   VANILLA JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const header =
  document.getElementById("site-header");

const menuToggle =
  document.querySelector(".menu-toggle");

const mainNav =
  document.getElementById("main-nav");

const year =
  document.getElementById("year");

const revealElements =
  document.querySelectorAll(".reveal");


/* =========================================================
   YEAR
========================================================= */

if (year) {

  year.textContent =
    new Date().getFullYear();

}


/* =========================================================
   HEADER SCROLL
========================================================= */

function updateHeader() {

  if (!header) {
    return;
  }


  if (window.scrollY > 20) {

    header.classList.add("scrolled");

  } else {

    header.classList.remove("scrolled");

  }

}


window.addEventListener(
  "scroll",
  updateHeader,
  {
    passive: true
  }
);


updateHeader();


/* =========================================================
   MOBILE MENU
========================================================= */

function closeMenu() {

  if (!mainNav || !menuToggle) {
    return;
  }


  mainNav.classList.remove("open");

  menuToggle.classList.remove("active");


  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );


  menuToggle.setAttribute(
    "aria-label",
    "Abrir menú"
  );


  document.body.classList.remove(
    "menu-open"
  );

}


function openMenu() {

  if (!mainNav || !menuToggle) {
    return;
  }


  mainNav.classList.add("open");

  menuToggle.classList.add("active");


  menuToggle.setAttribute(
    "aria-expanded",
    "true"
  );


  menuToggle.setAttribute(
    "aria-label",
    "Cerrar menú"
  );


  document.body.classList.add(
    "menu-open"
  );

}


if (menuToggle) {

  menuToggle.addEventListener(
    "click",
    () => {

      const isOpen =
        mainNav.classList.contains("open");


      if (isOpen) {

        closeMenu();

      } else {

        openMenu();

      }

    }
  );

}


/* =========================================================
   CLOSE MENU ON LINK
========================================================= */

document
  .querySelectorAll(".main-nav a")
  .forEach((link) => {

    link.addEventListener(
      "click",
      () => {

        closeMenu();

      }
    );

  });


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      closeMenu();

    }

  }
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

if (
  "IntersectionObserver" in window
) {

  const observer =
    new IntersectionObserver(
      (entries, observerInstance) => {

        entries.forEach(
          (entry) => {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            entry.target.classList.add(
              "visible"
            );


            observerInstance.unobserve(
              entry.target
            );

          }
        );

      },
      {
        threshold: 0.12,

        rootMargin:
          "0px 0px -35px 0px"
      }
    );


  revealElements.forEach(
    (element) => {

      observer.observe(element);

    }
  );

} else {

  revealElements.forEach(
    (element) => {

      element.classList.add(
        "visible"
      );

    }
  );

}


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach((anchor) => {

    anchor.addEventListener(
      "click",
      (event) => {

        const targetId =
          anchor.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {

          return;

        }


        const target =
          document.querySelector(
            targetId
          );


        if (!target) {

          return;

        }


        event.preventDefault();


        const reducedMotion =
          window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches;


        target.scrollIntoView({

          behavior:
            reducedMotion
              ? "auto"
              : "smooth",

          block: "start"

        });

      }
    );

  });


/* =========================================================
   CLOSE MOBILE MENU ON RESIZE
========================================================= */

window.addEventListener(
  "resize",
  () => {

    if (
      window.innerWidth >= 768
    ) {

      closeMenu();

    }

  }
);