const EMBED_URL_PARAM = "u";
const SHARE_SEGMENT = "share";
const EMBED_SEGMENT = "embed";

function parseHttpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

function pathSegments(url) {
  return url.pathname.split("/");
}

export function validateShareUrl(value) {
  if (!value) return "Please paste a share URL.";
  const url = parseHttpsUrl(value);
  if (!url) return "The URL must be a valid https:// link.";
  const segments = pathSegments(url);
  if (!segments.includes(SHARE_SEGMENT) && !segments.includes(EMBED_SEGMENT))
    return "This is not a share link. In Camunda, use Share, then Create link and Copy.";
  return null;
}

export function toEmbedUrl(shareUrl) {
  const url = new URL(shareUrl);
  const segments = pathSegments(url);
  const shareIndex = segments.indexOf(SHARE_SEGMENT);
  if (shareIndex !== -1) segments[shareIndex] = EMBED_SEGMENT;
  url.pathname = segments.join("/");
  return url.href;
}

export function toNotionEmbedUrl(pageLocation, embedUrl) {
  const notionEmbedUrl = new URL(pageLocation.pathname, pageLocation.origin);
  notionEmbedUrl.searchParams.set(EMBED_URL_PARAM, embedUrl);
  return notionEmbedUrl.href;
}

export function readRequestedEmbedUrl(pageLocation) {
  return new URLSearchParams(pageLocation.search).get(EMBED_URL_PARAM);
}

export function isEmbeddableUrl(value) {
  return parseHttpsUrl(value) !== null;
}

export function showEmbed(embedUrl) {
  document.querySelector(".container").classList.add("embed-mode");
  document.getElementById("form").classList.add("hide");
  const iframe = document.getElementById("draw-iframe");
  iframe.src = embedUrl;
  iframe.classList.remove("hide");
}
