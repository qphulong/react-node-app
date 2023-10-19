function Post(content, postId, timeStamp) {
  this.content = content;
  this.postId = postId;
  this.timeStamp = timeStamp;
  this.deleteAfter = 0;
  this.likes = 0;
} //constructor for prototype

Post.prototype.fromJson = function (json) {
  const { content, postId, timeStamp } = json;
  const post = new Post(content, postId, timeStamp);
  post.likes = json.likes || 0;
  post.deleteAfter = json.deleteAfter || 0;
  return post;
};

Post.prototype.toJson = function () {
  return {
    content: this.content,
    postId: this.postId,
    timeStamp: this.timeStamp,
    likes: this.likes,
    deleteAfter: this.deleteAfter,
  };
};

const jsonPost = {
  content: "Sample Content",
  postId: 1,
  timeStamp: Date.now(),
  likes: 10,
  deleteAfter: 0,
};

class PostDao {
  constructor() {}

  posts = new Set(); //add vào set

  add(post) {
    this.posts.add(post); //thêm bài post

    // insertDocToCollection("Posts", post.convertToDoc()); //up lên mongodb
  }

  delete(post) {
    this.posts.delete(post);
  }
}
