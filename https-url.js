export class InvalidUrlError extends Error {}

export class HttpsUrl {
  static parse(value, errorMessage) {
    const url = URL.canParse(value) ? new URL(value) : null;
    if (url?.protocol !== "https:") throw new InvalidUrlError(errorMessage);
    return url;
  }
}
