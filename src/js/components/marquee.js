export function marquee() {
  const marquee = document.querySelector('.main__marquee');
  const marqBtns = document.querySelectorAll('.marquee__btn');
  const marqVideo = document.querySelector('.marquee__video video');

  if (marquee) {

    gsap.set('.marquee__content--goto', {
      rotation: '20',
      y: '200%',
    });

    function setMarq(x) {
      gsap.set('.marquee__wrapper--left', {
        xPercent: x,
      });

      gsap.set('.marquee__wrapper--right', {
        xPercent: -x,
      });
    }

    setMarq(150);

    gsap.matchMedia().add('(max-width: 768px)', () => {

      setMarq(200);

    }).add('(max-width: 480px)', () => {

      setMarq(300);

    });

    gsap.set('.marquee__text', {
      xPercent: 0,
    });

    //Marq Animation
    let marqAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: '.main__marquee',
        scrub: 1.5,
        onLeave: () => {
          marqMoving.play();
        },
        onEnterBack: () => {
          marqMoving.pause();
        },
        start: "top 40%",
        end: "bottom bottom",
      }
    });

    gsap.set('.header', {
      y: '0',
      opacity: 1
    })

    marqAnimation.to('.header', {
      y: '-100',
      opacity: 0
    }).to('.marquee__wrapper--left', {
      onStart: () => marqVideo.play(),
      xPercent: -50,
      ease: 'power1.out',
      duration: 5
    }, '-=5').to('.marquee__wrapper--right', {
      xPercent: 50,
      ease: 'power1.out',
      duration: 5
    }, '-=5').from('.marquee__content--video', {
      rotation: '20',
      y: '200%',
      duration: 4
    }, '-=4').to('.header', {
      position: 'fixed',
      y: '0',
      opacity: 1,
      duration: 1,
    });

    //Marq Moving
    const marqMoving = gsap.timeline({ paused: true });
    marqMoving.fromTo('.marquee__wrapper--left .marquee__text', {
      xPercent: 0,
    }, {
      xPercent: -200,
      repeat: -1,
      duration: 2,
      ease: 'linear',
    }).fromTo('.marquee__wrapper--right .marquee__text', {
      xPercent: 0,
    }, {
      xPercent: 200,
      repeat: -1,
      duration: 2,
      ease: 'linear'
    }).totalProgress(0.7);

    //Go To Animation
    function changeContext() {
      const marqTexts = document.querySelectorAll('.marquee__text');
      marqTexts.forEach(text => {
        if (text.textContent === 'Видео') {
          text.textContent = 'Велосипед'
        } else {
          text.textContent = 'Видео'
        }
      });
    }

    function goToAnim() {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.main__marquee',
          scrub: 1.5,
          start: "top top",
          end: "+=600",
          pin: true,
          pinSpacing: true,
          immediateRender: false,
          invalidateOnRefresh: true,
        }
      });

      tl.to('.marquee__content--video', {
        rotation: '-20',
        y: '-200%',
        duration: 4,
        delay: 0.2,
      }).to('.marquee__content--goto', {
        rotation: '0',
        y: '0',
        duration: 4
      }, '-=4').to('.marquee__wrapper', {
        onStart: () => changeContext(),
        onReverseComplete: () => changeContext(),
      }, '-=2');

      ScrollTrigger.refresh();

      return tl;
    }

    marqAnimation.add(goToAnim());

    //Btns Animation
    const btnAnimation = gsap.timeline();

    btnAnimation.to('.marquee__btn > svg', {
      rotation: -360,
      duration: 5,
      ease: 'none',
      repeat: -1
    });

    marqBtns.forEach(btn => {
      btn.addEventListener('mouseover', () => {
        gsap.to(btnAnimation, { timeScale: 2 });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btnAnimation, { timeScale: 1 });
      });
    });
  }
}
