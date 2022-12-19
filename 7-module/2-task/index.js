import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.eventListener = e => {
      if (e.code === "Escape") {
        this.close();
      }
    };
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);
    const overlay = this.elem.querySelector('.modal__overlay');
    const closeBtn = this.elem.querySelector('.modal__close');
    overlay.addEventListener('click', () => this.close());
    closeBtn.addEventListener('click', () => this.close());
    document.body.addEventListener('keydown', this.eventListener );
  }
  open() {
    document.body.append( this.elem );
    document.body.classList.add("is-modal-open");
  }
  setTitle(title) {
    this.elem.querySelector(".modal__title").textContent = title;
  }
  setBody(body) {
    let el = this.elem.querySelector(".modal__body");
    el.innerHTML = '';
    el.append(body);//replaceWith
  }
  close() {
    this.elem.remove();
    document.body.classList.remove("is-modal-open");
    document.body.removeEventListener('keydown', this.eventListener);
  }
}
