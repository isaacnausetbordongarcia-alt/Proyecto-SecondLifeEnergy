import { apiFetch } from '../../../services/api'
import type { Simulations, SimulationsPayload } from '../types/simulations'

export const simulationService = {

    getAll: () => apiFetch<Simulations[]>('/simulations', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getById: (id: number) => apiFetch<Simulations>(`/simulations/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: SimulationsPayload) => apiFetch<Simulations>('/simulations', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    update: (id: number, data: Partial<SimulationsPayload>) => apiFetch<Simulations>(`/simulations/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(data)
    }),

    remove: (id: number) => apiFetch<void>(`/simulations/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}