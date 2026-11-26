export interface RequestItem {
    id: number
    requestId: number
    articleId: number
    quantity: number            // máx. 1 por kit y 10 por componente
}

export interface RequestItemPayload {
    requestId: number
    articleId: number
    quantity: number
}