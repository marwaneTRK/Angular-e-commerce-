# Angular E-Commerce (Educational Showcase)

This repository is a learning-focused Angular 19 e-commerce app where I practice **real project structure**, **routing architecture**, **state handling patterns**, and **role-based access flows**.

The goal is to showcase how I organize an Angular codebase like a production app, even when some features are intentionally mock/local.

This repository is also a **free e-commerce example template**: anyone can use it as a starter, learning reference, or base structure for their own Angular shop project.

## Why this project

I built this project to demonstrate:

- Feature-first folder organization (`core`, `shared`, `pages`)
- Standalone Angular application bootstrapping (`bootstrapApplication` + `app.config.ts`)
- Multi-layout routing (public, admin, client)
- Route guards for authentication and role authorization
- Service layer separation (auth, products, users, cart)
- Reusable UI building blocks (button, modal, loader, search)
- Local and remote data handling (`localStorage` + HTTP API)

## Tech stack

- Angular 19 (standalone APIs)
- TypeScript
- Angular Router
- RxJS
- Angular Reactive Forms
- `HttpClient`
- Tailwind CSS
- `ngx-toastr`

## Current features

### Public area
- Home page with product listing
- Search/filter products by title
- Product details page
- Login page with reactive form validation

### Client area (protected)
- Client layout
- Orders page scaffold
- Cart page with quantity management and total calculation

### Admin area (protected)
- Admin layout and dashboard
- Product list page
- User list/add/edit pages
- Confirm modal before deletion actions

### Security and access flow
- `authGuard`: blocks unauthenticated routes
- `roleGuard`: enforces `admin` or `client` access per route
- Unauthorized page for forbidden access attempts

## Project architecture

```text
src/app/
  core/
    guards/
      auth/
      role/
    models/
    services/
      auth/
      cart/
      users/
      product.service.ts

  shared/
    layouts/
      main-layout/
      admin-layout/
      client-layout/
      navbar/
      footer/
    components/
      product-card/
    ui/
      button/
      confirm-modal/
      loader/
      search-bar/

  pages/
    public/
      home/
      product-details/
      auth/login/
      unauthorized/
      not-found/
    client/
      orders/
      cart/
    admin/
      dashboard/
      products/
      users/
```

### Folder responsibilities

- `core/`: singleton, app-wide logic (services, guards, models)
- `shared/`: reusable layouts/components/ui used in multiple features
- `pages/`: route-level screens organized by domain and role

## Routing strategy

Defined in `src/app/app.routes.ts` with three route groups:

- `/` -> `MainLayoutComponent` for public screens
- `/admin` -> `AdminLayoutComponent` + `canActivate: [authGuard, roleGuard]` + `data: { role: 'admin' }`
- `/client` -> `ClientLayoutComponent` + `canActivate: [authGuard, roleGuard]` + `data: { role: 'client' }`

This structure keeps layout concerns and authorization concerns explicit at route level.

## State and data patterns

### Authentication (`AuthService`)
- Mock users persisted in `localStorage`
- Login/logout and current user retrieval
- Seeded demo users are initialized automatically

### Cart (`CartService`)
- `BehaviorSubject<CartItem[]>` for reactive cart state
- `localStorage` persistence
- Add/increase/decrease/remove/clear helpers
- Derived selectors: `getTotal()`, `getCount()`

### Products (`ProductService`)
- Reads product data from `https://fakestoreapi.com/products`
- Uses `HttpClient` with typed `Observable<Product[]>`
- Add/update/delete methods are scaffolded for future backend integration

### Users (`UserService`)
- Local in-memory CRUD-style operations
- Used for admin-side user management screens

## Forms and validation

`LoginComponent` uses **Reactive Forms** with:

- Required validation
- Email format validation
- Minimum password length
- Controlled submit flow + error messaging

## UI reuse examples

- `ButtonComponent`: style variants (`primary`, `secondary`)
- `ConfirmModalComponent`: reusable confirmation dialog for destructive actions
- `LoaderComponent`: common loading state indicator
- `SearchBarComponent`: shared search input behavior
- `ProductCardComponent`: reusable product presentation and navigation

## Running the project

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm start
```

Open: `http://localhost:4200`

### 3. Run tests

```bash
npm test
```

### 4. Build for production

```bash
npm run build
```

## Demo credentials

Initialized in `AuthService`:

- Admin
  - Email: `admin@ecom.local`
  - Password: `admin123`
- Client
  - Email: `hamza@ecom.local`
  - Password: `hamza123`

## Notes for reviewers

This project intentionally mixes real API consumption (products) with mock/local state (auth/users/cart) to focus on **frontend architecture and Angular patterns**.

Planned improvements:

- Connect admin CRUD actions to a real backend
- Add HTTP interceptors and token strategy
- Expand unit/integration tests for guards and services
- Add strict typing for all domain entities and DTOs

