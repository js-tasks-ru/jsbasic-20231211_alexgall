import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.element = createElement(`
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

    this.modalTitle = this.element.querySelector(".modal__title");
    this.modalBody = this.element.querySelector(".modal__body");

    document.addEventListener("keydown", this.handleKeyDownClose.bind(this));
  }

  setTitle = (title) => {
    this.modalTitle.textContent = title;
  };

  setBody = (node) => {
    this.modalBody.innerHTML = "";
    this.modalBody.append(node);
  };

  open() {
    this.documentBody = document.querySelector("body");
    this.documentBody.classList.add("is-modal-open");
    this.documentBody.append(this.element);
  }

  setupEventListeners() {
    this.element.onclick = ({ target }) => {
      let closeBtn = target.closest(".modal__close");
      if (closeBtn) {
        this.close();
      }
    };
  }

  handleKeyDownClose(event) {
    if (event.code === "Escape") {
      this.close();
    }
  }

  close() {
    document.querySelector("body").classList.remove("is-modal-open");
    this.element.remove();
    document.removeEventListener("keydown", this.handleKeyDownClose.bind(this));
  }
}