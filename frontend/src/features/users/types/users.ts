export interface Users {
    id: number;
    name: string;
    email: string;
    isActive?: boolean;
}

export interface UsersPayload {
    name: string;
    email: string;
    passwordHash?: string;
    isActive?: boolean;
}