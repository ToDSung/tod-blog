# ToD's Workspace - Architecture Specification

> **Last Updated**: 2026-02-16  
> **Version**: 1.0.0

## Overview

This is a **pnpm monorepo workspace** containing three distinct packages for personal projects, LeetCode solutions, and technical documentation. The workspace uses modern tooling including Next.js 15, React 19, Tailwind CSS 4, Docusaurus 3, and TypeScript with strict type checking.

---

## Monorepo Structure

```
tod-blog/
├── .agent/                    # Agent workflows and skills
│   └── skills/               # Vercel React best practices skill
├── .husky/                   # Git hooks (pre-commit)
├── packages/
│   ├── tod-blog/            # Next.js 15 personal blog (main project)
│   ├── leetcode/            # Algorithm solutions with Jest tests
│   └── articles/            # Docusaurus 3 documentation site
├── eslint.config.mjs        # ESLint v9 flat config (workspace-wide)
├── tsconfig.base.json       # TypeScript composite project base config
├── jest.config.base.js      # Shared Jest configuration
├── pnpm-workspace.yaml      # pnpm workspace definition
└── package.json             # Root workspace package
```

---

## Packages

### 1. `tod-blog` - Personal Blog (Next.js 15)

**Location**: `packages/tod-blog/`  
**Type**: Next.js 15 static site with App Router  
**Output**: Static export (`output: 'export'`)

#### Tech Stack

- **Framework**: Next.js 15.1.4 (App Router)
- **React**: 19.0.0
- **Styling**: Tailwind CSS 4.1.18
- **Fonts**: Google Fonts (Caveat)
- **Code Playground**: @codesandbox/sandpack-react 2.19.10
- **SEO**: next-sitemap 2.5.28
- **Icons**: react-icons 4.12.0
- **Animations**: typed.js 2.1.0

#### Key Features

- Static site generation (SSG)
- App Router with layout system
- Responsive design with Tailwind CSS 4
- SEO optimization with metadata and sitemap
- Google verification integrated
- Custom Navbar component
- Landing page with animations

#### Structure

```
packages/tod-blog/
├── app/
│   ├── layout.tsx           # Root layout with Navbar
│   ├── page.tsx             # Home page (LandingPage component)
│   └── components/          # App-specific components
├── components/              # Shared React components
│   └── LandingPage/        # Main landing page component
├── styles/
│   └── globals.css         # Global Tailwind styles
├── public/                 # Static assets
├── types/                  # TypeScript type definitions
├── next.config.js          # Next.js configuration
├── postcss.config.js       # PostCSS with Tailwind
├── next-sitemap.js         # Sitemap generation config
└── eslint.config.mjs       # Package-specific ESLint config
```

#### Scripts

- `dev`: Development server
- `build`: Production build + sitemap generation
- `start`: Production server
- `eslint:fix`: Auto-fix linting issues

#### Configuration Notes

- Uses static export mode (`output: 'export'`)
- ESLint ignored during builds (`ignoreDuringBuilds: true`)
- Google verification: `9JFlPPjMcTWCa_ePEuHyFvlCv8LS2xZkeK3alcNc_oE`
- Locale: zh-tw (Taiwan)

---

### 2. `leetcode` - Algorithm Solutions

**Location**: `packages/leetcode/`  
**Type**: TypeScript library with Jest testing  
**Package Name**: `@tod-workspace/leetcode`

#### Tech Stack

- **Language**: TypeScript (strict mode)
- **Testing**: Jest 29.7.0 with ts-jest
- **Utilities**: lodash 4.17.21

#### Structure

```
packages/leetcode/
├── src/
│   ├── lib/                # Library utilities
│   ├── sort/               # Sorting algorithms
│   ├── structure/          # Data structures
│   └── utils/              # Helper utilities
├── jest.config.ts          # Jest configuration
├── tsconfig.json           # TypeScript config
└── .eslintrc.json          # ESLint config
```

#### Testing Strategy

