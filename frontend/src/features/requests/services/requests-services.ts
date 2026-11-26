import { apiFetch } from '../../../services/api'
import type { Requests, RequestsPayload } from '../types/requests'

export const requestsService = {

    getAll: () => apiFetch<Request[]>('/requests', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getById: (id: number) => apiFetch<Requests>(`/requests/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: RequestsPayload) => apiFetch<Requests>('/requests', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    update: (id: number, data: Partial<RequestsPayload>) => apiFetch<Requests>(`/requests/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(data)
    }),

    remove: (id: number) => apiFetch<void>(`/requests/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}