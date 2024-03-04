export function smoothScroll() {
  // Smooth Scroll
  const lenis = new Lenis({
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // initScrollTrigger();
}