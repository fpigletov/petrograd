export function hero() {

  if (document.querySelector('.main__hero')) {
    const heroDescr = document.querySelector('.hero__descr');
    const heroAnim = gsap.timeline();
    gsap.set('.hero__title-inner span', { y: 0 });

    function splitText(el) {
      el.innerHTML = el.textContent.replace(/(\S*)/g, m => {
        return `<span class="word">` +
          m.replace(/(-|#|@)?\S(-|#|@)?/g, "<span class='letter'>$&</span>") +
          `</span>`;
      });
      return el;
    }

    splitText(heroDescr);

    heroAnim.from('.wrapper', {
      opacity: 0,
      duration: 1,
    }).from('.hero__descr span', {
      stagger: 0.1,
      duration: 0.2,
      opacity: 0,
    }).from('.hero__title-inner span', {
      y: '100%',
      duration: 1,
      ease: 'power3.inOut'
    }).from('.hero__btn', {
      opacity: 0,
      duration: 1,
    }).from('.hero__img', {
      opacity: 0,
      duration: 1,
    }, '-=0.5').to('.marquee__text', {
      transform: 'translate(0%, 0%)',
      xPercent: 0,
    });
  }
}