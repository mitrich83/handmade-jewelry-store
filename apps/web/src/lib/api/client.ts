/**
 * Base API client for all requests to the NestJS backend.
 *
 * Usage (in lib/api/products.ts etc.):
 *   const products = await apiClient<Product[]>('/products')
 *
 * Environment:
 *   NEXT_PUBLIC_API_URL — set in .env.local (defaults to http://localhost:4000)
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function apiClient<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new ApiError(response.status, `API ${response.status}: ${response.statusText} — ${path}`)
  }

  return response.json() as Promise<T>
}
