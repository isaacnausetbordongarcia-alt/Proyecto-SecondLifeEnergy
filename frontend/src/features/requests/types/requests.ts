export interface Requests {
    id: number;
    reference: string;
    contactName: string;
    contactEmail: string;
    notes?: string | null;
    status?: string;
}

export interface RequestsPayload {
    reference: string;
    contactName: string;
    contactEmail: string;
    notes?: string | null;
    status?: string;
}