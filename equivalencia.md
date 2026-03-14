# Contrato de Equivalência — Next.js 14 vs Nuxt 3

> Este arquivo é a **fonte única de verdade** para garantir que ambas as aplicações
> sejam funcionalmente, visualmente e estruturalmente equivalentes.
> **Nenhuma feature deve ser implementada em um framework sem estar documentada aqui primeiro.**

---

## 1. Arquitetura e Estratégia de Renderização

| Página | Rota | Estratégia | Next.js 14 | Nuxt 3 |
|--------|------|-----------|------------|--------|
| Home (listagem) | `/` | SSG + ISR | Server Component + `revalidate: 60` | `prerender: true` via routeRules |
| Post individual | `/posts/[slug]` | SSG + ISR | Server Component + `revalidate: 60` | `swr: 60` via routeRules |
| Comentários | `/posts/[slug]#comments` | CSR | `useEffect` + `fetch` | `useFetch` client-side |
| Admin — login | `/admin/login` | SSR | Client Component | `useFetch` + formulário reativo |
| Admin — listagem | `/admin/posts` | SSR | Server Component + `revalidate: 0` | `useFetch` reativo |
| Admin — criar | `/admin/posts/new` | SSR | Server Component + Client Form | `AdminPostForm` componente |
| Admin — editar | `/admin/posts/[id]/edit` | SSR | Server Component + Client Form | `useFetch` + `AdminPostForm` |

---

## 2. Schema de Dados (Compartilhado)

> ⚠️ Ambas as apps usam o **mesmo `schema.prisma`** e seeds idênticos.

```prisma
model Post {
  id           Int       @id @default(autoincrement())
  title        String    @db.VarChar(100)
  slug         String    @unique
  content      String
  excerpt      String    @db.VarChar(200)
  published_at DateTime  @default(now())
  updated_at   DateTime  @updatedAt
  author       String
  category     String    @default("Geral")
  comments     Comment[]
}

model Comment {
  id          Int      @id @default(autoincrement())
  post_id     Int
  author_name String
  content     String   @db.VarChar(500)
  created_at  DateTime @default(now())
  post        Post     @relation(fields: [post_id], references: [id], onDelete: Cascade)
}

model AdminUser {
  id            Int    @id @default(autoincrement())
  email         String @unique
  password_hash String
}
```

### Interfaces TypeScript (idênticas em `types/index.ts`)

```typescript
interface Post {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  published_at: Date | string
  updated_at: Date | string
  author: string
  category: string
  source?: 'rss' | 'db'
  link?: string
  image?: string
}

interface Comment {
  id: number
  post_id: number
  author_name: string
  content: string
  created_at: Date | string
}
```

### Seed

- **1 admin**: `admin@devblog.com` / `admin123`
- **1 post oculto**: slug `__comment-pool__` (vincula os comentários via FK)
- **500 comentários**: 40 autores fictícios, 50 textos variados
- **0 posts visíveis**: o conteúdo público vem dos RSS feeds

---

## 3. Rotas de API (Contrato de Interface)

Ambas as apps expõem as mesmas rotas com os mesmos payloads:

| Método | Rota | Descrição | Response | Auth |
|--------|------|-----------|----------|------|
| `GET` | `/api/posts` | Lista posts (RSS + DB) paginados | `{ posts: Post[], total: number }` | Não |
| `GET` | `/api/posts/:slug` | Post individual (DB → RSS fallback) | `{ post: Post }` | Não |
| `GET` | `/api/posts/:slug/comments` | 50 comentários determinísticos | `{ comments: Comment[] }` | Não |
| `POST` | `/api/posts` | Criar post | `{ post: Post }` | Sim |
| `PUT` | `/api/posts/:slug` | Atualizar post | `{ post: Post }` | Sim |
| `DELETE` | `/api/posts/:slug` | Excluir post | `{ success: boolean }` | Sim |
| `POST` | `/api/auth/login` | Login admin | `{ token: string }` | Não |
| `GET` | `/api/auth/me` | Verificar sessão | `{ user: AdminUser }` | Sim |
| `POST` | `/api/auth/logout` | Encerrar sessão | `{ success: boolean }` | Não |

