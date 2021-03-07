import postModel from "../../models/Post.js";

const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await postModel.find();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPost(_, { postId }) {
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
};

export default resolvers;
