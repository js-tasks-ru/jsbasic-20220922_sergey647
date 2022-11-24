import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');
      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition = () => {
    let cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.zIndex = '1000';
    let c = cartIcon.getBoundingClientRect();
    let leftIndent = Math.min(
      document.querySelector('.container').getBoundingClientRect().right + 20,
      document.documentElement.clientWidth - this.elem.offsetWidth - 10
    );
    if(!this.isHidden(cartIcon)) {
      if(c.top < 0) {
        if(cartIcon.style.position !== 'fixed') {cartIcon.style.position = 'fixed';}
        if(window.pageYOffset > c.top) {
          cartIcon.style.left = leftIndent + 'px';
        }
      } else {
        if(window.pageYOffset > c.top) {
          if(cartIcon.style.position === 'fixed') {
            cartIcon.style.left = leftIndent + 'px';
          }
        } else {
          if(cartIcon.style.position === 'fixed') {// схлопывание назад
            cartIcon.style.position = 'absolute';
            cartIcon.style.left = '';
          }
        }
      }
    }

    let isMobile = document.documentElement.clientWidth <= 767;
    if (isMobile) {
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        left: '',
        zIndex: ''
      });
    }
  }

  isHidden(elem) {
    return !elem.offsetWidth || !elem.offsetHeight;

  }
}
