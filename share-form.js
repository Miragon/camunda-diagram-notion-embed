import { InvalidUrlError } from "./https-url.js";
import { ShareUrl } from "./share-url.js";

export class ShareForm {
  static #COPIED_LABEL_DURATION_MS = 1400;

  #shareInput = document.getElementById("embedUrl");
  #errorMessage = document.getElementById("url-error");
  #resultSection = document.getElementById("form-result");
  #resultInput = document.getElementById("finalUrl");
  #generateButton = document.getElementById("generate-button");
  #copyButton = document.getElementById("copy-button");
  #notionEmbedLink;

  constructor(notionEmbedLink) {
    this.#notionEmbedLink = notionEmbedLink;
    this.#shareInput.addEventListener("input", () => this.#clearError());
    this.#shareInput.addEventListener("keydown", (event) => this.#generateOnEnter(event));
    this.#generateButton.addEventListener("click", () => this.#generate());
    this.#copyButton.addEventListener("click", () => this.#copy());
  }

  showError(message) {
    this.#errorMessage.textContent = message;
    this.#errorMessage.classList.remove("hide");
    this.#shareInput.classList.add("invalid");
    this.#shareInput.setAttribute("aria-invalid", "true");
    this.#resultSection.classList.add("hide");
  }

  #clearError() {
    this.#errorMessage.classList.add("hide");
    this.#shareInput.classList.remove("invalid");
    this.#shareInput.removeAttribute("aria-invalid");
  }

  #generateOnEnter(event) {
    if (event.key !== "Enter") return;
    event.preventDefault();
    this.#generate();
  }

  #generate() {
    try {
      const shareUrl = new ShareUrl(this.#shareInput.value.trim());
      this.#showResult(this.#notionEmbedLink.create(shareUrl.toEmbedUrl()));
    } catch (error) {
      if (!(error instanceof InvalidUrlError)) throw error;
      this.showError(error.message);
    }
  }

  #showResult(notionEmbedUrl) {
    this.#clearError();
    this.#resultInput.value = notionEmbedUrl;
    this.#resultSection.classList.remove("hide");
  }

  async #copy() {
    try {
      await navigator.clipboard.writeText(this.#resultInput.value);
      this.#flashCopiedLabel();
    } catch {
      this.#resultInput.select();
    }
  }

  #flashCopiedLabel() {
    const originalLabel = this.#copyButton.textContent;
    this.#copyButton.textContent = "Copied!";
    setTimeout(() => {
      this.#copyButton.textContent = originalLabel;
    }, ShareForm.#COPIED_LABEL_DURATION_MS);
  }
}
