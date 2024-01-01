import axios from "axios";
import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
const Posts = () => {
  //useContext
  const { currentUser, login } = useContext(AuthContext);
  //temporary
  // const posts = [
  //     {
  //         id: 1,
  //         name: 'Jone Doe',
  //         userId: 1,
  //         profilePic: "https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //         desc: "HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD ",
  //         img: "https://images.pexels.com/photos/2055500/pexels-photo-2055500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //     },
  //     {
  //         id: 2,
  //         name: 'Jone Doe',
  //         userId: 1,
  //         profilePic: "https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //         desc: " Tran Minh Khanh  Tran Minh Khanh  Tran Minh Khanh  Tran Minh Khanh  Tran Minh Khanh  Tran Minh Khanh  ",
  //     },

  // ]

  // Queries
  const {
    isLoading,
    error,
    data: posts,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      try {
        return axios
          .get(`http://localhost:3001/posts/${currentUser.userId}`)
          .then((response) => {
            // console.log(response.data);
            return response.data;
          });
      } catch (error) {
        console.error(error);
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
  console.log(postsArray[0].postId);

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
