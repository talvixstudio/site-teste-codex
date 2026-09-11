# Sorria — site conceitual de odontologia

Site responsivo em React, TypeScript e Vinext. Inclui hero, seis tratamentos com detalhes, diferenciais, comparador ilustrativo antes/depois, carrossel de depoimentos, equipe, FAQ, mapa e chamadas para agendamento.

## Desenvolvimento

- `npm install`
- `npm run dev`
- `npm run build`

## Configuração da clínica

Preencha `lib/clinic.ts`: WhatsApp (DDI, DDD e número, somente dígitos), endereço completo e horário. Os botões abrem uma conversa com mensagem contextual quando o número está configurado. Sem contato oficial, exibem uma mensagem transparente e não direcionam para números fictícios.

Antes de usar comercialmente, substitua marca, profissionais, depoimentos e imagens ilustrativas pelos dados reais e autorizados. Ajuste título, descrição e robots em `app/layout.tsx`. O projeto demonstrativo está marcado como noindex.

## Imagens

- Hero: criada com ImageGen para este projeto; personagem fictícia.
- Clínica: Pavel Danilyuk / Pexels — https://www.pexels.com/photo/a-dental-equipment-in-the-clinic-6812453/
- Profissional feminina: Tima Miroshnichenko / Pexels — https://www.pexels.com/photo/female-dentist-in-white-uniform-5355860/
- Profissional masculino: Filip Rankovic Grobgaard / Unsplash — https://unsplash.com/photos/a-man-smiling-for-the-camera-9_1Y_IKP4tY
- Comparação: imagem gerada por IA / StockCake, CC0 — https://stockcake.com/i/smile-transformation-comparison_560267_1038760
- Licenças: https://www.pexels.com/license/ — https://unsplash.com/license — https://stockcake.com/info/license

As pessoas retratadas não possuem vínculo com a marca conceitual. A comparação não é um caso clínico nem promessa de resultado. Depoimentos são fictícios e estão identificados no site.

Imagens locais em WebP; carregamento tardio fora da hero; suporte a movimento reduzido, navegação por teclado e componentes acessíveis para diálogos, FAQ e comparação.
