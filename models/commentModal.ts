import { CommentModelType } from "@/types";
import { Schema, model, models } from "mongoose";

const commentModal = new Schema<CommentModelType>(
  {
    desc: {
      type: String,
      required: true,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    replies: {
      type: [Schema.Types.ObjectId],
      ref: "Comment",
    },
  },
  {
    timestamps: true,
  },
);

const Comment =
  models.Comment || model<CommentModelType>("Comment", commentModal);

export default Comment;
