import { apiFetch } from '../../../services/api'
import type { ArticleCategory, ArticleCategoryPayload } from '../types/article-category'

export const articleCategoryService = {

    getAll: () => apiFetch<ArticleCategory[]>('/article-categories', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getById: (id: number) => apiFetch<ArticleCategory>(`/article-categories/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getEagerlyById: (id: number) => apiFetch<ArticleCategory>(`/article-categories/eagerly/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: ArticleCategoryPayload) => apiFetch<ArticleCategory>('/article-categories', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    update: (id: number, data: Partial<ArticleCategoryPayload>) =>
        apiFetch<ArticleCategory>(`/article-categories/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify(data)
        }),

    remove: (id: number) => apiFetch<void>(`/article-categories/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}
