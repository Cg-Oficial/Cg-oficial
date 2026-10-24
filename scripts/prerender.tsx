import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";
import { injectPrerenderedContent, injectSiteSeoMetadata } from "../client/src/lib/prerenderHtml";

const projectRoot = process.cwd();
const outputFile = path.join(projectRoot, "dist/public/index.html");
const vite = await createServer({
  configFile: path.join(projectRoot, "vite.config.ts"),
  mode: "production",
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { default: App } = await vite.ssrLoadModule("/src/App.tsx");
  const { siteConfig } = await vite.ssrLoadModule("/src/config/siteConfig.ts");
  const { createStaticRouteElement } = await vite.ssrLoadModule("/src/lib/prerenderRouter.tsx");
  const markup = renderToString(createStaticRouteElement(App));
  const template = await readFile(outputFile, "utf8");
  const page = injectPrerenderedContent(template, markup);
  const pageWithMetadata = injectSiteSeoMetadata(
    page,
    siteConfig.seo,
    siteConfig.person.brandName,
    siteConfig.hero.imageAlt,
  );
  await writeFile(outputFile, pageWithMetadata, "utf8");
  console.log(`Pré-renderizada a página inicial: ${markup.length.toLocaleString("pt-BR")} caracteres.`);
} finally {
  await vite.close();
}
