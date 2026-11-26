export interface Simulations {
    id: number;
    title: string;
    description?: string | null;
    platform: string;
    url: string;
    objectives: string;
    materials?: string | null;
}

export interface SimulationsPayload {
    title: string;
    description?: string | null;
    platform: string;
    url: string;
    objectives: string;
    materials?: string | null;
}