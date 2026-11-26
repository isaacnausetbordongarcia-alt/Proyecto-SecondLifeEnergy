// features/stock-movements/services/stock-movement.service.ts
import { apiFetch } from '../../../services/api'
import type { StockMovement, StockMovementPayload } from '../types/stock-movement'

export const stockMovementService = {

    getAll: () => apiFetch<StockMovement[]>('/stock-movements', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getByArticle: (articleId: number) => apiFetch<StockMovement[]>(`/stock-movements?articleId=${articleId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: StockMovementPayload) => apiFetch<StockMovement>('/stock-movements', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    update: (id: number, data: Partial<StockMovementPayload>) => apiFetch<StockMovement>(`/stock-movements/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(data)
    }),

    remove: (id: number) => apiFetch<void>(`/stock-movements/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}