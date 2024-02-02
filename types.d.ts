import mongoose from "mongoose";

export interface FormType {
  email: string;
  password: string;
}

export interface UserModelType {
  fullName: string;
  userName: string;
  emailOrPhone: string;
  password: string;
  profilePicture?: string;
}

export interface ErrorType {
  message: string | null;
  status: number | null;
  isError: boolean;
}

export interface PostModelType {
  title: string;
  description: string;
  image: mongoose.Schema.Types.ObjectId[];
  likes: mongoose.Schema.Types.ObjectId[];
  comments: mongoose.Schema.Types.ObjectId[];
}

export interface CommentModelType {
  desc: string;
  likes: mongoose.Schema.Types.ObjectId[];
  replies: mongoose.Schema.Types.ObjectId[];
}
