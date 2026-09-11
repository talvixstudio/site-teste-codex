# Publicar na Vercel

Este projeto foi ajustado para Vinext + Nitro com preset da Vercel.

## Pelo painel da Vercel
1. Crie um repositório no GitHub com o conteúdo desta pasta.
2. Na Vercel, clique em **Add New > Project**.
3. Importe o repositório.
4. Em **Framework Preset**, use **Other** se a Vercel não detectar automaticamente.
5. Build Command: `npm run build`.
6. Não informe Output Directory manualmente; o Nitro gera o formato de saída da Vercel.
7. Clique em **Deploy**.

Ao finalizar, a Vercel criará um endereço `nomedoprojeto.vercel.app`.

## Observações
- O site não depende de variáveis de ambiente no estado atual.
- O WhatsApp/endereço/horários ficam em `lib/clinic.ts`.
- O projeto continua marcado como `noindex` em `app/layout.tsx`, apropriado para demo. Remova isso antes de publicar como site oficial de um cliente.
