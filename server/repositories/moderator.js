const postFunctions = require("../functions/post");

class PostNode {
  post;

  next = null;
}

export class PostQueue {
  head = new PostNode();

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

export class ModeratedPostRepository {
  postsForConsideration = new PostLinkedList();

  addForConsideration(post) {
    this.postsForConsideration.insert(post);
  }

  consider() {
    considerId = this.postsForConsideration.pop();

    this.delete = () => {
      //remove post from schema
      postFunctions.deletePost(this.considerId);
    };

    this.keep = () => {
      //remove from queue only and then do nothing
    };
  }
}
