const Ease = {
  linear: t => t,
  i1: t => 1 - Math.cos(t * (.5 * Math.PI)),
  o1: t => Math.sin(t * (.5 * Math.PI)),
  io1: t => -.5 * (Math.cos(Math.PI * t) - 1),
  i2: t => t * t,
  o2: t => t * (2 - t),
  io2: t => t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1,
  i3: t => t * t * t,
  o3: t => --t * t * t + 1,
  io3: t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  i4: t => t * t * t * t,
  o4: t => 1 - --t * t * t * t,
  io4: t => t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  i5: t => t * t * t * t * t,
  o5: t => 1 + --t * t * t * t * t,
  io5: t => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
  i6: t => 0 === t ? 0 : 2 ** (10 * (t - 1)),
  o6: t => 1 === t ? 1 : 1 - 2 ** (-10 * t),
  io6: t => 0 === t || 1 === t ? t : (t /= .5) < 1 ? .5 * 2 ** (10 * (t - 1)) : .5 * (2 - 2 ** (-
    10 * --t))
};

const { linear, i1, o1, io1, i2, o2, io2, i3, o3, io3, i4, o4, io4, i5, o5, io5, i6, o6, io6 } =
Ease;

class Scroll {
  constructor() {
    this.selector = ".hero-scroll > div";
    this.delay = 1000;
  }
  init() {
    this.el = document.querySelector(this.selector);
    if (!this.el) return;
    setTimeout(() => this.el.classList.add("fx"), this.delay);
    this.el.addEventListener("animationiteration", this.handleAnimationIteration);
    ScrollTrigger.addEventListener("scrollStart", this.stopAfterCurrentLoop);
  }
  stopAfterCurrentLoop = () => {
    this.el.dataset.stopNext = "true";
    ScrollTrigger.removeEventListener("scrollStart", this.stopAfterCurrentLoop);
  }
  handleAnimationIteration = () => {
    if (this.el.dataset.stopNext === "true") {
      this.el.classList.remove("fx");
      delete this.el.dataset.stopNext;
    }
  }
} 
new Scroll().init();