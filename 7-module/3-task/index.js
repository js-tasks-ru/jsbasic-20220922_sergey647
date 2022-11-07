export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.container = document.querySelector('.container');
    this.steps = steps;
    this.segments = steps - 1;
    this.render();
    this.setValue(value);
  }
  render() {
    this.container.insertAdjacentHTML('afterbegin',`
        <div class="slider">
          <div class="slider__thumb" style="left: 0%;">
            <span class="slider__value"></span>
          </div>
          <div class="slider__progress" style="width: 0px;"></div>
          <div class="slider__steps"></div>
        </div>
    `);
    this.elem = this.container.querySelector('.slider');
    this.sliderSteps = this.elem.querySelector('.slider__steps');
    for (let i = 0; i < this.steps; i += 1) {
      let span = document.createElement("span");
      this.sliderSteps.append(span);
    }
    this.elem.addEventListener('click', event => {
      this.stepSelect(event);
      this.elem.dispatchEvent(
        new CustomEvent('slider-change', {
          detail: this.value,//-1
          bubbles: true
        })
      )
    });
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
    document.querySelector('.slider__value').textContent = this.value + 1;
    this.sliderSteps.querySelectorAll('span').item(this.value).classList.add('slider__step-active');
    this.valuePercents = this.value / this.segments * 100;
    this.elem.querySelector('.slider__thumb').style.left = this.valuePercents + '%';
    this.elem.querySelector('.slider__progress').style.width = this.valuePercents + '%';
  }
  setValue(value) {
    this.value = value;
    this.renderSlider();
  }
}
