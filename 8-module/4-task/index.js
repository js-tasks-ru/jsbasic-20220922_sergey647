import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product || !product.id) return false;
    let exists = false;
    let prodObj;
    this.cartItems.map((itm, idx) => {
      if (itm.product.id === product.id) {
        this.cartItems[idx].count += 1;
        prodObj = this.cartItems[idx];
        exists = true;
      }
    });
    if (!exists) {
      prodObj = {
        product: product,
        count: 1
      };
      this.cartItems.push(prodObj);
    }
    this.onProductUpdate(prodObj);
  }

  updateProductCount(productId, amount) {
    let prodObj;
    this.cartItems.map((itm, idx) => {
      if (itm.product.id === productId) {
        if(amount > 0) {
          this.cartItems[idx].count += 1;
        } else {
          this.cartItems[idx].count -= 1;
          if(this.cartItems[idx].count <= 0) {
            this.cartItems.splice(idx, 1)
          }
        }
        prodObj = this.cartItems[idx];
      }
    });
    this.onProductUpdate(prodObj);
  }

  isEmpty() {
    return (!this.cartItems.length);
  }

  getTotalCount() {
    let count = 0;
    this.cartItems.map((itm) => {
      if (itm.count) {
        count += itm.count;
      }
    });
    return count;
  }

  getTotalPrice() {
    let price = 0;
    this.cartItems.map((itm) => {
      price += (itm.product.price * itm.count);
    });
    return price;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    const modal = new Modal;
    this.modal = modal;
    modal.open();
    modal.setTitle('Your order');
    let modalBody = document.createElement('div');
    this.cartItems.map((itm) => {
      modalBody.append(this.renderProduct(itm.product, itm.count));
    });
    modalBody.append(this.renderOrderForm());
    modal.setBody(modalBody);

    const items = document.querySelectorAll('.cart-product');
    items.forEach((el)=> {
      let prod = el.closest('div[data-product-id]');
      const prodId = prod.getAttribute('data-product-id');
      const minus = prod.querySelector('.cart-counter__button_minus');
      const plus = prod.querySelector('.cart-counter__button_plus');
      minus.addEventListener('click', evt => {
        this.updateProductCount(prodId, -1);
      });
      plus.addEventListener('click', evt => {
        this.updateProductCount(prodId, 1);
      });
    });
    const form = document.querySelector('.cart-form');
    form.addEventListener('submit', e => {
      this.onSubmit(e)
    });
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    if (this.cartItems.length === 0) {
      document.querySelector('.is-modal-open').classList.remove('is-modal-open');
      document.querySelector('.modal').remove();
    }
    if(cartItem && document.body.classList.contains ("is-modal-open")) {

      let productId = cartItem.product.id; // Уникальный идентификатора товара (для примера)
      let modalBody = document.querySelector('.modal__body');
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    let modalBody = document.querySelector('.modal__body');
    let btn = modalBody.querySelector('[type="submit"]');
    btn.classList.add('is-loading');
    let formElem = document.querySelector('.cart-form');
    let modalTitle = document.querySelector('.modal__title');

    fetch('https://httpbin.org/post',{
      method: 'POST',
      body: new FormData(formElem)
    })
    .then(res => {
      modalTitle.textContent = 'Success!';
      this.cartItems = [];//.splice(0, this.cartItems.length);

      modalBody.innerHTML = `
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>`;
      });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

