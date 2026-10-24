import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);
const outputRoot = path.join(projectRoot, "dist", "public");
const manifestPath = path.join(projectRoot, ".github-pages-generated.json");
const requestedBase = process.env.VITE_BASE_PATH;
const baseCandidate =
  requestedBase === undefined ? "/Cg-oficial/" : requestedBase.trim() || "/";

function normalizeBasePath(value) {
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  const segments = withLeadingSlash.split("/");
  if (
    withLeadingSlash.startsWith("//") ||
    /[?#\\\s]/.test(withLeadingSlash) ||
    segments.includes("..") ||
    segments.includes(".")
  ) {
    throw new Error(
      "VITE_BASE_PATH deve ser um caminho local, como /Cg-oficial/ ou /."
    );
  }
  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
}

const basePath = normalizeBasePath(baseCandidate);
const pnpmCommand = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const build = spawnSync(pnpmCommand, ["build:static"], {
  cwd: projectRoot,
  env: { ...process.env, VITE_BASE_PATH: basePath },
  shell: process.platform === "win32",
  stdio: "inherit",
});

if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);

const builtIndex = path.join(outputRoot, "index.html");
if (!existsSync(builtIndex)) {
  throw new Error("O build terminou sem gerar dist/public/index.html.");
}
copyFileSync(builtIndex, path.join(outputRoot, "404.html"));
const noJekyll = path.join(outputRoot, ".nojekyll");
if (!existsSync(noJekyll)) writeFileSync(noJekyll, "", "utf8");

function collectFiles(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) {
      throw new Error(
        `O build contém um link simbólico não permitido: ${absolutePath}`
      );
    }
    if (entry.isDirectory()) {
      files.push(...collectFiles(absolutePath));
      continue;
    }
    if (!entry.isFile())
      throw new Error(
        `Tipo de arquivo não suportado no build: ${absolutePath}`
      );
    const relativePath = path
      .relative(outputRoot, absolutePath)
      .split(path.sep)
      .join("/");
    if (
      !relativePath ||
      relativePath.startsWith("../") ||
      path.isAbsolute(relativePath)
    ) {
      throw new Error(
        `Caminho de saída fora do diretório do site: ${relativePath}`
      );
    }
    files.push(relativePath);
  }
  return files;
}

let previouslyGenerated = [];
if (existsSync(manifestPath)) {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  if (
    manifest.version !== 1 ||
    !Array.isArray(manifest.files) ||
    manifest.files.some(file => typeof file !== "string")
  ) {
    throw new Error(
      ".github-pages-generated.json inválido; não foi alterado nenhum arquivo da raiz."
    );
  }
  previouslyGenerated = manifest.files;
}

const builtFiles = collectFiles(outputRoot).sort();
const previouslyManaged = new Set(previouslyGenerated);

for (const relativePath of builtFiles) {
  const destination = path.resolve(projectRoot, ...relativePath.split("/"));
  if (!destination.startsWith(`${projectRoot}${path.sep}`)) {
    throw new Error(`Caminho de destino fora do repositório: ${relativePath}`);
  }

  const parentParts = relativePath.split("/").slice(0, -1);
  let parent = projectRoot;
  for (const part of parentParts) {
    parent = path.join(parent, part);
    if (existsSync(parent) && lstatSync(parent).isSymbolicLink()) {
      throw new Error(
        `Recusado atravessar link simbólico existente: ${parent}`
      );
    }
    if (existsSync(parent) && !lstatSync(parent).isDirectory()) {
      throw new Error(`Colisão: ${parent} existe e não é uma pasta.`);
    }
    mkdirSync(parent, { recursive: true });
  }

  if (existsSync(destination)) {
    const destinationStat = lstatSync(destination);
    if (destinationStat.isSymbolicLink() || !destinationStat.isFile()) {
      throw new Error(
        `Colisão com arquivo/pasta existente não substituível: ${relativePath}`
      );
    }
    if (!previouslyManaged.has(relativePath)) {
      throw new Error(
        `Colisão: ${relativePath} já existe e não consta no manifesto gerado. Faça backup/renomeie antes de exportar.`
      );
    }
  }

  copyFileSync(path.join(outputRoot, ...relativePath.split("/")), destination);
}

const manifest = {
  version: 1,
  basePath,
  files: [...new Set([...previouslyGenerated, ...builtFiles])].sort(),
};
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

console.log(
  `Index de produção e ${builtFiles.length - 1} arquivos estáticos copiados para a raiz.`
);
console.log(`Base do GitHub Pages: ${basePath}`);
console.log(
  "A pasta assets/ de origem foi preservada; bundles de produção ficam em site-assets/."
);
