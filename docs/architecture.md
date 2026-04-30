# Project Architecture

## Directory Structure

```
src/
├── app/
│   ├── components/
│   │   ├── about/
│   │   ├── dashboard/
│   │   ├── home/
│   │   ├── login/
│   │   └── suppliers/
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── supplier.service.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── auth.guard.ts
├── index.html
├── main.ts
└── styles.css
```

## Core Components

- **Home**: Registration component for new users.
- **Login**: Authentication entry point.
- **Dashboard**: Protected dashboard view for authenticated users.
- **About**: Information about the project and SDG 4.
- **Suppliers**: List and detail views for suppliers.

## Services

- **AuthService**: Handles user registration, login, and authentication state.
- **SupplierService**: Manages supplier data operations.

## Routing

The application uses Angular Router with the following configured routes:
- Public routes: `/login`, `/home`, `/about`
- Protected routes: `/dashboard`, `/suppliers`, `/suppliers/:id`

Route guards are implemented via `AuthGuard` to protect supplier routes.
