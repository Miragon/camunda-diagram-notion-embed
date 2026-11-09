import { isEmbeddableUrl, readRequestedEmbedUrl, showEmbed } from "./embed.js";
import { setUpForm, showError } from "./form.js";

const requestedEmbedUrl = readRequestedEmbedUrl(window.location);

if (requestedEmbedUrl === null) {
  setUpForm();
} else if (isEmbeddableUrl(requestedEmbedUrl)) {
  showEmbed(requestedEmbedUrl);
} else {
  setUpForm();
  showError("This embed link isn't a valid https:// URL.");
}
