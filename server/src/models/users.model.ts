const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    role: {
      type: String,
      default: 0, //0 user 1 admin
    },
    display_name: {
      type: String,
      required: true,
      max: 255,
    },
    bio: {
      type: String,
      enum: ["Male", "Female"],
    },
    avatar: {
      type: String,
      default: "default/default.png",
    },
    location: String,
    about: String,
  },
  {
    timestamps: true,
  },
  {
    toObject: {
      transform: function (doc: any, ret: any) {},
    },
    toJSON: {
      transform: function (doc: any, ret: any) {
        delete ret.password;
      },
    },
  },
  {
    collection: "user",
  }
);
export const UserModel = mongoose.model("user", userSchema);

UserModel.update({ email: "admin@gmail.com" }, { role: 1 });
