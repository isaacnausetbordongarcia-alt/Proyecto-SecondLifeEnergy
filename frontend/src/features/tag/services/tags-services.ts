import { apiFetch } from '../../../services/api'
import type { Tags, TagsPayload } from '../types/tags'

export const tagService = {

    getAll: () => apiFetch<Tags[]>('/tags', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getById: (id: number) => apiFetch<Tags>(`/tags/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: TagsPayload) => apiFetch<Tags>('/tags', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    update: (id: number, data: Partial<TagsPayload>) => apiFetch<Tags>(`/tags/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(data)
    }),

    remove: (id: number) => apiFetch<void>(`/tags/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}