- Test files: `*.spec.ts` and `*.test.ts`
- Coverage directory: `../../coverage/packages/leetcode`
- Pre-commit hook: Runs tests only for staged files
- Configuration: Extends `jest.config.base.js`
- `passWithNoTests: false` - Ensures tests exist

#### Scripts

- `test`: Run Jest tests with custom config

#### Pre-commit Integration

The Husky pre-commit hook automatically:

1. Detects staged files in `packages/leetcode/`
2. Runs `jest --findRelatedTests` for only those files
3. Blocks commit if tests fail

---

### 3. `articles` - Documentation Site

**Location**: `packages/articles/`  
**Type**: Docusaurus 3 documentation site  
**Private**: Yes

#### Tech Stack

- **Framework**: Docusaurus 3.0.0
- **React**: 19.0.0
- **Plugins**:
  - @docusaurus/preset-classic
  - @docusaurus/plugin-google-gtag
- **Syntax Highlighting**: prism-react-renderer 2.0.0
- **MDX**: @mdx-js/react 3.1.1

#### Structure

```
packages/articles/
├── docs/                   # Documentation markdown files
├── blog/                   # Blog posts
├── src/                    # Custom React components
├── static/                 # Static assets
├── docusaurus.config.mjs   # Docusaurus configuration
├── sidebars.js             # Sidebar navigation
└── babel.config.js         # Babel configuration
```

#### Scripts

- `dev` / `start`: Development server
- `build`: Production build
- `serve`: Serve built site
- `deploy`: Deploy site
- `clear`: Clear cache
- `swizzle`: Customize Docusaurus components
- `write-heading-ids`: Auto-generate heading IDs
- `write-translations`: Extract translatable strings

#### Browser Support

- **Production**: >0.5%, not dead, not op_mini all
- **Development**: Latest Chrome, Firefox, Safari

---

## Tooling & Configuration

### Package Manager: pnpm

**Workspace Configuration**: `pnpm-workspace.yaml`

```yaml
packages:
  - 'packages/*'
```

**Key Commands**:

- `pnpm -F <package>`: Run commands in specific package
- `pnpm -F tod-blog dev`: Start blog dev server
- `pnpm -F leetcode test`: Run LeetCode tests
- `pnpm -F articles dev`: Start docs dev server

---

### TypeScript

**Base Configuration**: `tsconfig.base.json`

#### Compiler Options

- **Module System**: CommonJS
- **Target**: ES2020
- **Strict Mode**: Enabled
- **Composite Projects**: Enabled (for monorepo)
- **Declaration Maps**: Enabled (for better IDE support)
- **Incremental Compilation**: Enabled

#### Project References

The workspace uses TypeScript project references for better build performance:

- `packages/articles`
- `packages/leetcode`
- `packages/tod-blog`

---

### ESLint v9 (Flat Config)

**Configuration**: `eslint.config.mjs` (workspace root)

#### Key Features

- **Flat Config System**: ESLint v9 modern configuration
- **TypeScript Support**: typescript-eslint 8.53.0
- **Import Organization**: Automatic import sorting and grouping
- **Prettier Integration**: eslint-plugin-prettier for code formatting
- **React Support**: React hooks and JSX a11y rules

#### Rules Highlights

- **Import Sorting**: Alphabetical with newlines between groups
- **Type Imports**: Enforced `type` keyword for type-only imports
- **Consistent Type Specifiers**: Enforced consistency
- **Prettier**: Auto-formatting with `endOfLine: 'auto'`

#### File-Specific Configs

- **JavaScript files**: Type checking disabled
- **Declaration files (`.d.ts`)**: Triple-slash references allowed
- **Ignored**: `.next/`, `dist/`, `node_modules/`, `build/`

#### Package-Specific ESLint

- `tod-blog`: Has additional `eslint.config.mjs` with Next.js rules
- `leetcode`: Uses legacy `.eslintrc.json`

---

### Jest Testing

**Base Configuration**: `jest.config.base.js`

#### Shared Settings

