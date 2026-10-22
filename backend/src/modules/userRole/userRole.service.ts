import { UserRole } from "../userRole/userRole.model.js";

export class UserRoleService {

    static async findAll() {
        return UserRole.findAll({
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return UserRole.findByPk(id);
    }

    static async create(data: {
        userId: number;
        roleId: number;
    }) {
        return UserRole.create(data);
    }

    static async update(
        userRole: UserRole,
        data: {
            userId: number;
            roleId: number;
        }
    ) {
        return userRole.update(data);
    }


    static async delete(userRole: UserRole) {
        await userRole.destroy();
    }
}