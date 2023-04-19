const mongoose = require("mongoose");

const viewPostSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
    },
  }
);

export const ViewPostModel = mongoose.model("view_post", viewPostSchema);
