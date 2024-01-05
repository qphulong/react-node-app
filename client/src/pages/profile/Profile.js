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

const Profile = () => {
    const inputRef = useRef(null);
    const [image, setImage] = useState("");
    const [isEditable, setIsEditable] = useState(false);
    const [name, setName] = useState('Jane Doe');
    const [position, setPosition] = useState('Singapore');
    const [phoneNumber, setPhoneNumber] = useState('+84918155199');
    const { currentUser,profileImage,setProfileImage } = useContext(AuthContext);


    const handleImageClick = () => {
        inputRef.current.click();
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        setImage(file);
    }

    const handleToggleEdit = () => {
        setIsEditable(!isEditable);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePositionChange = (event) => {
        setPosition(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };
    const inputStyle = (text, fontSize) => {
        return {
            width: isEditable ? `${text.length * fontSize}px` : 'auto'
        };
    };

    var inputs = document.querySelectorAll('input'); // get the input element
    inputs.forEach(function(input) {
        // Bind the "resizeInput" callback on "input" event for each input element
        input.addEventListener('input', resizeInput);
        
        // Call the function immediately to set initial width for each input element
        resizeInput.call(input);
    });

    function resizeInput() {
        this.style.width = this.value.length + "ch";
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
                    <div className='left'>
                        <a href='https://facebook.com'>
                            <FacebookIcon style={{ fontSize: 25 }} className='logo' />
                        </a>

                        <a href='https://instagram.com'>
                            <InstagramIcon style={{ fontSize: 25 }} className='logo' />
                        </a>

                        <a href='https://www.linkedin.com/'>
                            <LinkedInIcon style={{ fontSize: 25 }} className='logo' />
                        </a>
                    </div>
                    <div className='center'>
                        <div className='name'>
                            {isEditable ? (
                                <div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={handleNameChange}
                                    />
                                </div>
                            ) :
                                <div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={handleNameChange}
                                        readonly="readonly"
                                        style={{outline:'none'}}
                                    />
                                </div>}

                        </div>
                        <div className='info'>
                            <div className='item'>
                                <PlaceIcon />
                                {isEditable ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={position}
                                            onChange={handlePositionChange}
                                        
                                        />
                                    </div>
                                ) :
                                    <div>
                                        <input
                                            type="text"
                                            value={position}
                                            onChange={handlePositionChange}
                                            readonly="readonly"
                                            style={{outline:'none'}}
                                        />

                                    </div>}
                            </div>

                            <div className='item'>
                                <PhoneIcon />
                                {isEditable ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={phoneNumber}
                                            onChange={handlePhoneNumberChange}
                                        />
                                    </div>
                                ) :
                                    <div>
                                        <input
                                            type="text"
                                            value={phoneNumber}
                                            onChange={handlePhoneNumberChange}
                                            readonly="readonly"
                                            style={{outline:'none'}}
                                        />

                                    </div>}
                            </div>
                        </div>
                        {isEditable ? (
                            <button onClick={handleToggleEdit}>Disable edit</button>
                        ): <button onClick={handleToggleEdit}>Enable edit</button>}
                        
                    </div>
                    <div className='right'>
                        <EmailOutlined />
                        <MoreVertIcon />
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
