import React, { useContext, useEffect, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import './forModerator.scss';
import PostModerator from './PostModerator.js';  // Correct path assuming both files are in the same folder
import { AuthContext } from '../../context/authContext.js';
import axios from 'axios';

const ForModerator = () => {
    const [isModerator,setIsModerator] = useState(false)
    const {currentUser} = useContext(AuthContext)

    const CheckIsModerator = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/user/${currentUser.userId}/moderator`);
        
            if (response.status === 200) {
                console.log('====================================');
                console.log("Is moderator");
                console.log('====================================');
                setIsModerator(response.data.isModerator)
            } 
            else {
                console.log(`Unexpected response: ${JSON.stringify(response.data)}`);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    useEffect(() => {
        CheckIsModerator()
    },[])

    if(isModerator === false){
        return (
            <div>
                You are not moderator. Please contact with admin
            </div>
        )
    }

    return (
        <div className='moderator-page'>
            <div className='list-post'>
                <PostModerator />
            </div>
        </div>
    );
}

export default ForModerator;
