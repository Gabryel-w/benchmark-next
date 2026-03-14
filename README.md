<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Prisma-5-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</p>

# DevBlog — Next.js 14

Portal de noticias e artigos construido com **Next.js 14 (App Router)**, parte de um trabalho de conclusao de curso (TCC) que compara o desempenho entre **Next.js** e **Nuxt** em aplicacoes web equivalentes.

> Este repositorio contem a implementacao Next.js. A versao Nuxt esta disponivel em [`benchmark-nuxt`](../benchmark-nuxt/).

---

## Visao Geral

O DevBlog e uma aplicacao full-stack de blog que consome noticias em tempo real via **RSS feeds** de portais brasileiros (G1, GE) e permite gerenciamento de conteudo proprio atraves de um painel administrativo protegido por autenticacao JWT.

### Principais Funcionalidades

- **Feed de noticias em tempo real** — Consome RSS de 8 categorias (Tecnologia, Economia, Saude, Ciencia, Esportes, Cultura, Politica, Meio Ambiente)
- **Cache inteligente** — Cache em memoria com TTL de 5 minutos para os feeds RSS
- **Merge RSS + Banco** — Posts do banco de dados tem prioridade sobre posts RSS com mesmo slug
- **Sistema de comentarios** — 500 comentarios pre-gerados distribuidos deterministicamente (50 por post) usando algoritmo baseado em hash
- **Painel administrativo** — CRUD completo de artigos com autenticacao JWT
- **Busca e filtragem** — Pesquisa por titulo/autor/conteudo e filtro por categoria
- **Paginacao numerada** — Navegacao por paginas com indicadores de pagina atual
- **SEO otimizado** — Meta tags dinamicas com Open Graph para cada artigo
- **Design responsivo** — Interface profissional com Tailwind CSS

---

## Tech Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 14 (App Router) |
| Linguagem | TypeScript 5 |
| UI | React 18 + Tailwind CSS 3 |
| Banco de Dados | PostgreSQL + Prisma ORM 5 |
| Autenticacao | JWT (jsonwebtoken) + bcryptjs |
| RSS | rss-parser |
| Markdown | marked |
| Fonte | Inter (next/font) |

---

## Inicio Rapido

### Pre-requisitos

- Node.js 18+
- PostgreSQL em execucao
- npm

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variaveis de ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/devblog_next"
JWT_SECRET="sua-chave-secreta"
```

### 3. Configurar banco de dados

```bash
npx prisma migrate dev --name init
npm run seed
```

A seed cria:
- 1 usuario administrador (`admin@devblog.com` / `admin123`)
- 1 post oculto (pool de comentarios)
- 500 comentarios distribuidos entre 40 autores ficticios

### 4. Iniciar servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

---

## Estrutura do Projeto

```
benchmark-next/
├── app/
│   ├── layout.tsx                  # Layout raiz (Header + Footer)
│   ├── page.tsx                    # Home — listagem de posts (SSG + ISR)
│   ├── globals.css                 # Estilos globais + Tailwind
│   ├── posts/
│   │   └── [slug]/page.tsx         # Pagina do artigo (SSG + ISR)
│   ├── admin/
│   │   ├── login/page.tsx          # Login administrativo (SSR)
│   │   └── posts/
│   │       ├── page.tsx            # Listagem admin (SSR)
│   │       ├── new/page.tsx        # Criar artigo (SSR)
│   │       └── [id]/edit/page.tsx  # Editar artigo (SSR)
│   └── api/
│       ├── posts/route.ts          # GET (lista) + POST (criar)
│       ├── posts/[slug]/route.ts   # GET + PUT + DELETE
│       ├── posts/[slug]/comments/  # GET comentarios
│       └── auth/                   # Login + Logout + Me
├── components/
│   ├── PostCard.tsx                # Card de preview com imagem
│   ├── PostList.tsx                # Grid de cards
│   ├── PostContent.tsx             # Renderizador de conteudo
│   ├── CommentList.tsx             # Lista de comentarios
│   ├── CommentItem.tsx             # Item de comentario
│   ├── Header.tsx                  # Cabecalho com glass effect
│   ├── Footer.tsx                  # Rodape
│   ├── Pagination.tsx              # Paginacao numerada
│   ├── SearchBar.tsx               # Barra de busca + filtro
│   ├── BackButton.tsx              # Botao voltar (history.back)
│   ├── AdminPostForm.tsx           # Formulario de artigo
│   ├── AdminPostsList.tsx          # Tabela admin de artigos
│   └── LoginForm.tsx               # Formulario de login
├── lib/
│   ├── rss.ts                      # Parser RSS + cache + merge
│   ├── prisma.ts                   # Cliente Prisma
│   ├── auth.ts                     # Utilitarios JWT
│   └── markdown.ts                 # Parser Markdown/HTML
├── prisma/
│   ├── schema.prisma               # Schema do banco
│   └── seed.ts                     # Seed de dados
├── types/
│   └── index.ts                    # Interfaces TypeScript
├── middleware.ts                    # Protecao de rotas admin
├── tailwind.config.ts              # Configuracao Tailwind
└── next.config.js                  # Configuracao Next.js
```

---

## Estrategias de Renderizacao

| Pagina | Rota | Estrategia | Detalhes |
|--------|------|-----------|----------|
| Home | `/` | SSG + ISR | Revalida a cada 60s |
| Artigo | `/posts/[slug]` | SSG + ISR | Revalida a cada 60s |
| Comentarios | `/posts/[slug]#comments` | CSR | Fetch client-side |
| Admin — Login | `/admin/login` | SSR | Sem cache |
| Admin — Listagem | `/admin/posts` | SSR | `revalidate = 0` |
| Admin — Criar | `/admin/posts/new` | SSR | Protegido por middleware |
| Admin — Editar | `/admin/posts/[id]/edit` | SSR | Protegido por middleware |

