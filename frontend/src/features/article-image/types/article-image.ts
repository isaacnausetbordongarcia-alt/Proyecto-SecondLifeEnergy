// features/article-image/types/article-image.ts
export interface ArticleImage {
    id: number
    articleId: number
    filename: string | null   
    url?: string                
    alt?: string | null         
    isMain?: boolean            
    position?: number           
    createdAt?: string
    updatedAt?: string
}

export interface ArticleImagePayload {
    articleId: number
    image?: File               
    alt?: string | null
    isMain?: boolean
    position?: number
}