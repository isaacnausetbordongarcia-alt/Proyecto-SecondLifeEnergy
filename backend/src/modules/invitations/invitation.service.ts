import { createHash, randomBytes } from "node:crypto";
import { Invitation } from "./invitation.model.js";

const DEFAULT_EXPIRATION_DAYS = 7;

// El hash nunca se devuelve en las consultas
const publicAttributes = { exclude: ["tokenHash"] };

export class InvitationService {

    static hashToken(token: string) {
        return createHash("sha256").update(token).digest("hex");
    }


    static async findAll() {
        return Invitation.findAll({
            attributes: publicAttributes,
            order: [["id", "ASC"]],
        });
    }


    static async findById(id: number) {
        return Invitation.findByPk(id, {
            attributes: publicAttributes,
        });
    }


    static async findByToken(token: string) {
        return Invitation.findOne({
            where: { tokenHash: InvitationService.hashToken(token) },
        });
    }


    static async create(data: {
        invitedById: number;
        roleId: number;
        email: string;
        expiresAt?: Date;
    }) {
        
        const token = randomBytes(32).toString("hex");

        const expiresAt =
            data.expiresAt ??
            new Date(Date.now() + DEFAULT_EXPIRATION_DAYS * 24 * 60 * 60 * 1000);

        const invitation = await Invitation.create({
            invitedById: data.invitedById,
            roleId: data.roleId,
            email: data.email,
            expiresAt,
            tokenHash: InvitationService.hashToken(token),
        });

        const { tokenHash, ...publicData } = invitation.toJSON();

        return { ...publicData, token };
    }


    static async update(
        invitation: Invitation,
        data: {
            roleId?: number;
            email?: string;
            expiresAt?: Date;
            usedAt?: Date | null;
        }
    ) {
        const values = Object.fromEntries(
            Object.entries(data).filter(([, value]) => value !== undefined)
        );

        await invitation.update(values);

        return InvitationService.findById(invitation.id);
    }


    static async delete(invitation: Invitation) {
        await invitation.destroy();
    }
}
