import { apiFetch } from '../../../services/api'
import type { ResourceTag, ResourceTagPayload } from '../types/resource-tag'

export const resourceTagService = {

    getAll: () => apiFetch<ResourceTag[]>('/resource-tags', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getByResource: (resourceId: number) => apiFetch<ResourceTag[]>(`/resource-tags?resourceId=${resourceId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: ResourceTagPayload) => apiFetch<ResourceTag>('/resource-tags', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    // clave compuesta (resourceId + tagId): no hay update, solo asignar o quitar
    remove: (resourceId: number, tagId: number) => apiFetch<void>(`/resource-tags/${resourceId}/${tagId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}