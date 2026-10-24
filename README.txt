CG OFICIAL — PACOTE COMPLETO PARA GITHUB PAGES

URL pública esperada: https://gabrielcg98.github.io/Cg-oficial/
O GitHub Pages usa HTTPS no domínio padrão github.io; não é necessário registrar um domínio próprio. Nenhum CNAME ou domínio não registrado está incluído.

PUBLICAÇÃO
O repositório está preparado para publicar pela origem “GitHub Actions”. O workflow em .github/workflows/deploy-pages.yml executa testes, checagem TypeScript, build estático e deploy. O artifact publicado contém index.html e 404.html na raiz do site.

1. Envie os arquivos do pacote para a branch main do repositório gabrielcg98/Cg-oficial.
2. Em Settings > Pages, mantenha “GitHub Actions” como fonte de publicação.
3. Abra Actions e aguarde “Publicar CG Oficial no GitHub Pages” terminar com sucesso. Novos pushes em main publicam automaticamente; também é possível iniciar o workflow manualmente.
4. Acesse https://gabrielcg98.github.io/Cg-oficial/ e use HTTPS. Não configure cg-oficial.gg até registrar e configurar um domínio próprio.

ARQUIVO INDEX.HTML
O pacote inclui index.html e 404.html pré-renderizados na raiz do repositório, junto com as pastas de imagens e bundles de produção. O gerador preserva a pasta de origem assets/ e coloca os bundles compilados em site-assets/. O workflow também gera um artifact limpo a partir de dist/public, com index.html na raiz do conteúdo publicado.

ATUALIZAÇÕES FUTURAS
Requisitos: Node.js 22 e pnpm 10.18.0.

1. Instale: pnpm install --frozen-lockfile
2. Personalize textos, redes, links, projetos, cores e metadados em client/src/config/siteConfig.ts; imagens ficam em client/public/images.
3. Gere e sincronize a versão pronta para o GitHub: pnpm build:github-pages
4. Revise e envie as mudanças e os arquivos gerados para main. O workflow verifica testes, TypeScript e build antes de publicar.

O comando pnpm build:github-pages usa /Cg-oficial/ por padrão, chama o build estático e copia a saída para a raiz. VITE_BASE_PATH pode ser definido para outra base; o workflow obtém o caminho correto automaticamente pelo GitHub Pages. O gerador recusa substituir arquivos existentes que não estejam no seu manifesto .github-pages-generated.json.

COMANDOS DE VERIFICAÇÃO
pnpm test
pnpm check
pnpm build:github-pages

LIMITES E INTEGRAÇÕES
GitHub Pages hospeda apenas o site estático; não executa servidor, banco de dados, autenticação nem APIs. O site não declara uma live ativa nem simula envio de formulário. O formulário próprio depende de um destinatário e serviço de envio configurados; use os canais sociais existentes até essa configuração. Nenhuma chave ou credencial secreta está incluída. O link de GitHub Sponsors é exatamente o informado no roteiro.

CONTEÚDO DO ZIP
Inclui o código-fonte completo necessário, lockfile, workflow de publicação, imagens, index.html e saída estática pronta na raiz. Não inclui histórico Git, node_modules, dist, Markdown, PDF ou documentos Word.
