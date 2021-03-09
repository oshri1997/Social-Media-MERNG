import { AuthenticationError, UserInputError } from "apollo-server-errors";
import postModel from "../../models/Post.js";
import checkAuth from "../../utils/check-auth.js";

const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await postModel.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPost(_, { postId }, context, info) {
      try {
        const post = await postModel.findById(postId);
        if (post) return post;
        else {
          throw new Error("Post not Found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      const newPost = new postModel({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      const post = await newPost.save();
      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      try {
        const post = await postModel.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (error) {
        throw new Err(error);
      }
    },
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);
      const post = await postModel.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          //post already likes,unlike
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          //like this post
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};

export default resolvers;
