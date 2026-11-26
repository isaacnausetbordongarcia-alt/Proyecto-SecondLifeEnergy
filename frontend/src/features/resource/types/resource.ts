export interface Resource {
    id: number
    authorId: number
    title: string
    description?: string | null
    type: string
    topic: string
    difficulty: string
    url: string
    status: string
    publishedAt: string
    createdAt?: string
}

export interface ResourcePayload {
    authorId: number
    title: string
    description?: string | null
    type: string
    topic: string
    difficulty: string
    url: string
    status: string
    publishedAt: string
}