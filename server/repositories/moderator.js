const postFunctions = require("../functions/post");
const PostsForConsideration = require("../models/postForModeration");

class PostNode {
  post;

  next = null;
}

class PostQueue {
  head = new PostNode();

  constructor() {
    this.loadPosts();
  }

  async loadPosts() {
    const posts = await PostsForConsideration.find({});
    posts.forEach((post) => {
      this.insert(post);
    });
  }

  insert(newPost) {
    current = head;

    while (current != null && current.next != null) {
      current = current.next;
    }

    current.next = new PostNode();
    current.next.post = newPost;
  }

  pop() {
    current = new Node(head);

    let temp = head.next;
    head = temp;

    return current;
  }
}

class ModeratedPostRepository {
  postsForConsideration = new PostQueue();

  addForConsideration(post) {
    this.postsForConsideration.insert(post);
  }

  delete = async (considerId) => {
    //remove post from schema (if post violate)
    await postFunctions.deletePost(considerId);
  };
}

module.exports = {
  ModeratedPostRepository,
};
