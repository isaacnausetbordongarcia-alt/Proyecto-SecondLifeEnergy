export interface Permissions {
    id: number;
    code: string;
    description?: string | null;
}

export interface PermissionsPayload {
    code: string;
    description?: string | null;
}