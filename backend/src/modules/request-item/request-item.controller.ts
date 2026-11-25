import { Request, Response, NextFunction } from "express";
import { RequestItemService } from "./request-item.service.js";
import { RequestService } from "../requests/request.service.js";
import { ArticleService } from "../articles/article.service.js";
import { getRoleNames } from "../utils/roles.js";

// Carga la request padre y comprueba que el usuario puede acceder a ella.
// Si no existe responde 404 y si no tiene permiso 403; en ambos casos
// devuelve null para que el controller haga return.
async function getAccessibleRequest(requestId: number, res: Response) {
    const contactRequest = await RequestService.findById(requestId);

    if (!contactRequest) {
        res.status(404).json({
            message: "Request not found",
        });

        return null;
    }

    // bearerAuth guarda el usuario del token en res.locals.authUser
    const { user } = res.locals.authUser;
    const roleNames = await getRoleNames(user);

    if (!RequestItemService.canAccess(contactRequest, user.id, roleNames)) {
        res.status(403).json({
            message: "Forbidden",
        });

        return null;
    }

    return contactRequest;
}

export class RequestItemController {

    // GET /request-items
    // Admin ve todos; el resto solo los items de sus requests.
    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { user } = res.locals.authUser;
            const roleNames = await getRoleNames(user);

            const requestItems = roleNames.includes("admin")
                ? await RequestItemService.findAll()
                : await RequestItemService.findAll(user.id);

            res.json(requestItems);
        } catch (error) {
            next(error);
        }
    }


    // GET /requests/:requestId/items
    static async getByRequestId(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const requestId = Number(req.params.requestId);

            // 404 si no existe, 403 si no es admin ni autor de la request
            const contactRequest = await getAccessibleRequest(requestId, res);

            if (!contactRequest) return;

            const requestItems = await RequestItemService.findByRequestId(
                requestId
            );

            res.json(requestItems);

        } catch (error) {
            next(error);
        }
    }


    // GET /request-items/:id
    static async getById(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);

            const requestItem = await RequestItemService.findById(id);

            if (!requestItem) {
                res.status(404).json({
                    message: "Request item not found",
                });

                return;
            }

            // La autoría se comprueba sobre la request a la que pertenece
            const contactRequest = await getAccessibleRequest(
                requestItem.requestId,
                res
            );

            if (!contactRequest) return;

            res.json(requestItem);

        } catch (error) {
            next(error);
        }
    }


    // POST /request-items
    // Solo se pueden añadir items a una request propia (o ser admin).
    static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { requestId, articleId, quantity } = req.body;

            if (!requestId || !articleId || !quantity) {
                res.status(400).json({
                    message: "requestId, articleId and quantity are required",
                });

                return;
            }

            if (!Number.isInteger(quantity) || quantity < 1) {
                res.status(400).json({
                    message: "quantity must be a positive integer",
                });

                return;
            }

            const contactRequest = await getAccessibleRequest(requestId, res);

            if (!contactRequest) return;

            const article = await ArticleService.findById(articleId);

            if (!article) {
                res.status(404).json({
                    message: "Article not found",
                });

                return;
            }

            const requestItem = await RequestItemService.create({
                requestId,
                articleId,
                quantity,
            });

            res.status(201).json(requestItem);

        } catch (error) {
            next(error);
        }
    }


    // PUT /request-items/:id
    // requestId no se puede cambiar: un item no se mueve a otra request.
    static async update(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);

            const requestItem = await RequestItemService.findById(id);

            if (!requestItem) {
                res.status(404).json({
                    message: "Request item not found",
                });

                return;
            }

            const contactRequest = await getAccessibleRequest(
                requestItem.requestId,
                res
            );

            if (!contactRequest) return;

            const { articleId, quantity } = req.body;

            if (
                quantity !== undefined &&
                (!Number.isInteger(quantity) || quantity < 1)
            ) {
                res.status(400).json({
                    message: "quantity must be a positive integer",
                });

                return;
            }

            if (articleId !== undefined) {
                const article = await ArticleService.findById(articleId);

                if (!article) {
                    res.status(404).json({
                        message: "Article not found",
                    });

                    return;
                }
            }

            const updatedRequestItem = await RequestItemService.update(
                requestItem,
                {
                    articleId,
                    quantity,
                }
            );

            res.json(updatedRequestItem);

        } catch (error) {
            next(error);
        }
    }


    // DELETE /request-items/:id
    // Misma regla de autoría que en update.
    static async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);

            const requestItem = await RequestItemService.findById(id);

            if (!requestItem) {
                res.status(404).json({
                    message: "Request item not found",
                });

                return;
            }

            const contactRequest = await getAccessibleRequest(
                requestItem.requestId,
                res
            );

            if (!contactRequest) return;

            await RequestItemService.delete(requestItem);

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }
}