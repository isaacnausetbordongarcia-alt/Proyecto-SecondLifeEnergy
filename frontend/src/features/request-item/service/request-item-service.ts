import { apiFetch } from '../../../services/api'
import type { RequestItem, RequestItemPayload } from '../types/request-item'

export const requestItemService = {

    getAll: () => apiFetch<RequestItem[]>('/request-items', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getByRequest: (requestId: number) => apiFetch<RequestItem[]>(`/request-items?requestId=${requestId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: RequestItemPayload) => apiFetch<RequestItem>('/request-items', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    update: (id: number, data: Partial<RequestItemPayload>) => apiFetch<RequestItem>(`/request-items/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(data)
    }),

    remove: (id: number) => apiFetch<void>(`/request-items/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}