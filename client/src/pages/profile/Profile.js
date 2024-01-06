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
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Post from '../../components/post/Post';
import Posts from '../../components/posts/Posts';
import EditOffIcon from '@mui/icons-material/EditOff';

import { useContext, useRef, useState } from 'react';
import EditOff from '@mui/icons-material/EditOff';
import PostsProfile from '../../components/postsProfile/PostsProfile';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import EditNote from '@mui/icons-material/EditNote';

const Profile = () => {
    const inputRef = useRef(null);
    const [image, setImage] = useState("");
    const [name, setName] = useState('Jane Doe');
    const { currentUser, profileImage, setProfileImage } = useContext(AuthContext);


    const handleImageClick = () => {
        inputRef.current.click();
    }

    //upload
    const upload = async (newFile) => {
        try {
            const formData = new FormData();
            formData.append("image", newFile);
            const response = await axios.post(
                `http://localhost:3001/user/profile-pic/${currentUser.userId}`,
                formData
            );

            if (response.status === 200) {
                console.log("oke 200");
                return response.data;
            } else {
                console.error("Upload failed:", response.statusText);
                throw new Error("File upload failed"); // Re-throw for better handling
            }
        } catch (err) {
            console.error("Error during upload:", err.message, err.stack);
            throw err; // Re-throw to allow for further handling
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) upload(file)
        setImage(file);
        window.location.reload();
    }


    return (
        <div className='profile'>
            <div className='images'>
                <img src={profileImage}
                    alt="" className='cover' />
                <div className='profile-image-container' onClick={handleImageClick}>
                    {image ? <img src={URL.createObjectURL(image)} alt='' className='profile-picture-after' /> : <img src={profileImage} className='profile-picture-before' />}
                    <FileUploadIcon style={{ fontSize: 50 }} className='upload-image-icon' />
                    <input type="file" ref={inputRef} onChange={handleImageChange} className='upload-image-btn' />
                </div>

            </div>

            <div className='profileContainer'>
                <div className='userInfo'>

                    <div className='center'>
                        <div className='name'>
                            <span>{name}</span>
                        </div>

                        <div className='social-link'>
                            <a href='https://facebook.com'>
                                <FacebookIcon style={{ fontSize: 30 }} className='logo' />
                            </a>

                            <a href='https://instagram.com'>
                                <InstagramIcon style={{ fontSize: 30 }} className='logo' />
                            </a>

                            <a href='https://www.linkedin.com/'>
                                <LinkedInIcon style={{ fontSize: 30 }} className='logo' />
                            </a>
                        </div>



                    </div>
                </div>
            </div>
            <div className='container-post'>
                <PostsProfile />
            </div>
        </div>
    )
}

export default Profile
