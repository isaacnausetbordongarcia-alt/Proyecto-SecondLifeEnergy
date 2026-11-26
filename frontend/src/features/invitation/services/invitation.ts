// features/invitations/services/invitation.service.ts
import { apiFetch } from '../../../services/api'
import type { Invitation, InvitationPayload, AcceptInvitationPayload } from '../types/invitation'

export const invitationService = {

    getAll: () => apiFetch<Invitation[]>('/invitations', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: InvitationPayload) => apiFetch<Invitation>('/invitations', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    update: (id: number, data: Partial<InvitationPayload>) => apiFetch<Invitation>(`/invitations/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(data)
    }),

    remove: (id: number) => apiFetch<void>(`/invitations/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),


    getByToken: (token: string) => apiFetch<Invitation>(`/invitations/token/${token}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),


    accept: (data: AcceptInvitationPayload) => apiFetch<void>('/invitations/accept', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),
}