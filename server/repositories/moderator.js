import mongoose from "mongoose";
import { BaseRepository } from "./base";
import Post from "../models/post";

class ModeratedPostRepository implements BaseRepository<typeof Post.schema> {
  async create(item: typeof Post.schema): Promise<boolean> {
    try {
      const newPost = await Post.create(item);
      return !!newPost;
    } catch (error) {
      console.error("Error creating post:", error);
      return false;
    }
  }

  async update(id: string, item: typeof Post.schema): Promise<boolean> {
    try {
      const updatedPost = await Post.findByIdAndUpdate(id, item, { new: true });
      return !!updatedPost;
    } catch (error) {
      console.error("Error updating post:", error);
      return false;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const deletedPost = await Post.findByIdAndDelete(id);
      return !!deletedPost;
    } catch (error) {
      console.error("Error deleting post:", error);
      return false;
    }
  }

  async find(item: typeof Post.schema): Promise<mongoose.Document> {
    try {
      const posts = await Post.find(item);
      return posts;
    } catch (error) {
      console.error("Error finding posts:", error);
      return [];
    }
  }

  async findOne(id: string): Promise<typeof Post.schema> {
    try {
      const post = await Post.findById(id);
      return post;
    } catch (error) {
      console.error("Error finding post by ID:", error);
      return null;
    }
  }
}

export default ModeratedPostRepository;
const Post = require("../models/post");

export class ModeratedPostRepository {
  addForConsideration(post) {}
  update(id, post) {}
  delete(id) {}
  find(item) {}
  findOne(id) {}
}
