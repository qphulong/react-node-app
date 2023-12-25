import { AuthContext } from '../../context/authContext'
import './comments.scss'
import { useContext } from 'react'

const Comments = () => {

    //user
    const {currentUser} = useContext(AuthContext)

    //temp
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
                return <div className='comment'>
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