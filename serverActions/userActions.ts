"use server";
import { UserModelType, FormType, PostModelType } from "@/types";
import User from "@/models/userModal";
import { checkHash, generateHash } from "@/utils/hashing";
import { cookies } from "next/headers";
import Post from "@/models/postModal";

/**
 * Takes a user data and attempt to store in the database
 * if successful then returns a success message
 * else returns an error message
 *
 * @param {UserModelType} data
 * @return Promise<{}>
 */
export async function createUser(data: UserModelType) {
  try {
    const hash = await generateHash(data.password);
    const user = await User.create({ ...data, password: hash });
    console.log("==> user created", user);
    return { status: 201, message: "User created successfully" };
  } catch (err) {
    console.log(err);
    return { message: "Failed to create User", status: 500 };
  }
}

/**
 * Takes a user data and attempt to find in the database
 * if successful then returns a success message
 * else returns an error message
 *
 *  @param {FormType} data
 *  @return Promise<{}>
 */
export async function loginUser(data: FormType) {
  try {
    // exclude the password from the query
    const user =
      (await User.findOne({ emailOrPhone: data.email })) ||
      (await User.findOne({ userName: data.email }));
    // unhash the password
    const result = await checkHash(data.password, user.password);
    if (result) {
      const id = user._id.toString();
      const cookieData = {
        id,
        emailOrPhone: user.emailOrPhone,
        userName: user.userName,
      };
      cookies().set("user", JSON.stringify(cookieData), { httpOnly: true });
      return {
        status: 200,
        message: "User logged in successfully",
        id,
      };
    } else {
      return { message: "Invalid credentials!", status: 401 };
    }
  } catch (err) {
    console.log(err);
    return { message: "Use not found!", status: 404 };
  }
}

/**
 * Takes a user data and attempt to create in the database
 *
 * @param {PostModelType} data
 * @return Promise<{}>
 * */
export async function createPost(data: PostModelType) {
  try {
    const post = await Post.create(data);
    console.log("==> post created", post);
    return { status: 201, message: "Post created successfully" };
  } catch (err) {
    return { message: "Failed to create Post", status: 500 };
  }
}

/**
 * If the user has likes then remove the like else vice-versa
 *
 * @param {string} postId
 * @param {string} userId
 */
export async function likeAPost(postId: string, userId: string) {
  const isAlreadyLiked = await Post.findById<PostModelType>(postId)
    .select("likes")
    .lean()
    .exec()
    .then((post) => {
      if (post?.likes?.includes(userId)) {
        return true;
      } else {
        return false;
      }
    })
    .catch((_err) => {
      return false;
    });

  try {
    if (isAlreadyLiked) {
      await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } }).exec();
    } else {
      await Post.findByIdAndUpdate(postId, { $push: { likes: userId } }).exec();
    }
  } catch (err) {
    return { message: "Failed to like Post", status: 500 };
  }
}

/**
 * Fetches the 10 posts from the database
 *
 * @return Promise<{}>
 * */

export async function featchPosts() {
  try {
    const posts = await Post.find<PostModelType>().limit(10).lean().exec();
    if (posts) {
      return { status: 200, message: "Posts fetched successfully", posts };
    } else {
      return { message: "Failed to fetch Posts", status: 500 };
    }
  } catch (err) {
    return { message: "Failed to fetch Posts", status: 500 };
  }
}
