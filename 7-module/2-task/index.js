import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  #title;
  #modalBody;
  constructor() {
    let me = this;
    this.#title = '';
    this.#modalBody = '';
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
    const removeFunc = function() {
      me.elem.remove();
    }
    const removeFuncKey = function(e) {
      if(e.code === "Escape") {
        me.elem.remove();
      }
    }
    const overlay = this.elem.querySelector('.modal__overlay');
    overlay.addEventListener('click', removeFunc);
    document.body.addEventListener('keydown', (e)=>{
      removeFuncKey(e);
      document.body.removeEventListener('keydown', removeFuncKey)
    });

    const closeBtn = this.elem.querySelector('.modal__close');
    closeBtn.addEventListener('click', removeFunc);
  }
  open() {
    document.body.append( this.elem );
    document.body.classList.add("is-modal-open");
  }
  setTitle(title) {
    this.elem.querySelector(".modal__title").innerHTML = title;
  }
  setBody(body) {
    console.log(body);
    this.elem.querySelector(".modal__body").append(body);
  }
  close() {
    document.body.classList.remove("is-modal-open");
  }
}
