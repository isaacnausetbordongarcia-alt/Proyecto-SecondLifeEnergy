// features/invitations/types/invitation.ts
export type InvitationStatus = 'pending' | 'used' | 'expired'

export interface Invitation {
    id: number
    email: string
    roleId: number              
    invitedBy: number           
    token?: string              
    status?: InvitationStatus
    expiresAt: string
    usedAt?: string | null
    createdAt?: string
    updatedAt?: string
}

export interface InvitationPayload {
    email: string
    roleId: number              
}

export interface AcceptInvitationPayload {
    token: string
    name: string
    password: string
}