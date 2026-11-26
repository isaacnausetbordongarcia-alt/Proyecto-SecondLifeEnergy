import { apiFetch } from '../../../services/api'
import type { ArticleReview, ArticleReviewPayload } from '../types/article-review'

export const articleReviewService = {

    getAll: () => apiFetch<ArticleReview[]>('/article-reviews', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getById: (id: number) => apiFetch<ArticleReview>(`/article-reviews/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getEagerlyById: (id: number) => apiFetch<ArticleReview>(`/article-reviews/eagerly/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: ArticleReviewPayload) => apiFetch<ArticleReview>('/article-reviews', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    update: (id: number, data: Partial<ArticleReviewPayload>) =>
        apiFetch<ArticleReview>(`/article-reviews/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify(data)
        }),

    remove: (id: number) => apiFetch<void>(`/article-reviews/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}
