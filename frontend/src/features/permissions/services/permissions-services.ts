import { apiFetch } from '../../../services/api'
import type { Permissions, PermissionsPayload } from '../types/permissions'

export const permissionService = {

    getAll: () => apiFetch<Permissions[]>('/permissions', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getById: (id: number) => apiFetch<Permissions>(`/permissions/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: PermissionsPayload) => apiFetch<Permissions>('/permissions', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    update: (id: number, data: Partial<PermissionsPayload>) => apiFetch<Permissions>(`/permissions/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(data)
    }),

    remove: (id: number) => apiFetch<void>(`/permissions/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}