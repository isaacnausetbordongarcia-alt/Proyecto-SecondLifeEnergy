export interface ForumCategory {
    id: number;
    name: string;
    description?: string | null;
}

export interface ForumCategoryPayload {
    name: string;
    description?: string | null;
}