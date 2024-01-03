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
    const {
        isLoading,
        error,
        data: Comments,
    } = useQuery({
        queryKey: ["comments"],
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
    
    // const comments = [
    //     {
    //         id: 1,
    //         desc: "Hello world Hello world Hello world Hello world Hello world Hello world",
    //         name: "John Doe",
    //         userId: 1,
    //         profilePic: "https://images.pexels.com/photos/2055500/pexels-photo-2055500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //     },
    //     {
    //         id: 2,
    //         desc: "Hello TMK Hello TMK Hello TMK Hello TMK Hello TMK Hello TMK Hello TMK Hello TMK",
    //         name: "John Doe",
    //         userId: 2,
    //         profilePic: "https://images.pexels.com/photos/2055500/pexels-photo-2055500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //     },

    // ]
    return (
        <div className='comments'>
            <div className='write'>
                <img src={currentUser.profilePic} alt=''/>
                <input type='text' placeholder='Write a comment'/>
                <button>Send</button>
            </div>
            {Comments.comments.map((comment) => {
                return <div className='comment'>
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