### Admin-only (Nuxt)

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/admin/posts` | Lista posts apenas do banco (sem RSS) |

> No Next.js, a listagem admin consulta o Prisma diretamente no Server Component (sem rota API separada).

---

## 4. Estrutura de Diretórios Equivalente

```
benchmark-next/                        benchmark-nuxt/
├── app/                               ├── pages/
│   ├── layout.tsx                     │   ├── index.vue
│   ├── page.tsx                       │   ├── posts/
│   ├── globals.css                    │   │   └── [slug].vue
│   ├── posts/                         │   └── admin/
│   │   └── [slug]/page.tsx            │       ├── login.vue
│   ├── admin/                         │       └── posts/
│   │   ├── login/page.tsx             │           ├── index.vue
│   │   └── posts/                     │           ├── new.vue
│   │       ├── page.tsx               │           └── [id]/edit.vue
│   │       ├── new/page.tsx           ├── layouts/
│   │       └── [id]/edit/page.tsx     │   └── default.vue
│   └── api/                           ├── server/
│       ├── posts/route.ts             │   ├── api/
│       ├── posts/[slug]/route.ts      │   │   ├── posts/
│       ├── posts/[slug]/comments/     │   │   ├── admin/posts/
│       └── auth/                      │   │   └── auth/
├── components/                        │   └── utils/
├── lib/                               ├── components/
├── prisma/                            ├── lib/
├── types/                             ├── prisma/
├── middleware.ts                       ├── types/
├── tailwind.config.ts                 ├── middleware/
└── next.config.js                     ├── assets/css/main.css
                                       ├── tailwind.config.ts
                                       └── nuxt.config.ts
```

---

## 5. Componentes UI (Paridade Visual)

Todos os componentes usam **classes Tailwind idênticas** para garantir visual pixel-perfect equivalente.

### 5.1 Componentes Compartilhados

| Componente | Next.js (`.tsx`) | Nuxt (`.vue`) | Props | Status |
|-----------|-----------------|--------------|-------|--------|
| `PostCard` | Card com imagem, categoria, excerpt | Idêntico | `post: Post, featured?: boolean` | ✅ |
| `PostList` | Grid responsivo 1/2/3 colunas | Idêntico | `posts: Post[], featured?: boolean` | ✅ |
| `PostContent` | Renderiza HTML/Markdown com prose | Idêntico | `content: string` | ✅ |
| `CommentList` | Lista com loading/error/empty states | Idêntico | `postSlug: string` | ✅ |
| `CommentItem` | Avatar colorido + data formatada | Idêntico | `comment: Comment` | ✅ |
| `Header` | Glass effect + dropdown admin + mobile menu | Idêntico | — | ✅ |
| `Footer` | bg-gray-950 + links + social icons | Idêntico | — | ✅ |
| `Pagination` | Numerada com ellipsis + total count | Idêntico | `current, total, totalCount` | ✅ |
| `SearchBar` | Input + category select + botão | Idêntico | — | ✅ |
| `AdminPostForm` | 6 campos + auto-slug + word count | Idêntico | `initialPost?: Post` | ✅ |
| `AdminPostsList` | Tabela + delete modal + paginação | Idêntico | `posts, currentPage, totalPages` | ✅ |
| `BackButton` | `router.back()` com ícone seta | Componente (Next) / Inline (Nuxt) | — | ✅ |

### 5.2 Design System

| Elemento | Valor |
|----------|-------|
| Cor principal | Indigo 600 (`#4F46E5`) |
| Header | `bg-white/80 backdrop-blur-md sticky top-0 z-50` |
| Cards | `rounded-2xl border border-gray-200/60` com imagem + gradiente fallback |
| Footer | `bg-gray-950 text-gray-300` |
| Fonte | Inter (sans-serif) |
| Badges de categoria | 8 cores: blue, emerald, rose, violet, amber, pink, sky, teal |
| Avatar | 6 cores hash-based: blue, purple, pink, orange, green, red |

### 5.3 CSS Global (idêntico — `globals.css` / `main.css`)

- Tailwind base/components/utilities
- Scroll behavior smooth
- Prose styling customizado (h1-h4, p, ul/ol, blockquote, code/pre)
- Scrollbar webkit customizado
- Line-clamp utilities

### 5.4 Tailwind Config (equivalente)

```typescript
// Ambos usam:
// - Plugin: @tailwindcss/typography
// - Font: Inter, sans-serif
// - Content paths adaptados ao framework
```

---

## 6. RSS Feeds (Fonte de Dados)

Ambas as apps consomem os mesmos 8 feeds RSS com cache em memória (TTL: 5 min):

| Categoria | Feed URL |
|-----------|----------|
| Tecnologia | `g1.globo.com/rss/g1/tecnologia/` |
| Economia | `g1.globo.com/rss/g1/economia/` |
| Saúde | `g1.globo.com/rss/g1/saude/` |
| Ciência | `g1.globo.com/rss/g1/ciencia-e-saude/` |
| Esportes | `ge.globo.com/rss/ge/` |
| Cultura | `g1.globo.com/rss/g1/pop-arte/` |
| Política | `g1.globo.com/rss/g1/politica/` |
| Meio Ambiente | `g1.globo.com/rss/g1/natureza/` |

### Lógica de merge (idêntica — `rss.ts`)

1. Busca todos os feeds via `Promise.allSettled`
2. Extrai título, slug, conteúdo formatado, excerpt, imagem (enclosure/media:content)
3. Remove duplicatas por slug
4. Ordena por data de publicação
5. No merge com DB: posts do banco têm prioridade, pool post é filtrado
6. Aplica filtros de busca/categoria e paginação

