// features/simulation-articles/services/simulation-article.service.ts
import { apiFetch } from '../../../services/api'
import type { SimulationArticle, SimulationArticlePayload } from '../types/simulation-article'

export const simulationArticleService = {

    getAll: () => apiFetch<SimulationArticle[]>('/simulation-articles', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getBySimulation: (simulationId: number) => apiFetch<SimulationArticle[]>(`/simulation-articles?simulationId=${simulationId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: SimulationArticlePayload) => apiFetch<SimulationArticle>('/simulation-articles', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    // clave compuesta (simulationId + articleId): no hay update, solo asignar o quitar
    remove: (simulationId: number, articleId: number) => apiFetch<void>(`/simulation-articles/${simulationId}/${articleId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}