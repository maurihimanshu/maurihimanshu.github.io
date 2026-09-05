# Contributing Guidelines

Thank you for your interest in contributing to the **Himanshu Kumar Portfolio Web Application**! We welcome contributions that help enhance the codebase, optimize performance, or add innovative features.

---

## 📋 Code of Conduct

All contributors are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before participating.

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: >= 20.x
- **npm**: >= 10.x
- **Git**

### Fork & Setup
1. Fork the repository on GitHub: [https://github.com/maurihimanshu/portfolio](https://github.com/maurihimanshu/portfolio).
2. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/portfolio.git
   cd portfolio/ReactUI
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🌿 Branching Strategy & Git Workflow

- **`main`**: Protected production branch deployed live to GitHub Pages. Direct pushes are restricted; all changes must arrive via reviewed Pull Request from `developer`.
- **`developer`**: Active integration branch for ongoing development. Feature branches branch out from and merge back into `developer`.
- Create feature or fix branches from `developer` using descriptive naming:
  - `feat/feature-name`
  - `fix/bug-description`
  - `docs/documentation-update`
  - `refactor/component-name`

### Commit Message Conventions
Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
- `feat:` A new user-facing feature
- `fix:` A bug fix
- `docs:` Documentation changes only
- `style:` Formatting or CSS tweaks with no code logic changes
- `refactor:` Code refactoring without behavioral changes
- `test:` Adding or updating tests
- `ci:` CI/CD pipeline or workflow changes

---

## 🧪 Quality Standards & Testing Requirement

This repository enforces **100% test coverage** on all statements, branches, functions, and lines:

```bash
# Run unit tests
npm run test

# Run tests with strict 100% coverage report
npm run test:coverage

# Run TypeScript type check and production bundle build
npm run build
```

> [!IMPORTANT]
> Any pull request that fails type checking (`npm run build`) or drops below 100% coverage will be blocked by the automated CI pipeline.

---

## 🚀 Submitting a Pull Request

1. Push your branch to your GitHub fork:
   ```bash
   git push origin feat/your-feature-name
   ```
2. Open a Pull Request targeting the `main` branch.
3. Complete the [Pull Request Template](.github/pull_request_template.md) checklist:
   - Provide a clear summary of changes.
   - Attach relevant screenshots or recordings for UI changes.
   - Confirm all local tests and coverage checks pass.
4. Address any review comments or CI feedback.

Thank you for contributing!
