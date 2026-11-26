import { apiFetch } from '../../../services/api'
import type { SimulationResource, SimulationResourcePayload } from '../types/simulation-resource'

export const simulationResourceService = {

    getAll: () => apiFetch<SimulationResource[]>('/simulation-resources', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getByIds: (simulationId: number, resourceId: number) =>
        apiFetch<SimulationResource>(`/simulation-resources/${simulationId}/${resourceId}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }),

    getEagerlyByIds: (simulationId: number, resourceId: number) =>
        apiFetch<SimulationResource>(`/simulation-resources/eagerly/${simulationId}/${resourceId}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }),

    create: (data: SimulationResourcePayload) =>
        apiFetch<SimulationResource>('/simulation-resources', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(data)
        }),

    remove: (simulationId: number, resourceId: number) =>
        apiFetch<void>(`/simulation-resources/${simulationId}/${resourceId}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'DELETE'
        }),
}
