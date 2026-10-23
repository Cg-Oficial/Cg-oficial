CG OFICIAL — PACOTE PARA GITHUB PAGES

Este pacote contém o código-fonte do site, as imagens locais e uma automação do GitHub Actions para publicar o site no GitHub Pages. O workflow calcula automaticamente o caminho correto para um repositório de projeto ou para um site de usuário (NOME.github.io).

PUBLICAÇÃO
1. Crie um repositório no GitHub e envie todos os arquivos deste pacote para a branch main.
2. No repositório, abra Settings > Pages e escolha “GitHub Actions” como origem de publicação.
3. Aguarde a execução de “Publicar CG Oficial no GitHub Pages” na aba Actions. Nas próximas alterações na branch main, a publicação será atualizada automaticamente.
Se usar um domínio próprio, configure o domínio nas definições do Pages e ajuste VITE_BASE_PATH para / no passo “Definir base URL do site” do workflow.

EXECUÇÃO LOCAL
Requisitos: Node.js 22 e pnpm 10.18.0.

1. Ative o Corepack: corepack enable
2. Ative o pnpm: corepack prepare pnpm@10.18.0 --activate
3. Instale: pnpm install --frozen-lockfile
4. Execute o site localmente: pnpm dev:static
5. Gere uma versão de produção: pnpm build:static
O resultado estático fica em dist/public.

VERIFICAÇÃO
pnpm test
pnpm check
pnpm build:static

PERSONALIZAÇÃO
• Textos, redes sociais, links, projetos, cores e metadados: client/src/config/siteConfig.ts
• Imagens usadas no site: client/public/images
• Ícones e favicon: client/public
• Prefixo automático do GitHub Pages: workflow em .github/workflows/deploy-pages.yml

LIMITES E INTEGRAÇÕES
O GitHub Pages publica uma versão estática e não executa backend, banco de dados, autenticação ou APIs. O site não afirma que o canal está ao vivo e não simula envio de formulário. O formulário/contato próprio depende de serviço e destinatário que ainda não foram configurados; use os canais públicos existentes até configurar esse envio. Não há chaves ou credenciais de API incluídas neste pacote. O link do GitHub Sponsors é exatamente o fornecido no roteiro original.

ARQUIVOS DO PACOTE
Por solicitação, este ZIP não inclui arquivos Markdown, PDF ou Word, nem histórico Git, dependências instaladas ou build gerado. O arquivo pnpm-lock.yaml fixa as dependências para uma instalação reproduzível.
