import { Follow_User } from "../interfaces/follow_user.interface";
import { FollowUserModel } from "../models/follow_user.model";
import BaseRepository from "./base.repository";

export default class Follow_UserRepository extends BaseRepository<Follow_User>{
    constructor() {
        super(FollowUserModel)
    }
}