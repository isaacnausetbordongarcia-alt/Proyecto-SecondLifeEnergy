export interface ArticleReview {
    id: number
    articleId: number
    reviewerId: number
    decision: string
    comments: string | null
    createdAt?: string
}

export interface ArticleReviewPayload {
    articleId: number
    reviewerId: number
    decision: string
    comments?: string | null
}
