import { EmbedView } from "./embed-view.js";
import { InvalidUrlError } from "./https-url.js";
import { NotionEmbedLink } from "./notion-embed-link.js";
import { ShareForm } from "./share-form.js";

const notionEmbedLink = new NotionEmbedLink(window.location);

function showRequestedEmbed() {
  try {
    new EmbedView().show(notionEmbedLink.requestedEmbedUrl);
  } catch (error) {
    if (!(error instanceof InvalidUrlError)) throw error;
    new ShareForm(notionEmbedLink).showError(error.message);
  }
}

if (notionEmbedLink.requestsEmbed) showRequestedEmbed();
else new ShareForm(notionEmbedLink);
