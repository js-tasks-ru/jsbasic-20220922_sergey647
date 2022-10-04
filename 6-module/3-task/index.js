import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  #slides;
  #activeSlide;
  #arrowRight;
  #arrowLeft;
  #innerDiv;
  #slidePosition;
  constructor(slides) {
    this.#slides = slides;
    this.#activeSlide = 0;
    this.#slidePosition = 0;

    this.render();
    this.slideEffect();
  }
  render() {
    this.elem = createElement(`
    <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner"></div>
    </div>
    `);

    this.#arrowRight = this.elem.querySelector(".carousel__arrow_right");
    this.#arrowLeft = this.elem.querySelector(".carousel__arrow_left");
    this.#arrowRight.addEventListener('click', (e)=>{this.slideEffect('right'); });
    this.#arrowLeft.addEventListener('click', (e)=>{this.slideEffect('left'); });
    this.#innerDiv = this.elem.querySelector(".carousel__inner");

    let el = this.elem.querySelector(".carousel__inner");
    this.#slides
      .map((slide)=> {
        let price = slide.price.toFixed(2);
        let resSlide = createElement(`
          <div class="carousel__slide" data-id="${slide.id}">
              <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
              <div class="carousel__caption">
                <span class="carousel__price">€${price}</span>
                <div class="carousel__title">${slide.name}</div>
                <button type="button" class="carousel__button">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
              </div>
          </div>`);
        let btn = resSlide.querySelector(".carousel__button");
        btn.addEventListener('click', (e) => {
          this.elem.dispatchEvent(
            new CustomEvent("product-add", {
              detail: slide.id,
              bubbles: true
            })
          );
        });
        return resSlide;
      })
      .forEach(itm=>el.append(itm));
  }
  slideEffect(dest) {
    if (dest === 'right') {
      if (this.#activeSlide < this.#slides.length) {
        this.#activeSlide++;
        this.#slidePosition = this.#slidePosition - this.#innerDiv.offsetWidth;
        this.#innerDiv.style.transform = `translateX(${this.#slidePosition}px)`;
      }
    } else if (dest === 'left') {
      if (this.#activeSlide > 0) {
        this.#activeSlide--;
        this.#slidePosition = this.#slidePosition + this.#innerDiv.offsetWidth;
        this.#innerDiv.style.transform = `translateX(${this.#slidePosition}px)`;
      }
    }
    this.#arrowRight.style.display = '';
    this.#arrowLeft.style.display = '';
    if (this.#activeSlide === this.#slides.length - 1) {
      this.#arrowRight.style.display = 'none';
    } else if (this.#activeSlide <= 0) {
      this.#arrowLeft.style.display = 'none';
    }

  }
}
