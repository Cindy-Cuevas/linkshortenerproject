# Agent Instructions for Link Shortener Project

This document serves as the main entry point for AI coding assistants working on this project. All coding standards, conventions, and best practices are documented here and in the linked documents.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Quick Reference](#quick-reference)
- [Detailed Instructions](#detailed-instructions)
- [Project Structure](#project-structure)

## Project Overview

**Project Name:** Link Shortener  
**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Drizzle ORM, Neon PostgreSQL, Clerk Authentication  
**Architecture:** Next.js App Router with Server Components

This is a modern link shortener application built with the latest Next.js features, focusing on performance, type safety, and developer experience.

## ⚠️ CRITICAL: READ DOCUMENTATION FIRST

**BEFORE GENERATING ANY CODE, YOU MUST READ THE RELEVANT DOCUMENTATION FILES IN THE `/docs` DIRECTORY.**

This is not optional. The documentation files contain essential patterns, conventions, and architecture decisions that must be followed. Generating code without reading these files will result in inconsistent implementations that do not match the project standards.

### Required Documentation by Feature Area

For detailed guidelines on specific topics, refer to the modular documentation in the `/docs` directory:

- **[Authentication](./docs/authentication.md)** - Clerk authentication patterns, protected routes, and modal sign-in/sign-up
- **[UI Components](./docs/ui-components.md)** - shadcn/ui component usage, patterns, and guidelines

## Detailed Instructions

### Core Principles

1. **Type Safety First:** Always use TypeScript with strict mode enabled. Avoid `any` types.
2. **Server-First:** Prefer Server Components by default. Use Client Components (`'use client'`) only when necessary.
3. **Performance:** Optimize images, use dynamic imports for heavy components, leverage React 19 features.
4. **Accessibility:** Ensure all interactive elements are keyboard accessible and properly labeled.
5. **Security:** Never expose sensitive data client-side. Use environment variables properly.

### Technology-Specific Guidelines

#### Next.js 16 App Router
- Use the `app/` directory structure
- Leverage Server Components for data fetching
- Use Server Actions for mutations
- Implement proper loading and error states
- Follow the file-based routing conventions

#### React 19
- Utilize the latest React features (Actions, Transitions, etc.)
- Prefer functional components with hooks
- Use proper memoization (`useMemo`, `useCallback`) only when needed
- Follow React naming conventions (PascalCase for components)

#### TypeScript
- Enable all strict mode options
- Define explicit return types for functions
- Use discriminated unions for complex state
- Prefer interfaces for object shapes, types for unions/intersections
- Utilize TypeScript utility types (`Partial`, `Pick`, `Omit`, etc.)

#### Tailwind CSS 4
- Use Tailwind utility classes for styling
- Follow mobile-first responsive design
- Utilize the `cn()` utility function for conditional classes
- Keep custom CSS minimal; prefer Tailwind utilities
- Use CSS variables for theme values in `globals.css`

#### Drizzle ORM
- Define all database schemas in `db/schema.ts`
- Use proper TypeScript types derived from schemas
- Implement database queries in server-side code only
- Follow Drizzle's query builder patterns
- Use transactions for multi-step operations

#### Clerk Authentication
- Implement authentication using Clerk components
- Use `SignedIn`/`SignedOut` for conditional rendering
- Access user data via Clerk hooks in Client Components
- Protect API routes with Clerk middleware
- Handle authentication state properly

## Project Structure

```
linkshortenerproject/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles and Tailwind
├── db/                     # Database configuration
│   ├── schema.ts           # Drizzle ORM schemas
│   └── index.ts            # Database connection
├── lib/                    # Shared utilities
│   └── utils.ts            # Helper functions (cn, etc.)
├── public/                 # Static assets
├── docs/                   # Agent instruction documents
└── [config files]          # TypeScript, ESLint, Tailwind, etc.
```

### Key Configuration Files

- `tsconfig.json` - TypeScript configuration with strict mode
- `eslint.config.mjs` - ESLint with Next.js rules
- `drizzle.config.ts` - Drizzle ORM configuration
- `next.config.ts` - Next.js configuration
- `components.json` - shadcn/ui configuration (if used)

## Important Notes for AI Agents

1. **🚨 CRITICAL: Always read the relevant `/docs` files BEFORE generating ANY code** - This is mandatory, not optional. The documentation contains essential patterns and standards that must be followed for consistency.
2. **Maintain existing patterns** unless explicitly asked to refactor
3. **Add comments** for complex logic, but keep code self-documenting
4. **Test changes** mentally or suggest testing approaches
5. **Follow the principle of least privilege** - don't add unnecessary dependencies or complexity
6. **Preserve backwards compatibility** unless breaking changes are explicitly requested
7. **Use absolute imports** with the `@/` alias configured in TypeScript

## Getting Started for Agents

When starting work on this project:

1. Review this document thoroughly
2. **🚨 MANDATORY: Read the specific instruction files in `/docs` relevant to your task BEFORE writing ANY code**
3. Examine existing code patterns in similar files
4. Follow the established conventions strictly
5. If documentation doesn't exist for your feature area, examine similar existing implementations
6. Ask for clarification if standards conflict or are unclear

## Updating These Instructions

These instructions should be updated when:
- New patterns are established
- Dependencies are added or significantly updated
- Project architecture changes
- New conventions are adopted by the team

---

*Last Updated: January 15, 2026*  
*Version: 1.0.0*
