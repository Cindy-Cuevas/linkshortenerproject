# Authentication Guidelines

## Overview

This project uses **Clerk** exclusively for all authentication and user management. No other authentication methods should be implemented or used.

## Core Rules

### ✅ DO
- Use Clerk for all authentication flows
- Always display sign-in/sign-up as modals
- Protect the `/dashboard` route - require authentication
- Redirect logged-in users from homepage to `/dashboard`
- Use Clerk's built-in components and hooks
- Leverage Clerk middleware for route protection

### ❌ DON'T
- Implement custom authentication logic
- Use any other auth providers (NextAuth, Auth0, etc.)
- Create custom sign-in/sign-up pages (use Clerk modals)
- Allow unauthenticated access to `/dashboard`

## Implementation Patterns

### Modal Authentication

Sign-in and sign-up should always appear as modals, not full-page routes:

```tsx
import { SignIn, SignUp } from "@clerk/nextjs";

// Use Clerk components with modal configuration
<SignIn routing="modal" />
<SignUp routing="modal" />
```

### Protected Routes

The `/dashboard` page must be protected:

```tsx
// app/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/");
  }
  
  // Dashboard content...
}
```

Or use middleware approach:

```tsx
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

### Homepage Redirect

Logged-in users accessing the homepage should be redirected to `/dashboard`:

```tsx
// app/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();
  
  if (userId) {
    redirect("/dashboard");
  }
  
  // Landing page content...
}
```

### Client-Side Authentication State

For Client Components, use Clerk hooks:

```tsx
"use client";

import { useUser, SignedIn, SignedOut } from "@clerk/nextjs";

export function UserProfile() {
  const { user } = useUser();
  
  return (
    <>
      <SignedIn>
        <p>Welcome, {user?.firstName}!</p>
      </SignedIn>
      <SignedOut>
        <p>Please sign in</p>
      </SignedOut>
    </>
  );
}
```

### API Route Protection

Protect API routes using Clerk's `auth()`:

```tsx
// app/api/links/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  // API logic...
}
```

## Environment Variables

Required Clerk environment variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## Common Patterns

### Getting User ID in Server Components

```tsx
import { auth } from "@clerk/nextjs/server";

const { userId } = await auth();
```

### Getting Full User Object in Server Components

```tsx
import { currentUser } from "@clerk/nextjs/server";

const user = await currentUser();
```

### Getting User in Client Components

```tsx
"use client";
import { useUser } from "@clerk/nextjs";

const { user, isLoaded, isSignedIn } = useUser();
```

## Security Considerations

1. **Never bypass Clerk** - All authentication must go through Clerk
2. **Always validate on server** - Don't rely solely on client-side checks
3. **Use middleware** - Prefer middleware for route protection over page-level checks
4. **Protect API routes** - Always check authentication in API handlers
5. **Secure user data** - Only expose necessary user information client-side

## Testing Authentication

When testing locally:
1. Ensure Clerk environment variables are set
2. Test both authenticated and unauthenticated flows
3. Verify redirect behavior (homepage → dashboard when logged in)
4. Test modal appearance for sign-in/sign-up
5. Confirm `/dashboard` protection

---

**Remember:** Clerk handles all authentication concerns. Never implement custom auth logic or use alternative authentication methods.
