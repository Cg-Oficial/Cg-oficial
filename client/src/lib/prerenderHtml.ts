const ROOT_PLACEHOLDER = '<div id="root"></div>';

export type SiteSeoMetadata = {
  title: string;
  description: string;
  keywords: readonly string[];
  publicOrigin: string | null;
  openGraphImageUrl: string | null;
};

/** Insere markup gerado por React no contêiner de publicação estática do Vite. */
export function injectPrerenderedContent(template: string, markup: string): string {
  if (!template.includes(ROOT_PLACEHOLDER)) {
    throw new Error('The HTML template is missing the application root placeholder.');
  }
  return template.replace(ROOT_PLACEHOLDER, `<div id="root">${markup}</div>`);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function insertHeadTag(html: string, tag: string): string {
  const headEnd = html.lastIndexOf("</head>");
  if (headEnd < 0) throw new Error("The HTML template is missing </head>.");
  return `${html.slice(0, headEnd)}    ${tag}\n  ${html.slice(headEnd)}`;
}

function findMetaStart(html: string, attribute: "name" | "property", key: string): number {
  const marker = `<meta ${attribute}="${key}`;
  let start = html.indexOf(marker);
  while (start >= 0) {
    if (html[start + marker.length] === '"') return start;
    start = html.indexOf(marker, start + marker.length);
  }
  return -1;
}

function replaceTagAt(html: string, start: number, replacement: string): string {
  const end = html.indexOf(">", start);
  if (end < 0) throw new Error("The HTML template contains an incomplete head tag.");
  return `${html.slice(0, start)}${replacement}${html.slice(end + 1)}`;
}

function upsertMeta(html: string, attribute: "name" | "property", key: string, value: string): string {
  const tag = `<meta ${attribute}="${escapeHtml(key)}" content="${escapeHtml(value)}" />`;
  const start = findMetaStart(html, attribute, key);
  return start < 0 ? insertHeadTag(html, tag) : replaceTagAt(html, start, tag);
}

function removeMeta(html: string, attribute: "name" | "property", key: string): string {
  const start = findMetaStart(html, attribute, key);
  return start < 0 ? html : replaceTagAt(html, start, "");
}

function normalizePublicOrigin(origin: string): string {
  const parsed = new URL(origin);
  if (parsed.protocol !== "https:" || !parsed.hostname) {
    throw new Error("The configured public origin must be a real HTTPS URL.");
  }
  return parsed.origin;
}

function setCanonicalLink(html: string, canonical: string | null): string {
  const marker = '<link rel="canonical"';
  const start = html.indexOf(marker);
  if (!canonical) return start < 0 ? html : replaceTagAt(html, start, "");

  const tag = `<link rel="canonical" href="${escapeHtml(canonical)}" />`;
  return start < 0 ? insertHeadTag(html, tag) : replaceTagAt(html, start, tag);
}

/** Gera metadados iniciais a partir de `siteConfig.seo`, sem depender de JavaScript no crawler. */
export function injectSiteSeoMetadata(
  template: string,
  seo: SiteSeoMetadata,
  siteName: string,
  imageAlt: string,
): string {
  const titleStart = template.indexOf("<title>");
  const titleEnd = titleStart < 0 ? -1 : template.indexOf("</title>", titleStart);
  if (titleStart < 0 || titleEnd < 0) throw new Error("The HTML template is missing <title>.");

  const titleTag = `<title>${escapeHtml(seo.title)}</title>`;
  let html = `${template.slice(0, titleStart)}${titleTag}${template.slice(titleEnd + "</title>".length)}`;
  html = upsertMeta(html, "name", "description", seo.description);
  html = upsertMeta(html, "name", "keywords", seo.keywords.join(", "));
  html = upsertMeta(html, "property", "og:site_name", siteName);
  html = upsertMeta(html, "property", "og:title", seo.title);
  html = upsertMeta(html, "property", "og:description", seo.description);
  html = upsertMeta(html, "name", "twitter:title", seo.title);
  html = upsertMeta(html, "name", "twitter:description", seo.description);

  const imageUrl = seo.openGraphImageUrl?.trim();
  if (imageUrl) {
    const parsedImageUrl = new URL(imageUrl);
    if (parsedImageUrl.protocol !== "https:") {
      throw new Error("The Open Graph image must use a public HTTPS URL.");
    }
    html = upsertMeta(html, "property", "og:image", parsedImageUrl.href);
    html = upsertMeta(html, "property", "og:image:alt", imageAlt);
    html = upsertMeta(html, "name", "twitter:image", parsedImageUrl.href);
    html = upsertMeta(html, "name", "twitter:image:alt", imageAlt);
    html = upsertMeta(html, "name", "twitter:card", "summary_large_image");
  } else {
    html = removeMeta(html, "property", "og:image");
    html = removeMeta(html, "property", "og:image:alt");
    html = removeMeta(html, "name", "twitter:image");
    html = removeMeta(html, "name", "twitter:image:alt");
    html = upsertMeta(html, "name", "twitter:card", "summary");
  }

  const canonical = seo.publicOrigin?.trim() ? normalizePublicOrigin(seo.publicOrigin) : null;
  html = canonical
    ? upsertMeta(html, "property", "og:url", canonical)
    : removeMeta(html, "property", "og:url");
  return setCanonicalLink(html, canonical);
}
