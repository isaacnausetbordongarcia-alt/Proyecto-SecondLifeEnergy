import { Request, Response, NextFunction } from "express";
import { InvitationService } from "./invitation.service.js";

export class InvitationController {

    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const invitations = await InvitationService.findAll();

            res.json(invitations);
        } catch (error) {
            next(error);
        }
    }


    static async getById(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);

            const invitation = await InvitationService.findById(id);

            if (!invitation) {
                res.status(404).json({
                    message: "Invitation not found",
                });

                return;
            }

            res.json(invitation);

        } catch (error) {
            next(error);
        }
    }


    static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { invitedById, roleId, email, expiresAt } = req.body;

            if (!invitedById || !roleId || !email) {
                res.status(400).json({
                    message: "invitedById, roleId y email son obligatorios",
                });

                return;
            }

            const invitation = await InvitationService.create({
                invitedById,
                roleId,
                email,
                expiresAt: expiresAt ? new Date(expiresAt) : undefined,
            });

            res.status(201).json(invitation);

        } catch (error) {
            next(error);
        }
    }


    static async update(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);

            const invitation = await InvitationService.findById(id);

            if (!invitation) {
                res.status(404).json({
                    message: "Invitation not found",
                });

                return;
            }

            const { roleId, email, expiresAt, usedAt } = req.body;

            const updatedInvitation = await InvitationService.update(
                invitation,
                {
                    roleId,
                    email,
                    expiresAt: expiresAt ? new Date(expiresAt) : undefined,
                    usedAt: usedAt === null ? null : usedAt ? new Date(usedAt) : undefined,
                }
            );

            res.json(updatedInvitation);

        } catch (error) {
            next(error);
        }
    }


    static async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);

            const invitation = await InvitationService.findById(id);

            if (!invitation) {
                res.status(404).json({
                    message: "Invitation not found",
                });

                return;
            }

            await InvitationService.delete(invitation);

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }
}
