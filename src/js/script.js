'use strict';

import { header } from './components/header';
import { hero } from './components/hero';
import { marquee } from './components/marquee';
import { form } from './components/form';
import { smoothScroll } from './components/smoothscroll';

window.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // ScrollSmoother.create({
  //   wrapper: '.smooth-wrapper',
  //   content: '.smooth-content',
  //   smooth: 1.5,
  //   effects: true
  // });

  //Header
  header();

  //Hero
  hero();

  //Marquee Animation
  marquee();

  //Form
  form();




  //Smooth scroll
  smoothScroll();


});


