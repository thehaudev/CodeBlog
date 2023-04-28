const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      min: 6,
      max: 255,
      ref: "user",
    },
    title: {
      type: String,
      required: true,
      min: 15,
    },
    content: {
      type: String,
      required: true,
      min: 15,
    },
    status: {
      type: Boolean,
      default: true,
    },
    coverImageUrl: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
postSchema.index({ title: "text", contents: "text" });
postSchema.set("toObject", { virtuals: true });
postSchema.set("toJSON", { virtuals: true });
postSchema.virtual("tags", {
  ref: "post_tag",
  localField: "_id",
  foreignField: "postId",
});
postSchema.virtual("user", {
  ref: "user",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

export const PostModel = mongoose.model("post", postSchema);
