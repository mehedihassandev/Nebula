# 🤖 Master AI Coding Agent Instructions (`AGENT.md`)

This document is the **single source of truth** and **intelligence anchor** for all AI Coding Agents (such as Cursor, Windsurf, Roo Code/Cline, Copilot, and Gemini) operating in this repository. 

Whenever you invoke an AI assistant, it **MUST** read and adhere strictly to the guidelines, architecture conventions, coding paradigms, and behavioral protocols detailed below.

---

## 📑 Table of Contents
1. [Core Behavioral Directives](#-core-behavioral-directives)
2. [Documentation & Commenting Rules](#-documentation--commenting-rules)
3. [Repository & Code Architecture](#-repository--code-architecture)
4. [Caveman Clean Code Rules](#-caveman-clean-code-rules)
5. [Premium UI & Design Aesthetics](#-premium-ui--design-aesthetics)
6. [Workflow, Planning & Verification](#-workflow-planning--verification)
7. [IDE-Specific Integration Templates](#-ide-specific-integration-templates)

---

## 🎯 Core Behavioral Directives

AI agents must operate as **elite Principal Software Architects and Senior Developers**. You do not just write code; you craft maintainable, bulletproof software systems.

- **Think and Plan First**: Never jump straight into code modifications. Analyze the codebase, check dependencies, formulate an implementation plan, and align with the user before making changes.
- **Zero Placeholders**: Never write comments like `// TODO: implement later`, `// ... rest of code`, or empty code blocks. All generated code must be **fully functional, complete, and production-ready**.
- **Surgical Code Diffs**: Keep changes focused, minimal, and highly reviewable. Avoid massive refactors unless explicitly instructed.
- **Strict Type Safety**: Write strict TypeScript. The use of `any` is strictly prohibited. Use descriptive interfaces, type guards, and generics where appropriate. Double-cast (`as unknown as T`) is permitted *only* when reconciling raw API structures with strict local contracts.

---

## 📝 Documentation & Commenting Rules

Comments are written for humans to understand **design intent**, not code mechanics. 

### 1) The "Why, Not What" Directive
Do **NOT** write comments explaining *what* the code does (the code itself should be readable enough to convey that). You **MUST** write comments explaining **why** the code exists:
- Explain the business logic or product requirement behind a choice.
- Document tricky calculations, performance optimizations, or edge-case handling.
- Reference known issues, browser bugs, or API quirks.

```typescript
// ❌ BAD: Explains the "What"
// Loop through users and filter out inactive ones
const activeUsers = users.filter(u => u.status === 'active');

// ✅ GOOD: Explains the "Why" and "Tricky Logic"
// We filter out inactive users here to prevent sending automated billing 
// notifications to suspended accounts, which previously caused SMTP rate-limit bans.
const activeUsers = users.filter(u => u.status === 'active');
```

### 2) Strict JSDoc Standard for Functions
Every function, method, and hook **MUST** be documented using JSDoc. Define the purpose (focusing on "Why"), parameters, and return types explicitly.

```typescript
/**
 * Calculates a user's total active loyalty points, applying multipliers
 * for premium-tier promotions.
 * 
 * @param userId - The user's unique identifier.
 * @param promoId - Optional promotional multiplier identifier active during checkout.
 * @returns The total calculated loyalty points earned from the transaction.
 */
function calculateUserPoints(userId: string, promoId?: string): number {
  // Implementation...
}
```

### 3) Comments & Commit Messages start with Branch Name
All Git commit messages, Pull Request descriptions, and inline code tracking comments/notes **MUST** start with the active branch name followed by a colon:

```txt
<branch-name>: <action-focused-comment>
```

#### Examples:
- `feature/auth-login: added reusable login form validation`
- `fix/payment-retry: prevent duplicate retry call during timeout race`
- `refactor/profile-screen: extracted header actions into shared component`

---

## 🏗️ Repository & Code Architecture

### 1) Root Layout Structure
Keep the repository clean, structured, and modular. Ensure configuration, scripts, and runtime files are isolated.

```txt
.
├── .github/                 # CI/CD pipelines, action workflows, templates
├── .config/                 # Tool-specific configuration files (Ghostty, etc.)
├── docs/                    # Architectural documents, guides, and specifications
├── scripts/                 # Executable automation and helper scripts
├── nvim/                    # Editor modules and Neovim settings
├── ssh/                     # SSH configurations and Git multi-account setups
├── src/                     # Application source and runtime code
│   ├── app/                 # Application shell, routing, global providers
│   ├── components/          # Reusable UI components and layouts
│   ├── constants/           # All application constant datasets and configs
│   ├── hooks/               # Custom React hooks
│   ├── models/              # Global TS models and interfaces (I-prefixed)
│   └── utils/               # Generic utility helpers
├── tests/                   # Global integration, performance, and E2E tests
└── [root configs]           # package.json, tsconfig.json, .zshrc, .tmux.conf
```

### 2) Centralized Flat Architecture
Organize the `src/` directory by functional type (Models, Constants, Components, etc.). Do not nest by domain features. 

```txt
src/
├── components/
│   ├── Header.tsx           # Global UI components
│   ├── ProjectCard.tsx      # Feature-specific components
│   └── ErrorBoundary.tsx    # Higher-order components
├── constants/
│   ├── projects.ts          # Static project data
│   └── socialLinks.ts       # Global static links
├── hooks/
│   └── useNotification.tsx  # Shared hooks
├── models/
│   ├── IProject.ts          # Interfaces
│   └── IUser.ts
└── utils/
    └── icons.tsx
```

### 3) Interface and Model Conventions
- **Directory Placement**: All TypeScript interfaces **MUST** reside within the centralized `src/models/` directory. Do not mix them directly in component or service directories.
- **Strict "I" Prefix for Interfaces**: Every TypeScript interface variable **MUST** start with a capital `I` prefix (e.g., `interface IUser`). 
- **Clean Filenames**: Do **NOT** prefix the file names themselves with `I`. (e.g., `interface IUser` should be in `User.ts`, `interface IProject` in `Project.ts`).

### 4) Constant Files for Standard Rules & Static Data
- **No Inline Datasets**: Never hardcode or inline static data arrays, configuration maps, standard parameters, or validation rule lists directly within logic blocks, hooks, or component files.
- **Dedicated Constant Files**: Always organize static configs and standardized rules that need to be followed into central, read-only constant files (`constants/` directories or `*.constants.ts` files). This keeps system constraints and data rules structured, isolated, and simple to maintain.

> [!IMPORTANT]
> **Dependency Flow Rule**: Use configured path aliases (`@components/`, `@models/`, `@constants/`, `@hooks/`, `@utils/`) instead of deep relative imports (`../../`) whenever possible to keep refactoring simple.

---

## 🪓 Caveman Clean Code Rules

Maintain absolute code purity by adhering to the following strict rules:

| Commandment | Directive |
| :--- | :--- |
| **Single Purpose** | One file does exactly one job. One function performs exactly one task. |
| **Zero Sprawl** | Delete unused imports, dead exports, commented-out code blocks, and debugging remnants immediately. |
| **No Magic Numbers** | Ban hardcoded values. Extract them into domain-focused, read-only constant objects. |
| **Flatten Nesting** | Avoid deeply nested `if/else` structures. Return early using clean **Guard Clauses**. |
| **Explicit Naming** | Avoid generic abbreviations (`temp`, `data`, `obj`). Use highly descriptive domain terms. |
| **No Hidden Effects** | Functions should be pure and predictable. Side effects must be explicitly encapsulated. |
| **Deduplicate Always** | If a pattern occurs more than twice, immediately refactor it into a shared module. |

---

## 🎨 Premium UI & Design Aesthetics

When building or modifying front-end user interfaces, the output must be **visually stunning, interactive, and premium**. 

- **Harmonious Color Systems**: Avoid default browser colors (e.g., pure `#ff0000` or `#0000ff`). Implement modern HSL-tailored palettes (such as Catppuccin, Nord, or high-contrast Slate/Zinc modern dark modes).
- **Elegant Typography**: Integrate contemporary typography (e.g., *Inter*, *Outfit*, or *Roboto*) via Google Fonts instead of generic system sans-serif fallback fonts.
- **Visual Depth**: Utilize subtle CSS backdrops, glassmorphism (`backdrop-filter`), smooth shadows (`box-shadow`), and responsive gradients.
- **Dynamic Micro-Animations**: Implement smooth hover states, responsive transitions, scale adjustments, and micro-interactive elements using CSS variables or Framer Motion.
- **Complete Responsiveness**: Create layouts that dynamically adapt to all screen sizes (mobile, tablet, desktop) using CSS Grid, Flexbox, or container queries.

---

## 🚀 Workflow, Planning & Verification

### Step 1: Research & Discovery
- Search the codebase to check if a similar helper, state hook, or UI primitive already exists.
- Review existing mock data systems or fallback strategies to ensure resilience.

### Step 2: Mental or Written Plan
- Before making changes, explain the exact strategy.
- For non-trivial tasks, draft an `implementation_plan.md` outlining changed files, updated schemas, and test plans.

### Step 3: Incremental Execution
- Apply modifications file-by-file.
- Maintain documentation integrity: do not strip existing code comments that are outside the scope of your changes.

### Step 4: Verification
- Unconditionally run builds, lints, or type-checks if available on the system.
- Manually review UI layouts or API payloads to ensure they match mock configurations.

---

## 📂 IDE-Specific Integration Templates

To activate these rules inside your favorite developer tools, copy the appropriate configuration template below into your project root:

### 1) Cursor (`.cursorrules`)
Create a `.cursorrules` file in your project root with this content:
```json
{
  "instruction": "Adhere strictly to the guidelines defined in AGENT.md. Prioritize writing 'Why, not What' comments, use strict JSDocs, enforce strict TypeScript type safety, and maintain a centralized flat codebase architecture (models, components, constants).",
  "globs": ["src/**/*"]
}
```

### 2) Roo Code / Cline (`.clinerules`)
Create a `.clinerules` file in your project root with this content:
```markdown
# Roo Code Instruction Overlay
You are bound by the architectural directives, naming conventions, and commenting requirements in AGENT.md.
- Ensure all comments answer "Why this exists" and not "What it does".
- Document every function with JSDoc containing parameters and return statements.
- Follow the "Caveman Clean Code Rules" without exception.
```

### 3) Windsurf (`.windsurfrules`)
Create a `.windsurfrules` file in your project root with this content:
```yaml
rules:
  - name: Master Agent Standard
    pattern: ".*"
    instruction: |
      You must read and strictly follow AGENT.md before proposing any changes.
      Focus on clean, descriptive architecture, JSDoc parameters, JSDoc returns, and 'Why, not What' commenting.
```

### 4) GitHub Copilot / VS Code Chat (`.github/copilot-instructions.md`)
Create `.github/copilot-instructions.md` with this content:
```markdown
# GitHub Copilot System Prompts
- Reference AGENT.md for repository conventions and patterns.
- Keep components flat and centralized (no nested feature folders).
- Ensure comments describe product context and edge-case handling rather than literal code.
- Write complete, robust, type-safe solutions with zero placeholders.
```
