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