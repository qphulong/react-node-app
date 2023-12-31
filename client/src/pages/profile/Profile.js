import './profile.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Post from '../../components/post/Post';
import Posts from '../../components/posts/Posts';

import { useRef, useState } from 'react';

const Profile = () => {
    const inputRef = useRef(null);
    const [image, setImage] = useState("");


    const handleImageClick = () =>{
        inputRef.current.click();
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        setImage(file);
    }

    return (
        <div className='profile'>
            <div className='images'>
                <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="" className='cover'/>
                <div className='profile-image-container' onClick={handleImageClick}> 
                    {image ? <img src={URL.createObjectURL(image)} alt='' className='profile-picture-after'/> : <img src='https://images.pexels.com/photos/2055500/pexels-photo-2055500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className='profile-picture-before'/>}
                    <FileUploadIcon style={{fontSize: 50}} className='upload-image-icon'/>
                    <input type = "file" ref = {inputRef} onChange={handleImageChange} className='upload-image-btn'/>
                </div>
                
            </div>

            <div className='profileContainer'>
                <div className='userInfo'>
                    <div className='left'>
                        <a href='https://facebook.com'>
                            <FacebookIcon style={{fontSize: 25}}/>
                        </a>

                        <a href='https://instagram.com'>
                            <InstagramIcon style={{fontSize: 25}}/>
                        </a>

                        <a href='https://www.linkedin.com/'>
                            <LinkedInIcon style={{fontSize: 25}}/>
                        </a>
                    </div>
                    <div className='center'>
                        <span>Jane Doe</span>
                        <div className='info'>
                            <div className='item'>
                                <PlaceIcon/>
                                <span>Singapore</span>
                            </div>

                            <div className='item'>
                                <PhoneIcon/>
                                <span>+84918155199</span>
                            </div>
                        </div>

                        <button>Visit</button>
                    </div>
                    <div className='right'>
                        <EmailOutlined/>
                        <MoreVertIcon/>
                    </div>
                </div>
            </div>
            <div className='container-post'>
                <Posts/>
            </div>
        </div>
    )
}

export default Profile