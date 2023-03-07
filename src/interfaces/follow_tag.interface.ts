import { Schema } from "mongoose";


export interface Follow_Tag {
    _id: Schema.Types.ObjectId
    tagId: Schema.Types.ObjectId
    follower: Schema.Types.ObjectId
}