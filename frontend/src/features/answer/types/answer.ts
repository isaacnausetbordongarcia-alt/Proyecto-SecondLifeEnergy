export interface Answer {
    id: number
    questionId: number
    authorId: number
    content: string
    status: string
    createdAt?: string
}

export interface AnswerPayload {
    questionId: number
    authorId: number
    content: string
    status: string
}
