export interface Moderation {
    id: number
    moderatorId: number
    questionId: number | null
    answerId: number | null
    action: string
    reason: string | null
    createdAt?: string
}

export interface ModerationPayload {
    moderatorId: number
    questionId?: number | null
    answerId?: number | null
    action: string
    reason?: string | null
}