- **Environment**: jsdom (for React testing)
- **Transform**: ts-jest for TypeScript
- **Test Match Patterns**: `*.spec.ts`, `*.test.ts`, `*.spec.tsx`, `*.test.tsx`

#### Package-Specific Configs

- **leetcode**: Custom `jest.config.ts` extending base config
  - Display name: 'leetcode'
  - Coverage directory: `../../coverage/packages/leetcode`
  - `passWithNoTests: false`

---

### Git Hooks (Husky)

**Configuration**: `.husky/pre-commit`

#### Pre-commit Workflow

1. **Lint Staged Files**: Runs `lint-staged` for all staged files
2. **LeetCode Tests**: If any files in `packages/leetcode/` are staged:
   - Extracts relative file paths
   - Runs `pnpm -F leetcode test --findRelatedTests <files>`
   - Blocks commit if tests fail

#### Lint-Staged Configuration

**File**: `.lintstagedrc.json`

```json
{
  "*.{ts,tsx,js,jsx,mjs,cjs}": "eslint --fix"
}
```

---

### Code Formatting

#### Prettier

**Configuration**: `.prettierrc.json`

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false
}
```

**Ignored**: `.prettierignore`

- `pnpm-lock.yaml`
- `yarn.lock`
- `package-lock.json`
- `.next/`
- `build/`

---

### Commitlint

**Configuration**: `commitlint.config.mjs`

Enforces conventional commit messages using `@commitlint/config-conventional`.

**Format**: `<type>(<scope>): <subject>`

**Examples**:

- `feat(blog): add new landing page animation`
- `fix(leetcode): correct binary search implementation`
- `docs(articles): update API documentation`

---

### Renovate

**Configuration**: `renovate.json`

Automated dependency updates with:

- Extends: `config:recommended`
- Custom rules for dependency grouping and scheduling

---

## Styling System

### Tailwind CSS 4

**Version**: 4.1.18  
**Integration**: PostCSS plugin

#### Configuration Files

- `postcss.config.js`: PostCSS with Tailwind and Autoprefixer
- `globals.css`: Tailwind directives and custom styles

#### Custom CSS Variables

The `tod-blog` package uses CSS custom properties for theming:

- `--default-canvas`: Background color
- `--default-text`: Text color

#### Tailwind Plugins

- `@tailwindcss/postcss`: Core Tailwind functionality
- `autoprefixer`: Browser compatibility

---

## Development Workflow

### Initial Setup

```bash
# Install dependencies
pnpm install

# Prepare Git hooks
pnpm prepare
```

### Development

```bash
# Start blog development server
pnpm -F tod-blog dev

# Start documentation site
pnpm -F articles dev

# Run LeetCode tests
pnpm -F leetcode test

# Run LeetCode tests in watch mode
pnpm -F leetcode test -- --watch
```

### Building

```bash
# Build blog for production
pnpm -F tod-blog build

# Build documentation site
pnpm -F articles build
```

### Linting & Formatting

```bash
# Fix linting issues in blog
pnpm -F tod-blog eslint:fix

# Format all files (manual)
npx prettier --write .
```

### Committing

```bash
# Stage changes
git add .

# Commit (triggers pre-commit hooks)
git commit -m "feat(blog): add new feature"

