// features/stock-movements/types/stock-movement.ts
export type StockMovementType = 'in' | 'out' | 'adjustment'

export interface StockMovement {
    id: number
    articleId: number
    type: StockMovementType     // entrada, salida o ajuste manual
    quantity: number
    reason?: string | null      // motivo (donación, solicitud, corrección…)
    userId?: number             // quién lo registró
    createdAt?: string
    updatedAt?: string
}

export interface StockMovementPayload {
    articleId: number
    type: StockMovementType
    quantity: number
    reason?: string | null
}