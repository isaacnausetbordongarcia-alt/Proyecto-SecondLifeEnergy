import { ArticleResource } from "./ArticleResource.model.js";
import { Resource } from "../Resource/Resource.model.js";

export class ArticleResourceService {
    static async getResourcesByArticle(articleId: number): Promise<Resource[]> {
        const links = await ArticleResource.findAll({ where: { articleId } });
        const resourceIds = links.map((l) => l.resourceId);
        if (resourceIds.length === 0) return [];

        return Resource.findAll({ where: { id: resourceIds } });
    }

    static async getArticleIdsByResource(resourceId: number): Promise<number[]> {
        const links = await ArticleResource.findAll({ where: { resourceId } });
        return links.map((l) => l.articleId);
    }

    static async exists(articleId: number, resourceId: number): Promise<boolean> {
        const link = await ArticleResource.findOne({ where: { articleId, resourceId } });
        return link !== null;
    }

    static async link(articleId: number, resourceId: number): Promise<ArticleResource> {
        return ArticleResource.create({ articleId, resourceId });
    }

    static async unlink(articleId: number, resourceId: number): Promise<boolean> {
        const deleted = await ArticleResource.destroy({ where: { articleId, resourceId } });
        return deleted > 0;
    }
}