import { Request, Response, NextFunction } from "express";
import { RequestService } from "./request.service.js";

export class RequestController {

    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const requests = await RequestService.findAll();

            res.json(requests);
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

            const contactRequest = await RequestService.findById(id);

            if (!contactRequest) {
                res.status(404).json({
                    message: "Request not found",
                });

                return;
            }

            res.json(contactRequest);

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
            const { reference, contactName, contactEmail, notes, status } = req.body;

            if (!reference || !contactName || !contactEmail) {
                res.status(400).json({
                    message: "Reference, contactName y contactEmail son obligatorios",
                });

                return;
            }

            const contactRequest = await RequestService.create({
                reference,
                contactName,
                contactEmail,
                notes,
                status,
            });

            res.status(201).json(contactRequest);

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

            const contactRequest = await RequestService.findById(id);

            if (!contactRequest) {
                res.status(404).json({
                    message: "Request not found",
                });

                return;
            }

            const updatedRequest = await RequestService.update(
                contactRequest,
                req.body
            );

            res.json(updatedRequest);

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

            const contactRequest = await RequestService.findById(id);

            if (!contactRequest) {
                res.status(404).json({
                    message: "Request not found",
                });

                return;
            }

            await RequestService.delete(contactRequest);

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }
}