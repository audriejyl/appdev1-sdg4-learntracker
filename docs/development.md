# Development Workflow

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/audriejyl/appdev1-sdg4-learntracker.git
   cd appdev1-sdg4-learntracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:4200`

## Running Tests

Execute the test suite with:
```bash
npm test
```

Tests run once and exit. For watch mode during development:
```bash
ng test
```

## Building for Production

Create an optimized production build:
```bash
npm run build
```

The build output will be in the `dist/` directory.

## Code Style

- Use TypeScript for all source files.
- Follow Angular style guide conventions.
- Use standalone components (Angular 14+).
- Use reactive forms where applicable.

## Feature Development

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and test thoroughly.
3. Add or update tests for your changes.
4. Commit with descriptive messages.
5. Push your branch and create a pull request.
