import { describe, expect, it } from "vitest";
import { injectPrerenderedContent } from "../client/src/lib/prerenderHtml";

describe("injectPrerenderedContent", () => {
  it("places the rendered public page inside the root and preserves the entry script", () => {
    const template = '<!doctype html><html lang="pt-BR"><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>';
    const output = injectPrerenderedContent(template, '<main><h1>Olá, eu sou o CG.</h1></main>');

    expect(output).toContain('<div id="root"><main><h1>Olá, eu sou o CG.</h1></main></div>');
    expect(output).toContain('<script type="module" src="/src/main.tsx"></script>');
  });

  it("fails clearly when the Vite template has no application root", () => {
    expect(() => injectPrerenderedContent("<html><body></body></html>", "<main />"))
      .toThrow(/application root/i);
  });
});
