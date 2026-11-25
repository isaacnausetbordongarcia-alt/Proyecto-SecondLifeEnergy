import { Request, Response, NextFunction } from "express";
import { ArticleService } from "./article.service.js";

// Devuelve los nombres de los roles del usuario (ej: ["admin", "docente"]).
// user.getRoles() existe gracias a la asociación "roles" de associations.ts.
// Si no hay usuario (petición sin token), devuelve una lista vacía.
async function getRoleNames(user: any): Promise<string[]> {
    if (!user) return [];
    const roles = await user.getRoles();
    return roles.map((role: { name: string }) => role.name);
}

export class ArticleController {

    // GET /articles
    // Lista los artículos. Los borradores solo los ven admin y docente.
    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            // bearerAuth guarda el usuario del token en res.locals.authUser
            const user = res.locals.authUser?.user;
            const roleNames = await getRoleNames(user);

            // true solo si es admin o docente; para el resto se ocultan los "draft"
            const includeDrafts =
                roleNames.includes("admin") || roleNames.includes("docente");

            const articles = await ArticleService.findAll(includeDrafts);

            res.json(articles);
        } catch (error) {
            // Cualquier error inesperado pasa al middleware de errores
            next(error);
        }
    }


    // GET /articles/:id
    // Devuelve un artículo por su id.
    static async getById(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);

            const article = await ArticleService.findById(id);

            // Si no existe, 404
            if (!article) {
                res.status(404).json({
                    message: "Article not found",
                });

                return;
            }

            res.json(article);

        } catch (error) {
            next(error);
        }
    }


    // POST /articles
    // Crea un artículo. El autor (createdById) NO viene del body:
    // se saca del token para que nadie pueda crear artículos a nombre de otro.
    static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const {
                categoryId,
                name,
                description,
                type,
                specifications,
                stock,
                status,
            } = req.body;

            // Validamos los campos obligatorios (description es opcional).
            // stock se compara con undefined porque 0 es un valor válido.
            if (
                !categoryId ||
                !name ||
                !type ||
                !specifications ||
                stock === undefined ||
                !status
            ) {
                res.status(400).json({
                    message:
                        "categoryId, name, type, specifications, stock and status are required",
                });

                return;
            }

            // Usuario autenticado (lo dejó bearerAuth)
            const { user } = res.locals.authUser;

            const article = await ArticleService.create({
                categoryId,
                createdById: user.id, // el autor es quien hace la petición
                name,
                description,
                type,
                specifications,
                stock,
                status,
            });

            res.status(201).json(article);

        } catch (error) {
            next(error);
        }
    }


    // PUT /articles/:id
    // Actualiza un artículo. Solo admin, docente o el autor pueden hacerlo.
    static async update(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);

            const article = await ArticleService.findById(id);

            if (!article) {
                res.status(404).json({
                    message: "Article not found",
                });

                return;
            }

            const { user } = res.locals.authUser;
            const roleNames = await getRoleNames(user);

            // Comprobación de autoría: el permiso "article:update" solo dice
            // que puede editar artículos, pero no distingue de quién son.
            // Si no es admin/docente y no es el autor, 403.
            if (!ArticleService.canModify(article, user.id, roleNames)) {
                res.status(403).json({
                    message: "Forbidden",
                });

                return;
            }

            // createdById no se puede cambiar al actualizar
            const {
                categoryId,
                name,
                description,
                type,
                specifications,
                stock,
                status,
            } = req.body;

            const updatedArticle = await ArticleService.update(article, {
                categoryId,
                name,
                description,
                type,
                specifications,
                stock,
                status,
            });

            res.json(updatedArticle);

        } catch (error) {
            next(error);
        }
    }


    // DELETE /articles/:id
    // Elimina un artículo. Misma regla de autoría que en update.
    static async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);

            const article = await ArticleService.findById(id);

            if (!article) {
                res.status(404).json({
                    message: "Article not found",
                });

                return;
            }

            const { user } = res.locals.authUser;
            const roleNames = await getRoleNames(user);

            if (!ArticleService.canModify(article, user.id, roleNames)) {
                res.status(403).json({
                    message: "Forbidden",
                });

                return;
            }

            await ArticleService.delete(article);

            // 204: borrado correcto, sin contenido que devolver
            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }
}