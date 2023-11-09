class PostNode {
  post;

  next = null;
}

export class PostLinkedList {
  head = new PostNode();

  insert(newPost) {
    current = head;

    while (current != null && current.next != null) {
      current = current.next;
    }

    current.next = new PostNode();
    current.next.post = newPost;
  }

  searchById(id) {
    current = head;
    while (current != null) {
      if (current.post.postId == id) {
        return current.post;
      }
      current = current.next;
    }

    return null;
  }

  delete(id) {
    current = head;
    while (current != null && current.next != null) {
      if (current.next.post.postId == id) {
        current.next = current.next.next;
      }
      current = current.next;
    }
  }
}

export class ModeratedPostRepository {
  postsForConsideration = new PostLinkedList();

  addForConsideration(post) {
    this.postsForConsideration.insert(post);
  }
  delete(id) {
    this.postsForConsideration.delete(id);

    //delete from schema too
  }
  keep(id) {
    this.postsForConsideration.delete(id);

    //do nothing
  }
}
