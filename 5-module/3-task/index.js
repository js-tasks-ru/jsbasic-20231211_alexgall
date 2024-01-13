function initCarousel() {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.carousel__inner .carousel__slide');
  const totalSlides = slides.length;
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const carouselInner = document.querySelector('.carousel__inner');

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
