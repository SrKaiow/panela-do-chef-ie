# Panela do Chef — Site Institucional (Irlanda)

Site institucional com página única (uma rolagem, com âncoras): Início,
Sobre, Cardápio (destaques), Galeria, Depoimentos e Contato.

## ⚠️ Antes de publicar — o que revisar

1. **Preços em euro (€)** — as artes do cardápio na Galeria são as
   mesmas da unidade de Londres, com preços em **£ (libra)**. Não
   inventei preços em euro para a Irlanda — os cards de "Destaques"
   estão como "€ a definir" de propósito. Assim que tiver os preços da
   unidade irlandesa, atualize direto no `public/index.html` (procure
   por `€ a definir`).
2. **Depoimentos** — os 3 cards em "Depoimentos" são só um exemplo de
   layout, marcados como "depoimento de exemplo". Troque pelo
   depoimento real de um cliente assim que tiver (e apague a tag de
   exemplo).
3. **Endereço, telefone e certificações** — coloquei "a definir" onde
   não tinha a informação da unidade da Irlanda. As certificações que
   aparecem em "Sobre" (Food Hygiene Rating, Level 3, HACCP, Allergen
   Management) são as do Reino Unido (FSA) — a Irlanda tem seu próprio
   órgão (FSAI, Food Safety Authority of Ireland), então vale
   confirmar/atualizar esse selo quando a unidade tiver a certificação
   irlandesa.

## Estrutura

```
panela-chef-ie/
├── server.js              # Servidor Express (site + formulário de contato)
├── data/
│   └── mensagens.json     # Mensagens recebidas pelo formulário de contato
├── public/
│   ├── index.html
│   ├── css/style.css
│   ├── js/main.js
│   └── images/            # Fotos e artes reais que você enviou
└── discloud.config
```

## Rodando localmente

Requer [Node.js](https://nodejs.org) 18+.

```bash
npm install
npm start
```

Acesse `http://localhost:8080`.

## Formulário de contato

Hoje, toda mensagem enviada pelo formulário é salva em
`data/mensagens.json` — não é mandado e-mail nenhum ainda. Pra receber
por e-mail, a forma mais simples é usar um serviço como
[Resend](https://resend.com) (tem plano grátis) ou
[Nodemailer](https://nodemailer.com) com uma conta de e-mail sua, e
plugar dentro da rota `/api/contato` em `server.js`. Se quiser, eu
implemento isso depois — só pedir.

## Hospedando na Discloud (TYPE=site)

Hospedar **site** na Discloud é diferente de hospedar **bot** — preste
atenção nesses pontos:

1. **Exige plano Platinum ou superior** (o plano grátis não hospeda
   site, só bot).
2. Você precisa **registrar um subdomínio** no painel da Discloud
   (ex: `panela-do-chef-ie` vira `panela-do-chef-ie.discloud.app`). O
   `discloud.config` já está com `ID=panela-do-chef-ie` — troque se
   quiser outro nome, mas o subdomínio ainda precisa ser registrado no
   painel antes de subir.
3. A aplicação **tem que ouvir na porta 8080 e host 0.0.0.0** — o
   `server.js` já está configurado assim, não precisa mexer.
4. Suba o projeto (com o `.env`, se for usar, e sem o `node_modules`)
   do mesmo jeito que você já faz upload dos bots.

Se quiser usar um domínio próprio (ex: `paneladochef.ie`) em vez do
subdomínio `.discloud.app`, isso também é possível configurar depois,
apontando o DNS do seu domínio pra Discloud — me avisa se for esse o
plano que eu detalho o passo a passo.

## Personalizando

- **Textos**: direto no `public/index.html`.
- **Cores**: no topo do `public/css/style.css`, nas variáveis dentro
  de `:root` (`--accent`, `--bg`, etc.).
- **Fotos**: substitua os arquivos em `public/images/` (mantendo os
  mesmos nomes, ou trocando o `src=` no HTML se usar nomes diferentes).
