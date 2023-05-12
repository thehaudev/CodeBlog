const mongoose = require("mongoose");
const { Schema } = mongoose;
import { ObjectId } from "mongodb";

const commentSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
      min: 6,
      max: 255,
      ref: "user",
    },
    postId: {
      type: ObjectId,
      require: true,
      min: 6,
      max: 255,
      ref: "post",
    },
    content: {
      type: String,
      required: true,
      min: 15,
    },
    status: { type: Boolean, default: true },

    inReplyToComment: {
      type: ObjectId,
      default: null,
    },
    inReplyToUser: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
  { collection: "comment" }
);

// commentSchema.set('toObject', { virtuals: true });
// commentSchema.set('toJSON', { virtuals: true });
// commentSchema.virtual("user", {
//     ref: "user",
//     localField: "userId",
//     foreignField: "_id",
//     justOne: true

// });

export const CommentModel = mongoose.model("comment", commentSchema);
