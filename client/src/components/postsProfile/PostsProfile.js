import axios from "axios";
import Post from "../post/Post";
import "./postsProfile.scss";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import PostProfile from "../postProfile/PostProfile";

const PostsProfile = () => {
    //useContext
    const { currentUser, login } = useContext(AuthContext);

    // Queries
    const {
        isLoading,
        error,
        data: postsProfile,
    } = useQuery({
        queryKey: ["postsProfile"],
        queryFn: () => {
        try {
            return axios
            .get(`http://localhost:3001/user/${currentUser.userId}`)
            .then((response) => {
                console.log(response.data);
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

    const postsArray = postsProfile.posts;
    console.log(postsArray[0]);

    return (
        <div className="posts">
        {isLoading
            ? "Loading..."
            : postsArray.map((post) => {
                return <PostProfile post={post} key={post.postId} />;
            })}
        </div>
    );
}

export default PostsProfile