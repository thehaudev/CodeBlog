import { Schema } from "mongoose";

export interface ViewsPost {
  _id: Schema.Types.ObjectId;
  postId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId | null;
}
