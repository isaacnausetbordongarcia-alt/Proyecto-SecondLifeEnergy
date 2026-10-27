import { ResourceTag } from "./ResourceTag.model.js";
import { Resource } from "../Resource/Resource.model.js";
import { Tag } from "../tags/tag.model.js";

export class ResourceTagService {
    static async getTagsByResource(resourceId: number): Promise<Tag[]> {
        const links = await ResourceTag.findAll({ where: { resourceId } });
        const tagIds = links.map((l) => l.tagId);
        if (tagIds.length === 0) return [];

        return Tag.findAll({ where: { id: tagIds } });
    }

    static async getResourcesByTag(tagId: number): Promise<Resource[]> {
        const links = await ResourceTag.findAll({ where: { tagId } });
        const resourceIds = links.map((l) => l.resourceId);
        if (resourceIds.length === 0) return [];

        return Resource.findAll({
            where: { id: resourceIds },
            order: [["publishedAt", "DESC"]],
        });
    }

    static async exists(resourceId: number, tagId: number): Promise<boolean> {
        const link = await ResourceTag.findOne({ where: { resourceId, tagId } });
        return link !== null;
    }

    static async link(resourceId: number, tagId: number): Promise<ResourceTag> {
        return ResourceTag.create({ resourceId, tagId });
    }

    static async unlink(resourceId: number, tagId: number): Promise<boolean> {
        const deleted = await ResourceTag.destroy({ where: { resourceId, tagId } });
        return deleted > 0;
    }
}