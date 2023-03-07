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

    public async findTag(search?: any): Promise<Tag[]> {
        const tags: Tag[] = await this.tagRepository.find(search)
        return tags
    }

    public async findTagById(id: string): Promise<Tag> {
        if (isEmpty(id)) throw new HttpException(400, 'tagId is empty');

        const findTag: Tag | null = await this.tagRepository.findById(id)
        if (!findTag) throw new HttpException(409, "Tag doesn't exist");

        return findTag
    }

    public async createTag(tagData: CreateTagDto): Promise<Tag> {
        if (isEmpty(tagData)) throw new HttpException(409, "tagData is empty")
        return await this.tagRepository.create(tagData)
    }

    public async updateTag(tagData: CreateTagDto, tagId: string): Promise<Tag> {
        if (isEmpty(tagData)) throw new HttpException(409, "TagData is empty");

        const updateTag: Tag | null = await this.tagRepository.update(tagId, tagData)
        if (!updateTag) throw new HttpException(409, "Tag doesn't exist")

        return updateTag;
    }

    public async deleteTag(tagId: string): Promise<void> {
        if (isEmpty(tagId)) throw new HttpException(409, "tagId is empty")
        await this.tagRepository.delete(tagId)
    }
}