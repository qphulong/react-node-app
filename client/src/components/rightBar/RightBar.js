import { useQuery } from '@tanstack/react-query';
import './rightBar.scss'
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';

function RightBar(){
    const { currentUser } = useContext(AuthContext);
    const {data: Friends} = useQuery({
        queryKey: ["Friends"],
        queryFn: async () => {
        try {
            return await axios
            .get(`http://localhost:3001/user/friends/${currentUser.userId}`)
            .then((response) => {
                return response.data;
            });
        } catch (error) {
            throw error; 
        }
        },
    });

    // console.log('====================================');
    // console.log(Friends);
    // console.log('====================================');

    return (
        <div className = "rightBar">
            <div className='container'>
                <div className='online-friends'>
                    <span>My Friends</span>

                    {Friends && Friends.friends.map((friend) => (
                        <div className='user' key={friend.userId}>
                            <div className='userInfo'>
                                <img src="https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt={friend.userId} />
                                <span>{friend.userId}</span>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default RightBar;