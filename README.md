# StayFlow ✈️🏨

Plataforma de busca e reserva de hotéi, desenvolvida com foco em experiência do usuário, performance e arquitetura escalável.

## 🔗 Demo

Frontend: https://anchor-one-rust.vercel.app/

Backend Mock API: https://mock-api-anchor.onrender.com/

---

## ✨ Funcionalidades

### Busca

- Busca por destino
- Sugestões automáticas (autocomplete)
- Seleção de datas
- Seleção de hóspedes e quartos
- Persistência via URL

### Filtros

- Faixa de preço
- Avaliação mínima
- Tipo de propriedade
- Comodidades
- Ordenação
- Aplicação dinâmica de filtros

### Hotéis

- Detalhes completos
- Galeria de imagens
- Distância até praia e centro
- Amenidades tratadas
- Avaliações
- Seleção de quartos

### Checkout

- Resumo da reserva
- Formulário validado
- Máscaras
- Persistência da reserva

---

## 🛠 Tecnologias

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Shadcn UI
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Axios

### Backend Mock

- JSON Server
- Render

### Deploy

- Vercel
- Render

---

## 📂 Estrutura do projeto

```txt
src
├── app
├── components
│   ├── checkout
│   ├── hotel
│   ├── layout
│   ├── search
│   └── ui
├── hooks
├── lib
├── services
├── stores
├── types
├── utils
└── schemas
```

---

## 🏗 Arquitetura

O projeto foi estruturado seguindo princípios de separação de responsabilidades:

- Components → UI e apresentação
- Hooks → lógica reutilizável
- Services → integração com API
- Stores → gerenciamento de estado global
- Utils → funções auxiliares
- Schemas → validações

Também foram aplicados conceitos de:

- Clean Code
- SOLID
- Componentização
- Reutilização
- Tipagem forte
- Separation of Concerns

---

## ⚡ Melhorias implementadas

- Skeleton loading
- Estados de erro
- Estados vazios
- Retry automático
- Tratamento global de API
- Persistência de filtros na URL
- Galeria interativa
- Responsividade
- SEO básico
- Otimização de imagens

---

## 🚀 Como executar

### Clonar projeto

```bash
git clone https://github.com/Kaylane-Guarino/stayflow.git
```

Entrar na pasta:

```bash
cd stayflow
```

Instalar dependências:

```bash
pnpm install
```

Criar arquivo:

```env
.env.local
```

Adicionar:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3333
```

Rodar frontend:

```bash
pnpm dev
```

---

## Backend Mock

Entrar na pasta:

```bash
cd mock-api
```

Instalar:

```bash
pnpm install
```

Rodar:

```bash
pnpm dev
```

---

## 📈 Melhorias futuras

- Favoritar hotéis
- Histórico de buscas
- Mapa integrado
- Compartilhamento
- Testes unitários
- Testes E2E
- Storybook
- Virtualização
- Prefetch de hotéis
- Placeholder blur em imagens

---

## 👩‍💻 Desenvolvido por

Kaylane Guarino

LinkedIn: https://www.linkedin.com/in/kaylane-guarino-84229120a/

GitHub: https://github.com/Kaylane-Guarino
