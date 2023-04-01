import { Schema } from "mongoose"

export interface Vote_comment {
    _id: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    commentId: Schema.Types.ObjectId,
    type: string
}