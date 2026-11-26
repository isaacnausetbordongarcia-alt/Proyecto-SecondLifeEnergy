import { apiFetch } from '../../../services/api'
import type { Answer, AnswerPayload } from '../types/answer'

export const answerService = {

    getAll: () => apiFetch<Answer[]>('/answers', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getById: (id: number) => apiFetch<Answer>(`/answers/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getEagerlyById: (id: number) => apiFetch<Answer>(`/answers/eagerly/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: AnswerPayload) => apiFetch<Answer>('/answers', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    update: (id: number, data: Partial<AnswerPayload>) =>
        apiFetch<Answer>(`/answers/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify(data)
        }),

    remove: (id: number) => apiFetch<void>(`/answers/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}
