import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './share.scss'
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { useState } from 'react';
const Share = () => {

    const {currentUser} = useContext(AuthContext)
    const [file, setFile] = useState(null);


    return (
        <div className='share'>
            <div className='container'>
                <div className='top'>
                    <img 
                        src='https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                        alt=''
                    />
                    <input type="text" placeholder={`What's on your mind ${currentUser.name}?`} />
                </div>

                <hr/>
                <div className='bottom'>
                    <div className='left'>
                        <input type='file' id='file' style={{display: "none"}}/>
                        <label htmlFor="file">
                        <div className="item">
                            <AddPhotoAlternateIcon style={{ fontSize: 25 }}/>
                            <span>Add Image</span>
                        </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Share