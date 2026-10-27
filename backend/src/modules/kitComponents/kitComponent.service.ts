import { KitComponent } from "./kitComponent.model.js";

export class KitComponentService {

    static async findAll(filters: { kitId?: number; componentId?: number } = {}) {
        return KitComponent.findAll({
            where: {
                ...(filters.kitId !== undefined && { kitId: filters.kitId }),
                ...(filters.componentId !== undefined && { componentId: filters.componentId }),
            },
            order: [["kitId", "ASC"], ["componentId", "ASC"]],
        });
    }

    static async findByIds(kitId: number, componentId: number) {
        return KitComponent.findOne({ where: { kitId, componentId } });
    }

    static async create(data: {
        kitId: number;
        componentId: number;
        quantity: number;
    }) {
        return KitComponent.create(data);
    }

    
    static async update(
        kitComponent: KitComponent,
        data: { quantity: number }
    ) {
        return kitComponent.update(data);
    }

    static async delete(kitComponent: KitComponent) {
        await kitComponent.destroy();
    }
}
