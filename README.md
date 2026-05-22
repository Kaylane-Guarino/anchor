# Anchor ✈️🏨

Uma plataforma moderna de reservas de hotéis desenvolvida como teste técnico, permitindo pesquisar destinos, visualizar hotéis, selecionar quartos e concluir uma reserva com fluxo completo de checkout.

## 🔗 Deploy

**Frontend (Vercel):**

Cole sua URL:

```txt
https://seu-frontend.vercel.app
```

**Backend Mock API (Render):**

Cole sua URL:

```txt
https://seu-backend.onrender.com
```

---

# 📸 Preview

Adicione screenshots ou GIFs:

## Home

![Home](./docs/home.png)

## Search

![Search](./docs/search.png)

## Hotel Details

![Hotel](./docs/hotel-details.png)

## Checkout

![Checkout](./docs/checkout.png)

---

# ✨ Funcionalidades

## 🏠 Home

### Básico

- Busca de destinos com autocomplete
- Seleção de check-in/check-out
- Seleção de hóspedes e quartos
- Redirecionamento com filtros na URL

### Avançado

- Debounce nas buscas
- Histórico das últimas 5 pesquisas
- Sugestões pesquisadas recentemente
- Navegação por teclado nas sugestões
- Fechamento automático ao clicar fora
- Datas não permitem:
  - Check-in no passado
  - Menos de 1 diária
  - Mais de 30 diárias

---

## 🔍 Search

### Básico

- Listagem de hotéis
- Paginação
- Skeleton loading
- Estado vazio
- Retry em erros

### Filtros

- Faixa de preço
- Avaliação mínima
- Tipo de propriedade
- Comodidades

### Extras

- URL State Sync
- Compartilhamento por URL
- Toasts
- Carrossel responsivo

---

## 🏨 Hotel Details

### Básico

- Página dinâmica do hotel
- Galeria de imagens
- Informações completas
- Lista de quartos disponíveis

### Extras

- Modal/Lightbox
- Google Maps
- Reviews
- Indicador de escassez:

```txt
Apenas X quartos restantes
```

- Seleção persistida globalmente

---

## 💳 Checkout

### Multi-step

- Dados pessoais
- Pagamento
- Revisão
- Confirmação

### Validações

- Nome completo obrigatório
- E-mail válido
- Telefone com máscara
- CPF real
- Cartão validado usando Luhn Algorithm
- Validade do cartão
- CVV obrigatório
- Aceite dos termos obrigatório

### Experiência

- Persistência de dados na sessão
- Total calculado automaticamente
- Breakdown completo:
  - Diárias
  - Taxas
  - Impostos

### Pagamento simulado

- Loading de processamento
- Simulação de aprovação
- Reserva confirmada
- Número de reserva gerado automaticamente

---

## 🎨 UX/UI

- Responsividade completa
- Toast notifications
- Error Boundary
- Página 404 personalizada
- Skeleton screens
- Animações usando Motion
- Feedback visual em ações

---

# 🚀 Tecnologias

### Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Motion
- Zustand
- React Hook Form
- Zod
- TanStack Query
- Lucide React

### Backend Mock

- JSON Server
- Render

---

# 📁 Estrutura

```txt
src/
├── app/
├── components/
├── hooks/
├── services/
├── schemas/
├── stores/
├── types/
├── utils/
```

---

# 🧠 Decisões técnicas

## Zustand

Utilizado para gerenciamento global de:

- Hotel selecionado
- Quarto selecionado
- Datas
- Informações persistidas

Escolhido por ser simples e possuir baixo overhead.

---

## React Query

Utilizado para:

- Cache
- Loading
- Retry
- Controle de estados assíncronos

---

## React Hook Form + Zod

Utilizado para:

- Validação
- Performance
- Tipagem automática

---

## Session Storage

Utilizado para persistir:

- Hotel selecionado
- Quarto
- Datas
- Dados temporários do checkout

Permite atualização da página sem perda de estado.

---

# 💳 Dados para teste do checkout

O projeto utiliza validação real para alguns campos:

- Nome completo
- E-mail
- CPF
- Telefone
- Cartão (Luhn Algorithm)
- Data de expiração
- CVV

Como o cartão é validado usando Luhn Algorithm, números aleatórios podem falhar.

Geradores para teste:

- :contentReference[oaicite:0]{index=0}
- :contentReference[oaicite:1]{index=1}

Exemplo válido para testes:

```txt
Número cartão: 2663 8230 9425 7598
Nome: Maria Silva
E-mail: maria@email.com
Telefone: (11) 99999-9999
CPF: 529.982.247-25
Validade: 12/30
CVV: 123
```

Obs.:

```txt
Nenhum pagamento real é processado.
Todo o fluxo é apenas uma simulação.
```

---

# ⚡ Performance

Implementações realizadas:

- Next/Image
- Image optimization
- Prefetch de rotas
- Lazy loading automático
- Debounce
- React Query cache
- Persistência em sessão

---

# 🛠️ Como executar localmente

Clone o projeto:

```bash
git clone https://github.com/Kaylane-Guarino/anchor.git
```

Entre na pasta:

```bash
cd anchor
```

Instale dependências:

```bash
pnpm install
```

Inicie frontend:

```bash
pnpm dev
```

Inicie backend:

```bash
pnpm server
```

Frontend:

```txt
http://localhost:3000
```

API:

```txt
http://localhost:3333
```

---

# 🔮 Melhorias futuras

- Favoritar hotéis
- Compartilhar hotéis
- Comparação entre quartos
- Histórico de reservas
- PWA
- Sentry
- Testes automatizados
- CI/CD

---

# 👩‍💻 Desenvolvido por

Kaylane Guarino