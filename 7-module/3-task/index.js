import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.stepsCount = steps;
    this.currentValue = value;
    this.renderSlider();
    this.addSliderEventListeners();
  }

  renderSlider() {
    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps"></div>
      </div>
    `);

    for (let i = 0; i < this.stepsCount; i++) {
      this.getSliderElement('steps').append(createElement('<span></span>'));
    }

    this.updateSlider();
  }

  addSliderEventListeners() {
    this.elem.onclick = event => {
      if (event.target.matches('.slider__steps span')) {
        this.currentValue = Array.from(this.getSliderElement('steps').children).indexOf(event.target);
      } else {
        let sliderBox = this.getSliderElement('steps').getBoundingClientRect();
        let sliderX = event.pageX - sliderBox.left;
        let stepSize = Math.round(sliderBox.width / (this.stepsCount - 1));
        this.currentValue = Math.round(sliderX / stepSize);
      }

      let customEvent = new CustomEvent('slider-change', {
        detail: this.currentValue,
        bubbles: true
      });

      this.elem.dispatchEvent(customEvent);
      this.updateSlider();
    }
  }

  getSliderElement(ref) {
    return this.elem.querySelector(`.slider__${ref}`);
  }

  updateSlider() {
    this.getSliderElement('value').textContent = this.currentValue;
    this.elem.querySelector('.slider__step-active')?.classList.remove('slider__step-active');
    this.getSliderElement('steps').children[this.currentValue].classList.add('slider__step-active');
    let leftPercents = Math.round(100 / (this.stepsCount - 1) * this.currentValue);
    this.getSliderElement('thumb').style.left = `${leftPercents}%`;
    this.getSliderElement('progress').style.width = `${leftPercents}%`;
  }
}