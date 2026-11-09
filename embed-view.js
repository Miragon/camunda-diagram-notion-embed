export class EmbedView {
  #container = document.querySelector(".container");
  #form = document.getElementById("form");
  #iframe = document.getElementById("draw-iframe");

  show(embedUrl) {
    this.#container.classList.add("embed-mode");
    this.#form.classList.add("hide");
    this.#iframe.src = embedUrl;
    this.#iframe.classList.remove("hide");
  }
}
