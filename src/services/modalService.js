export const modalService = {
  show(text) {
    const modal = document.querySelector(".app-modal");

    const textWrapper = document.querySelector(".app-modal__text");
    textWrapper.textContent = text;

    modal.classList.add("show");
  },

  hide() {
    const modal = document.querySelector(".app-modal.show");
    modal.classList.remove("show");
  },
};
