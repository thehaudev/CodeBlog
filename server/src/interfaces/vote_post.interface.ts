import { Schema } from "mongoose"

export interface Vote_post {
    _id: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    postId: Schema.Types.ObjectId,
    type: string
}