"use client";
import { NotificationProvider } from "@hooks/notification-hook";
import { ErrorBoundary } from "@components/ErrorBoundary";

/**
 * Wraps the application with global state and boundary providers.
 * We extract this to keep the RootLayout clean and ensure client-side
 * context providers function correctly within the Next.js App Router paradigm.
 * 
 * @param children - The child components needing access to global context.
 * @returns The provider wrapper tree.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NotificationProvider>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </NotificationProvider>
  );
}
