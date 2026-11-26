import { apiFetch } from '../../../services/api'
import type { ForumCategory, ForumCategoryPayload } from '../types/forum-category'

export const forumCategoryService = {

    getAll: () => apiFetch<ForumCategory[]>('/forum-categories', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getById: (id: number) => apiFetch<ForumCategory>(`/forum-categories/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: ForumCategoryPayload) => apiFetch<ForumCategory>('/forum-categories', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    update: (id: number, data: Partial<ForumCategoryPayload>) => apiFetch<ForumCategory>(`/forum-categories/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(data)
    }),

    remove: (id: number) => apiFetch<void>(`/forum-categories/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}