import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  #arrowLeft;
  #arrowRight;
  #ribbonInner;
  #slidePosition;
  #categories;
  constructor(categories) {
    this.#categories = categories;
    this.#slidePosition = 0;
    this.render();
  }

  render() {
    this.elem = createElement(`
      <div class="ribbon">
      <!--Кнопка прокрутки влево-->
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
  
      <!--Ссылки на категории-->
      <nav class="ribbon__inner"></nav>
  
      <!--Кнопка прокрутки вправо-->
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>`);

    this.#arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.#arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    this.#ribbonInner = this.elem.querySelector('.ribbon__inner');

    this.#arrowLeft.addEventListener('click', ()=>{ this.slideEffect('left'); });
    this.#arrowRight.addEventListener('click', ()=>{ this.slideEffect('right'); });
    this.#ribbonInner.addEventListener('scroll', (e)=>{
      this.checkArrows( this.#ribbonInner.scrollLeft );
    });


    this.#categories.map((item)=>{
      let btn = createElement(`<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`);
      btn.addEventListener('click', () => { this.onBtnClick(item.id); });
      this.#ribbonInner.append(btn);
    });
  }

  onBtnClick(id) {
    let me = this;
    const items = document.querySelectorAll('.ribbon__item');
    for(let i = 0; i < items.length; i += 1) {
      if(items[i].dataset.id === id) {
        items[i].classList.add('ribbon__item_active');
        console.log(id)
        me.elem.dispatchEvent(
          new CustomEvent("ribbon-select", {
            detail: id,
            bubbles: true
          })
        );
      } else {
        items[i].classList.remove('ribbon__item_active');
      }
    }

  }
  checkArrows(pos) {
    if(pos === 0) {
      this.#arrowLeft.classList.remove("ribbon__arrow_visible");

    } else if(this.#ribbonInner.scrollWidth - this.#ribbonInner.scrollLeft - this.#ribbonInner.clientWidth === 0) {
      this.#arrowRight.classList.remove("ribbon__arrow_visible");

    } else {
      this.#arrowRight.classList.add("ribbon__arrow_visible");
      this.#arrowLeft.classList.add("ribbon__arrow_visible");
    }
  }

  slideEffect(dest) {
    if(dest === 'right') {
      this.#ribbonInner.scrollBy(350, 0);

    } else if(dest === 'left') {
      this.#ribbonInner.scrollBy(-350, 0);
    }
  }
}
