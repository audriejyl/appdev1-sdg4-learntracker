# Services Documentation

## AuthService

Handles user authentication including registration and login.

### Methods

- `register(email: string, password: string): boolean`
  - Registers a new user account.
  - Returns `true` if registration is successful, `false` if email already exists.

- `login(email: string, password: string): boolean`
  - Authenticates a user.
  - Returns `true` on successful login, `false` otherwise.

- `logout(): void`
  - Logs out the current user.

- `isLoggedIn(): boolean`
  - Returns the current login state.

## SupplierService

Manages supplier data and operations.

### Methods

- `getSuppliers(): Supplier[]`
  - Returns the complete list of suppliers.

- `getSupplierById(id: number): Supplier | undefined`
  - Returns a supplier by ID, or `undefined` if not found.

- `updateSupplier(updated: Supplier): void`
  - Updates supplier information and notifies subscribers via the `suppliers$` observable.

### Observable

- `suppliers$: Observable<Supplier[]>`
  - Observable stream for supplier data updates.
