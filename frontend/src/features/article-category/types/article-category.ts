export interface ArticleCategory {
    id: number
    name: string
    description: string | null
    parentCategoryId: number | null
}

export interface ArticleCategoryPayload {
    name: string
    description?: string | null
    parentCategoryId?: number | null
}
