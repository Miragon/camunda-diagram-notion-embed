import { HttpsUrl, InvalidUrlError } from "./https-url.js";

export class ShareUrl {
  static #SHARE_SEGMENT = "share";
  static #EMBED_SEGMENT = "embed";

  #url;

  constructor(value) {
    if (!value) throw new InvalidUrlError("Please paste a share URL.");
    this.#url = HttpsUrl.parse(value, "The URL must be a valid https:// link.");
    if (!this.#isShareOrEmbedLink())
      throw new InvalidUrlError("This is not a share link. In Camunda, use Share, then Create link and Copy.");
  }

  toEmbedUrl() {
    const embedUrl = new URL(this.#url);
    const segments = this.#pathSegments();
    const shareIndex = segments.indexOf(ShareUrl.#SHARE_SEGMENT);
    if (shareIndex !== -1) segments[shareIndex] = ShareUrl.#EMBED_SEGMENT;
    embedUrl.pathname = segments.join("/");
    return embedUrl.href;
  }

  #isShareOrEmbedLink() {
    const segments = this.#pathSegments();
    return segments.includes(ShareUrl.#SHARE_SEGMENT) || segments.includes(ShareUrl.#EMBED_SEGMENT);
  }

  #pathSegments() {
    return this.#url.pathname.split("/");
  }
}
