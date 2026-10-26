import { RolePermission } from "./rolePermission.model.js";

export class RolePermissionService {

    static async findAll(filters: { roleId?: number; permissionId?: number } = {}) {
        return RolePermission.findAll({
            where: {
                ...(filters.roleId !== undefined && { roleId: filters.roleId }),
                ...(filters.permissionId !== undefined && { permissionId: filters.permissionId }),
            },
            order: [["roleId", "ASC"], ["permissionId", "ASC"]],
        });
    }

    static async findByIds(roleId: number, permissionId: number) {
        return RolePermission.findOne({ where: { roleId, permissionId } });
    }

    static async create(data: {
        roleId: number;
        permissionId: number;
    }) {
        return RolePermission.create(data);
    }

    static async delete(rolePermission: RolePermission) {
        await rolePermission.destroy();
    }
}
