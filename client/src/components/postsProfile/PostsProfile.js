import axios from "axios";
import Post from "../post/Post";
import "./postsProfile.scss";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import PostProfile from "../postProfile/PostProfile";

const PostsProfile = ({userId}) => {
    //useContext
    const { currentUser, login } = useContext(AuthContext);

    // Queries
    const {
        isLoading,
        error,
        data: postsProfile,
    } = useQuery({
        queryKey: ["postsProfile",currentUser.userId],
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

    return (
        <div className="posts">
        {isLoading
            ? "Loading..."
            : postsProfile?.posts.map((post) => {
                return <PostProfile userId = {userId} post={post} key={post.postId} />;
            })}
        </div>
    );
}

export default PostsProfile