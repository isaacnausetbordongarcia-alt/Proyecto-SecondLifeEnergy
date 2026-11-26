// features/kit-components/services/kit-component.service.ts
import { apiFetch } from '../../../services/api'
import type { KitComponent, KitComponentPayload } from '../types/kit-component'

export const kitComponentService = {

    getAll: () => apiFetch<KitComponent[]>('/kit-components', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getByKit: (kitId: number) => apiFetch<KitComponent[]>(`/kit-components?kitId=${kitId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: KitComponentPayload) => apiFetch<KitComponent>('/kit-components', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    update: (id: number, data: Partial<KitComponentPayload>) => apiFetch<KitComponent>(`/kit-components/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(data)
    }),

    remove: (id: number) => apiFetch<void>(`/kit-components/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}