// features/article-image/services/article-image.service.ts
import { apiFetch } from '../../../services/api'
import type { ArticleImage, ArticleImagePayload } from '../types/article-image'

// Convierte el payload en FormData, ignorando los campos vacíos
const toFormData = (data: Partial<ArticleImagePayload>) => {
    const form = new FormData()
    if (data.articleId !== undefined) form.append('articleId', String(data.articleId))
    if (data.image) form.append('image', data.image)
    if (data.alt != null) form.append('alt', data.alt)
    if (data.isMain !== undefined) form.append('isMain', String(data.isMain))
    if (data.position !== undefined) form.append('position', String(data.position))
    return form
}

export const articleImageService = {

    getAll: () => apiFetch<ArticleImage[]>('/article-images', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getByArticle: (articleId: number) => apiFetch<ArticleImage[]>(`/article-images?articleId=${articleId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: ArticleImagePayload) => apiFetch<ArticleImage>('/article-images', {
        method: 'POST',
        body: toFormData(data)          
    }),

    update: (id: number, data: Partial<ArticleImagePayload>) => apiFetch<ArticleImage>(`/article-images/${id}`, {
        method: 'PUT',
        body: toFormData(data)         
    }),

    remove: (id: number) => apiFetch<void>(`/article-images/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}