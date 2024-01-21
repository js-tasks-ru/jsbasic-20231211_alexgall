import createElement from "../../assets/lib/create-element.js";

export default class CartIcon {
  constructor() {
    this.render();
    this.initialTopCoord = null;
    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add("cart-icon_visible");

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart
            .getTotalPrice()
            .toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add("shake");
      this.elem.addEventListener(
        "transitionend",
        () => {
          this.elem.classList.remove("shake");
        },
        { once: true }
      );
    } else {
      this.elem.classList.remove("cart-icon_visible");
    }
  }

  addEventListeners() {
    document.addEventListener("scroll", () => this.updatePosition());
    window.addEventListener("resize", () => this.updatePosition());
  }

  updatePosition() {
    if (!this.initialTopCoord) {
      this.calcTopCoord();
    }

    const isMobile = document.documentElement.clientWidth <= 767;
    if (isMobile) {
      this.resetElementStyle();
      return;
    }

    if (window.pageYOffset > this.initialTopCoord) {
      const containerRight = document
        .querySelector(".container")
        .getBoundingClientRect().right;
      const clientRightDistance =
        document.documentElement.clientWidth - this.elem.offsetWidth - 10;
      const leftIndent =
        Math.min(containerRight + 20, clientRightDistance) + "px";

      const elemProps = {
        position: "fixed",
        top: "50px",
        zIndex: 1000,
        right: "10px",
        left: leftIndent,
      };

      this.setElementStyle(elemProps);
    } else {
      this.resetElementStyle();
    }
  }

  resetElementStyle() {
    Object.assign(this.elem.style, {
      position: "",
      top: "",
      zIndex: "",
      left: "",
    });
  }

  setElementStyle(styleProps) {
    Object.assign(this.elem.style, styleProps);
  }

  calcTopCoord() {
    this.initialTopCoord =
      this.elem.getBoundingClientRect().top + window.pageYOffset;
  }
}