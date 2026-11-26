// features/article-resources/services/article-resource.service.ts
import { apiFetch } from '../../../services/api'
import type { ArticleResource, ArticleResourcePayload } from '../types/article-resource'

export const articleResourceService = {

    getAll: () => apiFetch<ArticleResource[]>('/article-resources', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getByArticle: (articleId: number) => apiFetch<ArticleResource[]>(`/article-resources?articleId=${articleId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getByResource: (resourceId: number) => apiFetch<ArticleResource[]>(`/article-resources?resourceId=${resourceId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: ArticleResourcePayload) => apiFetch<ArticleResource>('/article-resources', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    // clave compuesta (articleId + resourceId): no hay update, solo asignar o quitar
    remove: (articleId: number, resourceId: number) => apiFetch<void>(`/article-resources/${articleId}/${resourceId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}