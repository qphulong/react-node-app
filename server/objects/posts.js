class Post {
  deleteAfter = 0; //tự xoá bài

  likes = 0; //số lượt like

  constructor(content, postId, timeStamp) {
    this.content = content;
    this.postId = postId;
    this.timeStamp = timeStamp;
  }

  static fromJson(json) {
    //static để ta có thể dễ dàng tạo object từ json
    const { content, postId, timeStamp } = json; //lấy các field từ json
    return new Post(content, postId, timeStamp);
  }

  toJson() {
    return {
      content: this.content,
      postId: this.postId,
      timeStamp: this.timeStamp,
    };
  }

  convertToDoc() {
    //doi thanh document de up len MongoDB
    return {
      content: this.content,
      postId: this.postId,
      timeStamp: this.timeStamp,
      likes: this.likes,
      deleteAfter: this.deleteAfter,
    };
  }
}

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
