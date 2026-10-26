import { UserRole } from "./userRole.model.js";

export class UserRoleService {

    static async findAll(filters: { userId?: number; roleId?: number } = {}) {
        return UserRole.findAll({
            where: {
                ...(filters.userId !== undefined && { userId: filters.userId }),
                ...(filters.roleId !== undefined && { roleId: filters.roleId }),
            },
            order: [["userId", "ASC"], ["roleId", "ASC"]],
        });
    }

    static async findByIds(userId: number, roleId: number) {
        return UserRole.findOne({ where: { userId, roleId } });
    }

    static async create(data: {
        userId: number;
        roleId: number;
        assignedAt?: Date;
    }) {
        return UserRole.create(data);
    }

    
    static async update(
        userRole: UserRole,
        data: { assignedAt: Date }
    ) {
        return userRole.update(data);
    }

    static async delete(userRole: UserRole) {
        await userRole.destroy();
    }
}
