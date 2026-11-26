export interface AuditLog {
    id: number
    userId: number
    entity: string                                  // tabla afectada
    entityId: number
    action: string
    previousValues?: Record<string, unknown> | null
    newValues?: Record<string, unknown> | null
    createdAt?: string
}