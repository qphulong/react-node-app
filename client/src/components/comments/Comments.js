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

    // =================================================================================================
    // =================================================================================================
    // check limit word
    
    // =================================================================================================
    // =================================================================================================

    //post comment - up comment
    const queryClient = useQueryClient();

    // Mutations
    const mutation = useMutation({
        mutationFn: async () => {
        return await axios.post("http://localhost:3001/posts/comments", {
            postId: postId,
            comment: content,
        })},
        onSuccess: (response) => {
            console.log("Newly added comment:", response.data);

            queryClient.invalidateQueries({queryKey: ["Comments",currentUser.userId]});
        },
    });

    
    const handleClick = async (e) => {
        e.preventDefault();
        await mutation.mutate({ content });
      };

    // Queries
    const {isLoading, error, data: Comments} = useQuery({
        queryKey: ["Comments",currentUser.userId],
        queryFn: async () => {
        try {
            return await axios
            .get(`http://localhost:3001/posts/comments/${postId}`)
            .then((response) => {
                return response.data;
            });
        } catch (error) {
            throw error; 
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
                        <span>{comment.user}</span>
                        <p>{comment.content}</p>
                    </div>
                    <span className='date'>1 hour ago</span>
                </div>
            })}
        </div>
    )
}

export default Comments