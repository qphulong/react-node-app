import axios from "axios";
import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
const Posts = () => {
  //useContext
  const { currentUser, login } = useContext(AuthContext);

  // Queries
  const {
    isLoading,
    error,
    data: posts,
  } = useQuery({
    queryKey: ["posts", currentUser.userId],
    queryFn: () => {
      try {
        return axios
          .get(window.backendURL + `/posts/${currentUser.userId}`)
          .then((response) => {
            // console.log(response.data);
            return response.data;
          });
      } catch (error) {
        // console.error(error);
        throw error; // Re-throw to allow useQuery to handle error
      }
    },
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>Error: {error.message}</h3>;
  }

  const postsArray = Object.values(posts)[0];
  // console.log(postsArray[0].postId);
  return (
    <div className="posts">
      {isLoading
        ? "Loading..."
        : postsArray.map((post) => {
            return <Post post={post} key={post.postId} />;
          })}
    </div>
  );
};

export default Posts;
