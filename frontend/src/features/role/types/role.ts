export interface Role {
    id: number;
    name: string;
    description?: string | null;
}

export interface RolePayload {
    name: string;
    description?: string | null;
}