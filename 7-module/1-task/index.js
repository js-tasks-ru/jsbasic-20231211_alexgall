import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.addEventListeners();
  }

  render() {
		let list = this.categories.map((category) => {
			return `<a href='#' class='ribbon__item' data-id='${category.id}'>${category.name}</a>`;
		});

		this.elem = createElement(`
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <nav class="ribbon__inner">
        ${list.join('')}
      </nav>

      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `);

		this.ribbonInner = this.elem.querySelector('.ribbon__inner');

		return this.elem;
	}

  addEventListeners() {
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    this.elem.querySelector('.ribbon__arrow_left').onclick = () => {
      ribbonInner.scrollBy(-350, 0);
    };
    this.elem.querySelector('.ribbon__arrow_right').onclick = () => {
      ribbonInner.scrollBy(350, 0);
    };

    ribbonInner.addEventListener('scroll', () => {
      this.updateArrows();
    });

    this.elem.addEventListener('click', event => {
      if (event.target.closest('.ribbon__item')) {
        event.preventDefault();
        this.selectCategory(event.target.closest('.ribbon__item'));
      }
    });
  }

  updateArrows() {
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    let scrollLeft = ribbonInner.scrollLeft;
    let scrollWidth = ribbonInner.scrollWidth;
    let clientWidth = ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    this.elem.querySelector('.ribbon__arrow_left').classList.toggle('ribbon__arrow_visible', scrollLeft > 0);
    this.elem.querySelector('.ribbon__arrow_right').classList.toggle('ribbon__arrow_visible', scrollRight > 1);
  }

  selectCategory(selectedCategory) {
  
    let activeCategory = this.elem.querySelector('.ribbon__item_active');
    if (activeCategory) {
      activeCategory.classList.remove('ribbon__item_active');
    }

    selectedCategory.classList.add('ribbon__item_active');

    this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
      detail: selectedCategory.dataset.id,
      bubbles: true
    }));
  }
}
