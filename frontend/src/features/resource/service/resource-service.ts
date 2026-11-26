import { apiFetch } from '../../../services/api'
import type { Resource, ResourcePayload } from '../types/resource'

type ResourceFilters = Record<string, string | number | boolean | null | undefined>

// Convierte los filtros en query string ignorando los vacíos: ?type=pdf&topic=leds
const buildQuery = (filters?: ResourceFilters) => {
    const params = new URLSearchParams()
    Object.entries(filters ?? {}).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') params.append(key, String(value))
    })
    const query = params.toString()
    return query ? `?${query}` : ''
}

export const resourceService = {

    getAll: (filters?: ResourceFilters) => apiFetch<Resource[]>(`/resources${buildQuery(filters)}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getById: (id: number) => apiFetch<Resource>(`/resources/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: ResourcePayload) => apiFetch<Resource>('/resources', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    update: (id: number, data: Partial<ResourcePayload>) => apiFetch<Resource>(`/resources/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(data)
    }),

    remove: (id: number) => apiFetch<void>(`/resources/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}