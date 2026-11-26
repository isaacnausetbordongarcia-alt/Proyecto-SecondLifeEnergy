export interface Question {
    id: number
    categoryId: number
    authorId: number
    acceptedAnswerId: number | null
    title: string
    content: string
    status: string
    createdAt?: string
}

export interface QuestionPayload {
    categoryId: number
    authorId: number
    acceptedAnswerId?: number | null
    title: string
    content: string
    status: string
}