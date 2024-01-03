import { AuthContext } from '../../context/authContext'
import './comments.scss'
import { useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Comments = ({ postId }) => {

    //user
    const {currentUser} = useContext(AuthContext)
    const [content, setContent] = useState("");

    //post comment - up comment
    const queryClient = useQueryClient();

    // Mutations
    const mutation = useMutation({
        mutationFn: (newComment) => {
        return axios.post("http://localhost:3001/posts/comments", {
            postId: postId,
            comment: content,
        })},
        onSuccess: (response) => {
        // Access the newly created post object here
        console.log("Newly added comment:", response.data);

        // Invalidate and refetch the query with the correct query key
        queryClient.invalidateQueries({ queryKey: ["comments", postId] });
        },
    });
    
    // useEffect(() => {
    //     // Refetch comments when mutation completes successfully
    //     if (mutation.isSuccess) {
    //       queryClient.refetchQueries({ queryKey: ["comments", postId] });
    //     }
    //     console.log(111111);
    //   }, [mutation.isSuccess, queryClient]);
    
    const handleClick = (e) => {
        e.preventDefault();
        mutation.mutate({ content });
        // print
        // console.log(newPostId);
      };
    // Queries
    const {
        isLoading,
        error,
        data: Comments,
    } = useQuery({
        queryKey: ["comments", postId],
        queryFn: () => {
        try {
            return axios
            .get(`http://localhost:3001/posts/comments/${postId}`)
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

    if (mutation.isLoading) {
        return <h3>Updating...</h3>;
    }

    if (mutation.isError) {
        return <h3>Error while updating. {mutation.error.message}</h3>;
    }

    return (
        <div className='comments'>
            <div className='write'>
                <img src={currentUser.profilePic} alt=''/>
                <input type='text' placeholder='Write a comment' onChange={(e) => setContent(e.target.value)}/>
                <button onClick={handleClick}>Send</button>
            </div>
            {Comments.comments?.map((comment) => {
                return <div className='comment' key={uuidv4()}>
                    <img src="https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
                    <div className='info'>
                        <span>TMK</span>
                        <p>{comment.content}</p>
                    </div>
                    <span className='date'>1 hour ago</span>
                </div>
            })}
        </div>
    )
}

export default Comments