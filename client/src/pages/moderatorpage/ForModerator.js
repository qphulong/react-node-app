import React, { useContext, useEffect, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import './forModerator.scss';
import PostModerator from './PostModerator.js';  // Correct path assuming both files are in the same folder
import { AuthContext } from '../../context/authContext.js';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const ForModerator = () => {
    const [isModerator,setIsModerator] = useState(false)
    const {currentUser} = useContext(AuthContext)

    //======================================================================================================
    //Check moderator
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

    //======================================================================================================
    //Get all reported posts
    const {isLoading,error,data: ModeratorPosts} = useQuery({
        queryKey: ["ModeratorPosts"],
        queryFn: async () => {
        try {
            return await axios
            .get(`http://localhost:3001/user/moderator`)
            .then((response) => {
                return response.data;
            });
        } catch (error) {
            throw error;
        }
        },
    })

    if (isLoading) {
        return <h3>Loading...</h3>;
    }

    if (error) {
        return <h3>Error: {error.message}</h3>;
    }

    // console.log('====================================');
    // console.log(ModeratorPosts.posts);
    // console.log('====================================');

    //======================================================================================================
    //======================================================================================================
    
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
                {isLoading ? "Loading..."
                : ModeratorPosts?.posts.map((post) => {
                    return <PostModerator postIdModerator={post} key={post} />;
                })}
            </div>
        </div>
    );
}

export default ForModerator;
