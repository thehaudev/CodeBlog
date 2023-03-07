import { HttpException } from "../exceptions/HttpException";
import { Follow_Tag } from "../interfaces/follow_tag.interface";
import { TagModel } from "../models/tags.model";
import Follow_TagRepository from "../repositories/follow_tag.repository";
import { isEmpty } from "../utils/validator.util";


export default class Follow_TagService {
    private readonly tags = TagModel
    private readonly follow_tagRepository: Follow_TagRepository
    constructor() {
        this.follow_tagRepository = new Follow_TagRepository()
    }

    public async createFollowTag(data: any): Promise<Follow_Tag> {
        if (isEmpty(data)) throw new HttpException(409, "data is empty")

        const checkTagId = await this.tags.findById(data.tagId)
        if (!checkTagId) throw new HttpException(409, "tag doesn't exist")

        const checkFollow = await this.follow_tagRepository.findOne({ tagId: data.tagId, follower: data.follower })
        if (checkFollow) throw new HttpException(409, "follow does exist")

        const createFollowTag = await this.follow_tagRepository.create(data)
        return createFollowTag
    }

    public async deleteFollowTag(data: any): Promise<void> {
        if (isEmpty(data)) throw new HttpException(409, "data is empty")

        const checkFollow = await this.follow_tagRepository.findOne({ tagId: data.tagId, follower: data.follower })
        if (!checkFollow) throw new HttpException(409, "follow doesn't exist")

        await this.follow_tagRepository.delete(checkFollow._id + "")
    }


}