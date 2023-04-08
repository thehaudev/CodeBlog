import CreateTagDto from "../dtos/tag.dto";
import { HttpException } from "../exceptions/HttpException";
import { Tag } from "../interfaces/tag.interface";
import TagRepository from "../repositories/tag.repository";
import { isEmpty } from "../utils/validator.util";


export default class TagService {
    private readonly tagRepository: TagRepository

    constructor() {
        this.tagRepository = new TagRepository()
    }

    public async findTag(): Promise<Tag[]> {
        const tags: Tag[] = await this.tagRepository.find()
        return tags
    }
    public async findAndSortTag(filter:any):Promise<{tags:Tag[],total:Number}>{

        const tags: Tag[]  = await this.tagRepository.findAndSortTags(filter.skip,filter.take,filter.search)
        const total: Number = await this.tagRepository.count(filter.search)
        return {tags,total}
    }
    public async findTagById(id: string): Promise<Tag> {
        if (isEmpty(id)) throw new HttpException(400, 'tagId is empty');

        const findTag: Tag | null = await this.tagRepository.findById(id)
        if (!findTag) throw new HttpException(409, "Tag doesn't exist");

        return findTag
    }

    public async createTag(tagData: CreateTagDto): Promise<Tag> {
        if (isEmpty(tagData)) throw new HttpException(400, "tagData is empty")
        return await this.tagRepository.create(tagData)
    }

    public async updateTag(tagData: CreateTagDto, tagId: string): Promise<Tag> {
        if (isEmpty(tagData)) throw new HttpException(400, "TagData is empty");

        const updateTag: Tag | null = await this.tagRepository.update(tagId, tagData)
        if (!updateTag) throw new HttpException(409, "Tag doesn't exist")

        return updateTag;
    }

    public async deleteTag(tagId: string): Promise<void> {
        if (isEmpty(tagId)) throw new HttpException(400, "tagId is empty")
        await this.tagRepository.delete(tagId)
    }
}