---

## Rotas de API

| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| `GET` | `/api/posts` | Lista posts (RSS + DB) paginados | Nao |
| `GET` | `/api/posts/:slug` | Post individual | Nao |
| `GET` | `/api/posts/:slug/comments` | 50 comentarios deterministicos | Nao |
| `POST` | `/api/posts` | Criar artigo | Sim |
| `PUT` | `/api/posts/:slug` | Atualizar artigo | Sim |
| `DELETE` | `/api/posts/:slug` | Excluir artigo | Sim |
| `POST` | `/api/auth/login` | Login admin | Nao |
| `GET` | `/api/auth/me` | Verificar sessao | Sim |
| `POST` | `/api/auth/logout` | Encerrar sessao | Nao |

---

## Sistema de Comentarios

Os comentarios utilizam um sistema de **pool deterministico**:

1. A seed cria 500 comentarios vinculados a um post oculto (`__comment-pool__`)
2. Ao acessar qualquer post, o sistema seleciona 50 comentarios unicos baseado em um hash do slug
3. O algoritmo `(hash + i * 7 + i * i) % total` garante que o mesmo post sempre exibe os mesmos comentarios
4. O post pool e filtrado das listagens publicas e do painel admin

---

## RSS Feeds

| Categoria | Fonte |
|-----------|-------|
| Tecnologia | G1 Tecnologia |
| Economia | G1 Economia |
| Saude | G1 Saude |
| Ciencia | G1 Ciencia e Saude |
| Esportes | GE (Globo Esporte) |
| Cultura | G1 Pop & Arte |
| Politica | G1 Politica |
| Meio Ambiente | G1 Natureza |

---

## Design System

- **Cor principal**: Indigo 600 (`#4F46E5`)
- **Header**: Glass effect (`bg-white/80 backdrop-blur-md`)
- **Cards**: `rounded-2xl` com imagem de capa e gradiente fallback
- **Footer**: `bg-gray-950` com acentos indigo
- **Fonte**: Inter (Google Fonts via next/font)
- **Responsivo**: Mobile-first com breakpoints `md:` e `lg:`

---

## Build de Producao

```bash
npm run build
npm run start
```

---

## Contexto do Projeto

Este repositorio faz parte de um **Trabalho de Conclusao de Curso (TCC)** que realiza uma analise comparativa de desempenho entre Next.js 14 e Nuxt 3. Ambas as aplicacoes sao **funcionalmente e visualmente equivalentes**, permitindo uma comparacao justa de metricas como:

- Tempo de carregamento inicial (FCP, LCP)
- Time to Interactive (TTI)
- Tamanho do bundle
- Tempo de build
- Performance em Core Web Vitals

O contrato de equivalencia entre os dois repositorios esta documentado em [`equivalencia.md`](./equivalencia.md).

---

## Licenca

MIT
