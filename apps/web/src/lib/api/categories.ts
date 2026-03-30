import type { Category, CategoryWithCount } from '@jewelry/shared'
import { apiClient } from './client'

export type { Category, CategoryWithCount }

export interface CreateCategoryPayload {
  name: string
  slug?: string
}

export interface UpdateCategoryPayload {
  name?: string
  slug?: string
}

export async function fetchAdminCategories(accessToken: string): Promise<CategoryWithCount[]> {
  return apiClient<CategoryWithCount[]>('/api/admin/categories', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
}

export async function createCategory(
  payload: CreateCategoryPayload,
  accessToken: string,
): Promise<Category> {
  return apiClient<Category>('/api/admin/categories', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(payload),
  })
}

export async function updateCategory(
  categoryId: string,
  payload: UpdateCategoryPayload,
  accessToken: string,
): Promise<Category> {
  return apiClient<Category>(`/api/admin/categories/${categoryId}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(payload),
  })
}

export async function deleteCategory(categoryId: string, accessToken: string): Promise<void> {
  return apiClient<void>(`/api/admin/categories/${categoryId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  })
}
