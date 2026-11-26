import { apiFetch } from '../../../services/api'
import type { Article, ArticlePayload } from '../type/article'

export const articleService = {

    getAll: () => apiFetch<Article[]>('/articles', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getById: (id: number) => apiFetch<Article>(`/articles/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getByCategory: (categoryId: number) => apiFetch<Article[]>(`/articles?categoryId=${categoryId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: ArticlePayload) => apiFetch<Article>('/articles', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    update: (id: number, data: Partial<ArticlePayload>) => apiFetch<Article>(`/articles/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(data)
    }),

    remove: (id: number) => apiFetch<void>(`/articles/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}