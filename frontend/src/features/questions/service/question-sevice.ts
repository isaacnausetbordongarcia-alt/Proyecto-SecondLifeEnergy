import { apiFetch } from '../../../services/api'
import type { Question, QuestionPayload } from '../types/question'

export const questionService = {

    getAll: () => apiFetch<Question[]>('/questions', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getById: (id: number) => apiFetch<Question>(`/questions/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getEagerlyById: (id: number) => apiFetch<Question>(`/questions/eagerly/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: QuestionPayload) => apiFetch<Question>('/questions', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    update: (id: number, data: Partial<QuestionPayload>) => apiFetch<Question>(`/questions/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(data)
    }),

    remove: (id: number) => apiFetch<void>(`/questions/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}