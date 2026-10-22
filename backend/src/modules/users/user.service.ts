import { User } from "./user.model.js";

export class UserService {

    static async findAll() {
        return User.findAll({
            attributes: { exclude: ["passwordHash"] },
            order: [["id", "ASC"]],
        });
    }


    static async findById(id: number) {
        return User.findByPk(id, {
            attributes: { exclude: ["passwordHash"] },
        });
    }


    static async create(data: {
        name: string;
        email: string;
        passwordHash: string;
        isActive?: boolean;
    }) {
        return User.create(data);
    }


    static async update(
        user: User,
        data: {
            name?: string;
            email?: string;
            passwordHash?: string;
            isActive?: boolean;
        }
    ) {
        return user.update(data);
    }


    static async delete(user: User) {
        await user.destroy();
    }
}