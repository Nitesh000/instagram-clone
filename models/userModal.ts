import { Schema, model, models } from "mongoose";
import { UserModelType } from "@/types";

const userSchema = new Schema<UserModelType>({
  fullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  emailOrPhone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    defualt: "",
  },
});

const User = models.User || model<UserModelType>("User", userSchema);

export default User;
