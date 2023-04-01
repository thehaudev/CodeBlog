import { ImagePost } from "../interfaces/imagesPost.interface";
import { ImageModel } from "../models/imagesPost.model";
import BaseRepository from "./base.repository";

export default class ImagesPostRepository extends BaseRepository<ImagePost>{
    constructor() {
        super(ImageModel);
    }
}