export function header() {
  const header = document.querySelector('.header');
  const burger = document.querySelector('.header__burger');
  const wrapper = document.querySelector('.wrapper');
  const headerLinks = document.querySelectorAll('.header__link');
  const scrollWidth = window.innerWidth - wrapper.offsetWidth + 'px';
  const menuAnimation = gsap.timeline({ paused: true });
  let isOpen = false;
  let isActive = false;

  //Menu Animation
  gsap.matchMedia().add('(max-width: 992px)', () => {
    gsap.set('.header__link', { y: 0 });

    menuAnimation.to('.overlay', {
      opacity: 1,
      visibility: 'visible',
    }).to('.overlay__block', {
      duration: 1,
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      stagger: 0.07,
      ease: 'power3.inOut'
    }).to('.header__menu', {
      opacity: 1,
      visibility: 'visible',
      duration: 1,
      ease: 'power3.inOut'
    }).from('.header__link', {
      y: '100%',
      duration: 1,
      ease: 'power3.inOut'
    }, '-=1');
  });

  function openMenu() {
    document.body.classList.add('hidden');
    document.body.setAttribute('data-lenis-prevent', 'true');

    if (header.classList.contains('active')) {
      header.classList.remove('active');
      isActive = true;
    }
  }

  function closeMenu() {
    document.body.classList.remove('hidden');
    document.body.removeAttribute('data-lenis-prevent');

    if (isActive) {
      header.classList.add('active');
      isActive = false;
    }
  }

  burger.addEventListener('click', () => {
    let ariaLabel = burger.getAttribute('aria-label');
    burger.classList.toggle('active');

    if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      if (burger.classList.contains('active')) {
        setTimeout(function () {
          document.body.style.paddingRight = scrollWidth;
          header.style.paddingRight = scrollWidth;
          openMenu();

        }, 600);
      } else {
        setTimeout(function () {
          document.body.style.paddingRight = '';
          header.style.paddingRight = '';
          closeMenu();
        }, 2200);
      }
    } else {
      if (burger.classList.contains('active')) {
        setTimeout(function () {
          openMenu();
        }, 600);
      } else {
        setTimeout(function () {
          closeMenu();
        }, 2200);
      }
    }

    if (ariaLabel === 'Открыть меню') {
      burger.setAttribute('aria-label', 'Закрыть меню');
    } else {
      burger.setAttribute('aria-label', 'Открыть меню');
    }

    if (isOpen) {
      menuAnimation.reverse();
    } else {
      menuAnimation.play();
    }

    isOpen = !isOpen;
  });

  if (!isOpen) {
    headerLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        menuAnimation.reverse();
        burger.setAttribute('aria-label', 'Открыть меню');
        burger.classList.remove('active');
        isOpen = !isOpen;

        if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
          setTimeout(function () {
            closeMenu();
            document.body.style.paddingRight = '';
            header.style.paddingRight = '';
          }, 2200);
        } else {
          setTimeout(function () {
            closeMenu();
          }, 2200);
        }
      })
    });
  }

  //Header Colors
  const heroSection = document.querySelector('.main__hero');
  const appSection = document.querySelector('.main__application');

  //Header on scroll 
  function headerOnScroll() {
    if (window.scrollY > (heroSection.offsetHeight - 60) && window.scrollY < (appSection.offsetTop - 50)) {
      header.classList.add('active');
    } else {
      header.classList.remove('active');
    }

    headerLinks.forEach(link => {
      if (window.scrollY > (appSection.offsetTop - 50)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', headerOnScroll);
  window.addEventListener('load', headerOnScroll);
}