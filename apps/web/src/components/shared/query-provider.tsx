'use client'

import { useState, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered fresh for 1 minute — avoids redundant refetches
        // while navigating between pages.
        staleTime: 60 * 1_000,
        // Keep unused data in cache for 10 minutes (good for back-navigation UX).
        gcTime: 10 * 60 * 1_000,
        // One automatic retry is enough; more creates noticeable lag on real errors.
        retry: 1,
        // Don't refetch when the user switches browser tabs — jarring for shoppers.
        refetchOnWindowFocus: false,
      },
    },
  })
}

/**
 * TanStack Query provider.
 *
 * `useState(makeQueryClient)` creates a NEW QueryClient per component instance
 * instead of a module-level singleton — required for Next.js App Router so that
 * server-rendered requests don't accidentally share cached data between users.
 */
export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(makeQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
