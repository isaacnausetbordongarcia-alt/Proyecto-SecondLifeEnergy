// features/kit-components/types/kit-component.ts
export interface KitComponent {
    id: number
    kitId: number          
    componentId: number    
    quantity: number
    createdAt?: string
    updatedAt?: string
}

export interface KitComponentPayload {
    kitId: number
    componentId: number
    quantity: number
}