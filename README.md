# Clinicboard Frontend

Este é o frontend do **Clinicboard**, um sistema de gestão para consultórios e profissionais da saúde, desenvolvido com [Next.js](https://nextjs.org), React, TypeScript e Tailwind CSS.

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Deploy](#deploy)
- [Contribuição](#contribuição)
- [Documentação](#documentação)

## Sobre o Projeto

O Clinicboard centraliza o atendimento de pacientes, agendamento de consultas e gestão de profissionais em um só lugar, com interface moderna e responsiva.

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org) (App Router)
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4+](https://tailwindcss.com)
- [React Query](https://tanstack.com/query/latest)
- [shadcn/ui](https://ui.shadcn.com) (componentes UI)
- [Zod](https://zod.dev) (validação)
- [Axios](https://axios-http.com)
- [React Hook Form](https://react-hook-form.com)
- [React Toastify](https://fkhadra.github.io/react-toastify/)

## Estrutura do Projeto

```
src/
  app/                # Páginas, rotas e lógica principal
    (pages)/          # Rotas do dashboard, login, registro, etc.
    components/       # Componentes específicos do app
    hooks/            # Custom hooks
    lib/              # Funções utilitárias
    constants/        # Constantes compartilhadas
    service/          # Serviços de API
    types/            # Tipos TypeScript globais
    context/          # Contextos React
    public/           # Arquivos estáticos
  components/         # Componentes UI reutilizáveis (shadcn/ui)
  ...
```

## Como Rodar Localmente

1. Instale as dependências usando [npm](https://www.npmjs.com/):

   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:

   ```bash
   npm dev
   ```

3. Acesse [http://localhost:3002](http://localhost:3002) no navegador.

## Scripts Disponíveis

- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — gera o build de produção
- `npm run start` — inicia o servidor em produção
- `npm run lint` — executa o linter

## Deploy

O deploy pode ser feito facilmente na [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Veja a [documentação de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.

## Contribuição

Contribuições são bem-vindas! Veja as diretrizes em [`docs/contributing.md`](docs/contributing.md).

## Documentação

Toda documentação principal está disponível na pasta [`docs`](docs).

---

Projeto desenvolvido por Daniel Silva.