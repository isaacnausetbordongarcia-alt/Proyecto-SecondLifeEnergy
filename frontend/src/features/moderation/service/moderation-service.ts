import { apiFetch } from '../../../services/api'
import type { Moderation, ModerationPayload } from '../types/moderation'

export const moderationService = {

    getAll: () => apiFetch<Moderation[]>('/moderations', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getById: (id: number) => apiFetch<Moderation>(`/moderations/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getEagerlyById: (id: number) => apiFetch<Moderation>(`/moderations/eagerly/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: ModerationPayload) => apiFetch<Moderation>('/moderations', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    update: (id: number, data: Partial<ModerationPayload>) =>
        apiFetch<Moderation>(`/moderations/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify(data)
        }),

    remove: (id: number) => apiFetch<void>(`/moderations/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}
