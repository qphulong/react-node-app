import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import './forModerator.scss';
import PostModerator from './PostModerator.js';  // Correct path assuming both files are in the same folder

const ForModerator = () => {
    return (
        <div className='moderator-page'>
            <div className='list-post'>
                <PostModerator />
            </div>
        </div>
    );
}

export default ForModerator;
