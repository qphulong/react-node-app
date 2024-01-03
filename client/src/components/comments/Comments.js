import { AuthContext } from '../../context/authContext'
import './comments.scss'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const Comments = ({ postId }) => {

    //user
    const {currentUser} = useContext(AuthContext)
    // console.log(postId);
    // Queries
    // const {
    //     isLoading,
    //     error,
    //     data: comments,
    // } = useQuery({
    //     queryKey: ["posts"],
    //     queryFn: () => {
    //     try {
    //         return axios
    //         .get(`http://localhost:3001/posts/comments/${postId}`)
    //         .then((response) => {
    //             // console.log(response.data);
    //             return response.data;
    //         });
    //     } catch (error) {
    //         // console.error(error);
    //         throw error; // Re-throw to allow useQuery to handle error
    //     }
    //     },
    // });

    // if (isLoading) {
    //     return <h3>Loading...</h3>;
    // }

    // if (error) {
    //     return <h3>Error: {error.message}</h3>;
    // }
    
    const comments = [
        {
            id: 1,
            desc: "Hello world Hello world Hello world Hello world Hello world Hello world",
            name: "John Doe",
            userId: 1,
            profilePic: "https://images.pexels.com/photos/2055500/pexels-photo-2055500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 2,
            desc: "Hello TMK Hello TMK Hello TMK Hello TMK Hello TMK Hello TMK Hello TMK Hello TMK",
            name: "John Doe",
            userId: 2,
            profilePic: "https://images.pexels.com/photos/2055500/pexels-photo-2055500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },

    ]
    return (
        <div className='comments'>
            <div className='write'>
                <img src={currentUser.profilePic} alt=''/>
                <input type='text' placeholder='Write a comment'/>
                <button>Send</button>
            </div>
            {comments.map((comment) => {
                return <div className='comment' key={comment.id}>
                    <img src={comment.profilePic} alt=""/>
                    <div className='info'>
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                    <span className='date'>1 hour ago</span>
                </div>
            })}
        </div>
    )
}

export default Comments