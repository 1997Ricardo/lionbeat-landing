const header = document.getElementById('site-header');

const menuToggle =
  document.querySelector('.menu-toggle');

const mainNav =
  document.getElementById('main-nav');

const year =
  document.getElementById('year');


// ======================================================
// AÑO AUTOMÁTICO
// ======================================================

if (year) {

  year.textContent =
    new Date().getFullYear();

}


// ======================================================
// HEADER AL HACER SCROLL
// ======================================================

const updateHeader = () => {

  header?.classList.toggle(
    'scrolled',
    window.scrollY > 30
  );

};


window.addEventListener(
  'scroll',
  updateHeader,
  {
    passive: true
  }
);


updateHeader();


// ======================================================
// MENÚ MÓVIL
// ======================================================

menuToggle?.addEventListener(
  'click',
  () => {

    const open =
      mainNav?.classList.toggle('open');


    menuToggle.classList.toggle(
      'active',
      open
    );


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


    document.body.classList.toggle(
      'menu-open',
      open
    );

  }
);


// ======================================================
// CERRAR MENÚ AL PULSAR UN ENLACE
// ======================================================

document
  .querySelectorAll('.main-nav a')
  .forEach(
    link => {

      link.addEventListener(
        'click',
        () => {

          mainNav?.classList.remove(
            'open'
          );


          menuToggle?.classList.remove(
            'active'
          );


          menuToggle?.setAttribute(
            'aria-expanded',
            'false'
          );


          menuToggle?.setAttribute(
            'aria-label',
            'Abrir menú'
          );


          document.body.classList.remove(
            'menu-open'
          );

        }
      );

    }
  );


// ======================================================
// ANIMACIONES AL HACER SCROLL
// ======================================================

const observer =
  new IntersectionObserver(

    (entries, obs) => {

      entries.forEach(
        entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              'visible'
            );


            obs.unobserve(
              entry.target
            );

          }

        }
      );

    },

    {
      threshold: 0.1,

      rootMargin:
        '0px 0px -35px 0px'
    }

  );


document
  .querySelectorAll('.reveal')
  .forEach(
    element => {

      observer.observe(
        element
      );

    }
  );


// ======================================================
// SCROLL SUAVE
// ======================================================

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(
    anchor => {

      anchor.addEventListener(
        'click',
        event => {

          const targetId =
            anchor.getAttribute(
              'href'
            );


          if (
            !targetId ||
            targetId === '#'
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


          target.scrollIntoView({

            behavior: 'smooth',

            block: 'start'

          });

        }
      );

    }
  );