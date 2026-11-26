export interface Article {
    id: number
    categoryId: number
    createdById: number         // quién lo creó
    name: string
    description?: string | null
    type: string                // kit o componente
    specifications?: string | null
    stock: number
    status: string
    createdAt?: string
    updatedAt?: string
}

// createdById lo asigna el backend a partir del token
export interface ArticlePayload {
    categoryId: number
    name: string
    description?: string | null
    type: string
    specifications?: string | null
    stock: number
    status: string
}