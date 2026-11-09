import { toEmbedUrl, toNotionEmbedUrl, validateShareUrl } from "./embed.js";

const COPIED_LABEL_DURATION_MS = 1400;

const shareInput = () => document.getElementById("embedUrl");
const errorMessage = () => document.getElementById("url-error");
const resultSection = () => document.getElementById("form-result");
const resultInput = () => document.getElementById("finalUrl");

export function showError(message) {
  errorMessage().textContent = message;
  errorMessage().classList.remove("hide");
  shareInput().classList.add("invalid");
  shareInput().setAttribute("aria-invalid", "true");
  resultSection().classList.add("hide");
}

function clearError() {
  errorMessage().classList.add("hide");
  shareInput().classList.remove("invalid");
  shareInput().removeAttribute("aria-invalid");
}

function generateNotionEmbedUrl() {
  const shareUrl = shareInput().value.trim();
  const error = validateShareUrl(shareUrl);
  if (error) {
    showError(error);
    return;
  }
  clearError();
  resultInput().value = toNotionEmbedUrl(window.location, toEmbedUrl(shareUrl));
  resultSection().classList.remove("hide");
}

function flashCopiedLabel(button) {
  const originalLabel = button.textContent;
  button.textContent = "Copied!";
  setTimeout(() => {
    button.textContent = originalLabel;
  }, COPIED_LABEL_DURATION_MS);
}

async function copyNotionEmbedUrl(event) {
  try {
    await navigator.clipboard.writeText(resultInput().value);
    flashCopiedLabel(event.currentTarget);
  } catch {
    resultInput().select();
  }
}

export function setUpForm() {
  shareInput().addEventListener("input", clearError);
  shareInput().addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    generateNotionEmbedUrl();
  });
  document.getElementById("generate-button").addEventListener("click", generateNotionEmbedUrl);
  document.getElementById("copy-button").addEventListener("click", copyNotionEmbedUrl);
}