# Pre-commit will:
# 1. Run lint-staged (ESLint auto-fix)
# 2. Run related LeetCode tests (if applicable)
# 3. Validate commit message format
```

---

## Dependencies Overview

### Shared Dependencies (Root)

- **React Ecosystem**: React 19, React DOM 19
- **Next.js**: 15.1.4
- **TypeScript**: 5.7.2
- **Testing**: Jest 29.7.0, @testing-library/react 16.1.0, Cypress 13.16.0
- **Linting**: ESLint 9.18.0, typescript-eslint 8.53.0
- **Styling**: Tailwind CSS 4.1.18, PostCSS 8.4.49
- **Git Hooks**: Husky 9.1.7, lint-staged 15.2.10
- **Commit Linting**: @commitlint/cli 19.6.0

### Package-Specific Dependencies

#### tod-blog

- `@codesandbox/sandpack-react`: Interactive code playgrounds
- `next-sitemap`: SEO sitemap generation
- `react-icons`: Icon library
- `typed.js`: Typing animation effects
- `dedent`: Template string dedentation

#### leetcode

- `lodash`: Utility library for algorithms

#### articles

- `@docusaurus/core`: Documentation framework
- `@docusaurus/preset-classic`: Classic theme preset
- `@docusaurus/plugin-google-gtag`: Google Analytics
- `@mdx-js/react`: MDX support
- `prism-react-renderer`: Syntax highlighting

---

## Skills & Best Practices

### Vercel React Best Practices Skill

**Location**: `.agent/skills/vercel-react-best-practices/`

This skill contains React and Next.js performance optimization guidelines from Vercel Engineering. It should be referenced when:

- Writing new React components
- Reviewing or refactoring React/Next.js code
- Optimizing bundle size
- Implementing data fetching patterns
- Improving performance

**Key Rules**:

- Async/defer/await patterns
- Component optimization
- Data fetching strategies
- Bundle optimization techniques

---

## Key Architectural Decisions

### 1. Monorepo with pnpm Workspaces

**Rationale**: Centralized dependency management, shared tooling, and efficient disk usage with pnpm's content-addressable storage.

### 2. TypeScript Composite Projects

**Rationale**: Faster incremental builds, better IDE performance, and clear package boundaries.

### 3. ESLint v9 Flat Config

**Rationale**: Modern ESLint configuration system with better performance and simpler configuration.

### 4. Static Site Generation for Blog

**Rationale**: Better performance, SEO, and hosting simplicity (can deploy to any static host).

### 5. Pre-commit Testing for LeetCode

**Rationale**: Ensures algorithm solutions are tested before committing, maintaining code quality.

### 6. Separate Documentation Site

**Rationale**: Docusaurus provides excellent documentation features (versioning, search, i18n) separate from the main blog.

---

## Future Considerations

### Potential Improvements

1. **Shared Components Package**: Extract common components from `tod-blog` into a shared package
2. **E2E Testing**: Implement Cypress tests in `tod-blog-e2e` package
3. **Unified ESLint Config**: Migrate `leetcode` to flat config for consistency
4. **CI/CD Pipeline**: Add GitHub Actions for automated testing and deployment
5. **Storybook**: Add component documentation and visual testing
6. **Monorepo Build Orchestration**: Consider Turborepo or Nx for better build caching

---

## Quick Reference

### Common Commands

| Task                  | Command                       |
| --------------------- | ----------------------------- |
| Install dependencies  | `pnpm install`                |
| Start blog dev server | `pnpm -F tod-blog dev`        |
| Build blog            | `pnpm -F tod-blog build`      |
| Start docs dev server | `pnpm -F articles dev`        |
| Run LeetCode tests    | `pnpm -F leetcode test`       |
| Fix linting issues    | `pnpm -F tod-blog eslint:fix` |
| Prepare Git hooks     | `pnpm prepare`                |

### Important Files

| File                    | Purpose                |
| ----------------------- | ---------------------- |
| `pnpm-workspace.yaml`   | Workspace definition   |
| `tsconfig.base.json`    | TypeScript base config |
| `eslint.config.mjs`     | ESLint configuration   |
| `jest.config.base.js`   | Jest base config       |
| `.husky/pre-commit`     | Pre-commit hook        |
| `.lintstagedrc.json`    | Lint-staged config     |
| `commitlint.config.mjs` | Commit message linting |

### Package Entry Points

| Package  | Entry Point                      |
| -------- | -------------------------------- |
| tod-blog | `packages/tod-blog/app/page.tsx` |
| leetcode | `packages/leetcode/src/index.ts` |
| articles | `packages/articles/docs/`        |

---

## Contact & Metadata

**Author**: Tod Sung  
**Email**: wlunareve@gmail.com  
**Locale**: Taiwan (zh-tw)  
**License**: MIT

---

_This specification is maintained as a living document and should be updated as the architecture evolves._
