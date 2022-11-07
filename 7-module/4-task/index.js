export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.container = document.querySelector('.container');
    this.steps = steps;
    this.segments = steps - 1;
    this.render();
    this.setValue(value);
    this.dragged = false;
    this.progressX = 0;
    this.progressPerc = 0;
  }
  render() {
    let me = this;
    this.container.insertAdjacentHTML('afterbegin',`
        <div class="slider">
          <div class="slider__thumb" style="left: 0%;">
            <span class="slider__value"></span>
          </div>
          <div class="slider__progress" style="width: 0;"></div>
          <div class="slider__steps"></div>
        </div>
    `);
    this.elem = this.container.querySelector('.slider');
    let elem = document.querySelector('.slider');
    const sliderLeft = elem.getBoundingClientRect().left;
    const sliderRight = elem.getBoundingClientRect().right;
    this.sliderSteps = this.elem.querySelector('.slider__steps');
    for (let i = 0; i < this.steps; i += 1) {
      let span = document.createElement("span");
      this.sliderSteps.append(span);
    }
    this.elem.addEventListener('click', e => {
      me.progressX = e.clientX - sliderLeft;
      this.stepSelect(e);
      this.elem.dispatchEvent(
        new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        })
      );
    });
    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;
    thumb.onpointerdown = (e) => {
      elem.classList.add('slider_dragging');
      this.dragged = true;
    };
    document.onpointermove = (e) => {
      if (this.dragged) {
        if (e.clientX > sliderLeft && e.clientX < sliderRight) {
          this.progressX = e.clientX - sliderLeft;
          this.stepSelect(e);
          thumb.style.left = me.progressPerc + '%';
        }
      }
    };
    document.onpointerup = (e) => {
      let elem = document.querySelector('.slider');
      elem.classList.remove('slider_dragging');
      this.dragged = false;
      this.elem.dispatchEvent(
        new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        })
      );
    };
  }
  stepSelect(e) {
    let left = e.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let approximateValue = leftRelative * this.segments;
    const approx = Math.round(approximateValue);
    this.setValue(approx);
  }
  renderSlider() {
    const stepActive = this.sliderSteps.querySelector('.slider__step-active');
    if (stepActive) {
      stepActive.classList.remove('slider__step-active');
    }
    let elem = document.querySelector('.slider');
    const sliderLeft = elem.getBoundingClientRect().left;
    const sliderRight = elem.getBoundingClientRect().right;
    document.querySelector('.slider__value').textContent = this.value + 1;
    this.sliderSteps.querySelectorAll('span').item(this.value).classList.add('slider__step-active');
    this.valuePercents = Math.round(this.value / this.segments * 100);
    this.progressPerc = Math.round(this.progressX * 100 / (sliderRight - sliderLeft));
    this.elem.querySelector('.slider__thumb').style.left = this.valuePercents + '%';
    this.elem.querySelector('.slider__progress').style.width = this.progressPerc + '%';

    if (!this.dragged) {
      this.elem.querySelector('.slider__progress').style.width = this.valuePercents + '%';
    }
  }
  setValue(value) {
    this.value = value;
    this.renderSlider();
  }
}
