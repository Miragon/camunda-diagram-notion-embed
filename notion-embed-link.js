import { HttpsUrl } from "./https-url.js";

export class NotionEmbedLink {
  static #EMBED_URL_PARAM = "u";

  #pageLocation;

  constructor(pageLocation) {
    this.#pageLocation = pageLocation;
  }

  create(embedUrl) {
    const link = new URL(this.#pageLocation.pathname, this.#pageLocation.origin);
    link.searchParams.set(NotionEmbedLink.#EMBED_URL_PARAM, embedUrl);
    return link.href;
  }

  get requestsEmbed() {
    return this.#searchParams().has(NotionEmbedLink.#EMBED_URL_PARAM);
  }

  get requestedEmbedUrl() {
    const embedUrl = this.#searchParams().get(NotionEmbedLink.#EMBED_URL_PARAM);
    return HttpsUrl.parse(embedUrl, "This embed link isn't a valid https:// URL.").href;
  }

  #searchParams() {
    return new URLSearchParams(this.#pageLocation.search);
  }
}
