const header = document.getElementById('site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.getElementById('main-nav');
const year = document.getElementById('year');


// =========================================================
// YEAR
// =========================================================

if (year) {
  year.textContent = new Date().getFullYear();
}


// =========================================================
// HEADER SCROLL
// =========================================================

window.addEventListener('scroll', () => {

  header.classList.toggle(
    'scrolled',
    window.scrollY > 30
  );

}, {
  passive: true
});


// =========================================================
// MOBILE MENU
// =========================================================

menuToggle?.addEventListener('click', () => {

  const open =
    mainNav.classList.toggle('open');

  menuToggle.setAttribute(
    'aria-expanded',
    String(open)
  );

  menuToggle.setAttribute(
    'aria-label',
    open
      ? 'Cerrar menú'
      : 'Abrir menú'
  );

});


// =========================================================
// CLOSE MOBILE MENU
// =========================================================

document
  .querySelectorAll('.main-nav a')
  .forEach(link => {

    link.addEventListener('click', () => {

      mainNav.classList.remove('open');

      menuToggle?.setAttribute(
        'aria-expanded',
        'false'
      );

    });

  });


// =========================================================
// SCROLL REVEAL
// =========================================================

const observer =
  new IntersectionObserver(

    (entries, obs) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add('visible');

          obs.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }

  );


// Observe reveal elements

document
  .querySelectorAll('.reveal')
  .forEach(el => {

    observer.observe(el);

  });


// =========================================================
// SMOOTH ANCHOR SCROLL
// =========================================================

document
  .querySelectorAll('a[href^="#"]')
  .forEach(anchor => {

    anchor.addEventListener(
      'click',
      event => {

        const targetId =
          anchor.getAttribute('href');

        if (
          !targetId ||
          targetId === '#'
        ) {
          return;
        }


        const target =
          document.querySelector(targetId);


        if (!target) {
          return;
        }


        event.preventDefault();


        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

      }
    );

  });