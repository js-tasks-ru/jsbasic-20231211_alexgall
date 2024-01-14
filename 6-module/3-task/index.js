import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = createElement(`
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
        ${this.slides.map(slide => `
          <div class="carousel__slide" data-id="${slide.id}">
            <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="${slide.name}">
            <div class="carousel__caption">
              <span class="carousel__price">€${slide.price.toFixed(2)}</span>
              <div class="carousel__title">${slide.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `);
    this.initCarousel();
    this.addEventListeners();
  }
  initCarousel() {
      let currentSlide = 0;
      const slides = this.elem.querySelectorAll('.carousel__inner .carousel__slide');
      const totalSlides = slides.length;
      const arrowRight = this.elem.querySelector('.carousel__arrow.carousel__arrow_right');
      const arrowLeft = this.elem.querySelector('.carousel__arrow.carousel__arrow_left');
      const carouselInner = this.elem.querySelector('.carousel__inner');
    
      arrowLeft.style.display ='none';
    
      function checkArrowsToHide() {  
        arrowRight.style.display = currentSlide === totalSlides - 1 ? 'none' : '';
        arrowLeft.style.display = currentSlide === 0 ? 'none' : '';
      }
    
      function updateCarouselPosition() {
        carouselInner.style.transform = `translateX(-${carouselInner.offsetWidth * currentSlide}px)`;
      }
    
      arrowRight.addEventListener('click', () => {
        currentSlide++;
        updateCarouselPosition();
        checkArrowsToHide();
      })
    
      arrowLeft.addEventListener('click', () => {
        currentSlide--;
        updateCarouselPosition();
        checkArrowsToHide();
      })
    }
    addEventListeners() {
    this.elem.onclick = ({ target }) => {
      let button = target.closest('.carousel__button');
      if (!button) return;

      let slide = target.closest('.carousel__slide');
      let id = slide.dataset.id;

      this.elem.dispatchEvent(new CustomEvent('product-add', {
        detail: id,
        bubbles: true
      }));
    };
  }
  }

  