---

## 7. Sistema de Comentários (Pool Determinístico)

Lógica idêntica em ambas as apps:

1. **Seed**: Cria 500 comentários vinculados ao post `__comment-pool__`
2. **Hash**: `hashCode(slug)` gera um inteiro determinístico a partir do slug do post
3. **Seleção**: `(hash + i * 7 + i * i) % total` seleciona 50 comentários únicos
4. **Ordenação**: Por `created_at` descendente
5. **Resultado**: O mesmo post sempre exibe os mesmos 50 comentários

---

## 8. Otimizações Implementadas

| Otimização | Next.js 14 | Nuxt 3 | Status |
|-----------|------------|--------|--------|
| Code splitting por rota | Automático (App Router) | Automático (pages/) | ✅ |
| Prefetch de links | `<Link>` (automático) | `<NuxtLink>` (automático) | ✅ |
| Meta tags SEO | `generateMetadata()` | `useHead()` | ✅ |
| Font optimization | `next/font` (Inter) | Google Fonts link (Inter) | ✅ |
| ISR para posts | `revalidate: 60` | `swr: 60` routeRules | ✅ |
| Imagens RSS | `<img>` nativo | `<img>` nativo | ✅ |
| Glass header | `backdrop-blur-md` | `backdrop-blur-md` | ✅ |

---

## 9. Diferenças Inevitáveis (Inerentes aos Frameworks)

| Aspecto | Next.js 14 | Nuxt 3 | Justificativa |
|---------|------------|--------|---------------|
| Roteamento | App Router (file-based `.tsx`) | File-based pages (`.vue`) | Arquitetura do framework |
| Reatividade | React hooks (`useState`, `useEffect`) | Vue Composition API (`ref`, `computed`, `watch`) | Ecossistemas distintos (React vs Vue) |
| Renderização server | Server Components (RSC) | `useFetch` + SSR/SWR via Nitro | Modelos de rendering diferentes |
| Binding de dados | JSX (`{var}`, `className`) | Templates (`{{ var }}`, `v-if`, `:class`) | Sintaxe da linguagem |
| HTML seguro | `dangerouslySetInnerHTML` | `v-html` | API do framework |
| Admin post list | Prisma direto no Server Component | API `/api/admin/posts` separada | Next usa RSC, Nuxt precisa de API |
| Back button | `BackButton.tsx` (Client Component) | `<button @click="$router.back()">` inline | Mesmo comportamento, implementação idiomática |
| Login form | `LoginForm.tsx` (componente separado) | Inline no `login.vue` | Organização de código |
| Cookie strategy | 2 cookies: `auth-token` (httpOnly) + `auth-logged-in` | Função utilitária `setTokenCookie()` | Abordagem de segurança |

---

## 10. Checklist de Equivalência Final (Antes dos Testes)

### Funcionalidade
- [x] Todas as rotas da Seção 1 existem em ambas as apps
- [x] Todas as rotas de API da Seção 3 respondem com os mesmos payloads
- [x] Seed idêntica (1 admin + 1 pool post + 500 comentários)
- [x] RSS feeds idênticos (8 categorias, mesmos URLs)
- [x] Merge RSS + DB com mesma lógica de prioridade
- [x] Comentários determinísticos (50 por post, mesmo algoritmo)
- [x] Busca e filtro por categoria funcionais
- [x] CRUD admin completo (criar, editar, excluir)
- [x] Autenticação JWT com proteção de rotas

### Visual
- [x] PostCard com imagem e gradiente fallback (mesmas classes Tailwind)
- [x] Single post com imagem de capa
- [x] Tipografia idêntica (Inter, mesmos tamanhos e pesos)
- [x] Layout responsivo idêntico (mobile + desktop)
- [x] Cores e espaçamentos idênticos (indigo-600, gray-950, etc.)
- [x] Header glass effect idêntico
- [x] Footer idêntico
- [x] Paginação numerada idêntica

### Técnico
- [x] SSG aplicado nas mesmas páginas (Home, Posts)
- [x] SSR aplicado nas mesmas páginas (Admin)
- [x] ISR com mesmo intervalo (60 segundos)
- [x] CSS global idêntico (`globals.css` = `main.css`)
- [x] Tailwind config equivalente
- [x] Schema Prisma idêntico
- [x] Back button com `history.back()` em ambos

### Infraestrutura
- [ ] Ambas deployadas na Vercel
- [ ] Ambas deployadas na Netlify
- [ ] Configurações de plano equivalentes (Free tier)

---

## 11. Protocolo de Atualização

1. **Antes de implementar** qualquer feature: documentar nesta spec
2. **Ao finalizar** em ambos os frameworks: marcar o checkbox
3. **Ao identificar** diferença inevitável: documentar na Seção 9
4. **Nunca** iniciar benchmarks sem completar o Checklist da Seção 10

---

*Última atualização: 14/03/2026*
