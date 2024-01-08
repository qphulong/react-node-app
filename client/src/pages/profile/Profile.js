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
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { FaLink } from "react-icons/fa";

import { useContext, useEffect, useRef, useState } from 'react';
import EditOff from '@mui/icons-material/EditOff';
import PostsProfile from '../../components/postsProfile/PostsProfile';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import EditNote from '@mui/icons-material/EditNote';
import { useParams } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const inputRef = useRef(null);
    const [image, setImage] = useState("");
    const [areFriends, setAreFriends] = useState(null);
    const { currentUser, profileImage, setProfileImage } = useContext(AuthContext);
    const { userId } = useParams();
    const isOwnProfile = currentUser.userId === userId
    const [socialArray, setSocialArray] = useState([])
    const [showSocialMedia, setShowSocialMedia] = useState(false)
    // useEffect(() => {
    //     console.log('====================================');
    //     console.log(socialArray);
    //     console.log('====================================');
    // },[socialArray])

    //===================================================================================================================
    //profile image
    const [profileImageFriend, setProfileImageFriend] = useState("https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
    const fetchProfileImage = async () => {
        try {
            const response = await axios.get(global.backendURL + `/user/profile-pic/${userId}`);

            if (response.status === 200) {
                const imageFilename = response.data
                // console.log('====================================');
                // console.log(imageFilename.profilePic);
                // console.log('====================================');
                setProfileImageFriend(imageFilename.profilePic)
            } else {
                console.log(`Unexpected response: ${JSON.stringify(response.data)}`);
            }
        } catch (error) {
            console.error('Error fetching profile image:', error.message);
        }
    };
    useEffect(() => {
        if (areFriends === true) {
            fetchProfileImage();
        }
    }, [areFriends]);
    //===================================================================================================================

    useEffect(() => {
        if (currentUser.userId !== userId) {
            const fetchIsFriend = async () => {
                try {
                    const response = await axios.get(global.backendURL + `/user/friends/check/${currentUser.userId}/${userId}`);
                    setAreFriends(response.data.isFriend);
                } catch (error) {
                    console.error("Error checking friendship:", error);
                }
            };

            fetchIsFriend();
        }
    }, [currentUser.userId, userId]);

    if (areFriends === false) {
        return (
            <div className='not-friend-page'>
                <div className='notification'>
                    You and this user are not friends. You can send a request to invite this user to be your friend later. <br></br>
                    Please go back to your previous page.
                </div>
                <div className='back-container'>
                    <Link to={"/"}>
                        <LogoutIcon style={{fontSize: 60, color: 'white'}}/>
                    </Link>
                </div>
            </div>
        );
    }

    if (areFriends === null && !isOwnProfile) {
        return (
            <div className='not-exist-page'>
                <div className='notification'>
                    This user is not exist<br></br>
                    Please go back to your previous page.
                </div>
                <div className='back-container'>
                    <Link to={"/"}>
                        <LogoutIcon style={{fontSize: 60, color: 'white'}}/>
                    </Link>
                </div>
            </div>
        );
    }

    const handleImageClick = () => {
        if (isOwnProfile) inputRef.current.click();
    }

    //upload
    const upload = async (newFile) => {
        try {
            const formData = new FormData();
            formData.append("image", newFile);
            const response = await axios.post(
                global.backendURL + `/user/profile-pic/${currentUser.userId}`,
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
        if (isOwnProfile) {
            const file = event.target.files[0];
            if (file) upload(file)
            setImage(file);
            window.location.reload();
        }
    }

    // display social media
    const handleClickDisplaySocialMedia = async () => {
        try {
            const response = await axios.get(global.backendURL + `/user/social-media/${userId}`);

            if (response.status === 200) {
                console.log('====================================');
                console.log(response.data.socialMedia);
                console.log('====================================');
                setSocialArray(response.data.socialMedia)
                setShowSocialMedia(!showSocialMedia)
            }
            else {
                console.log(`Unexpected response: ${JSON.stringify(response.data)}`);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    const handleRemoveLink = (index, social) => {
        const updatedSocialArray = [...socialArray];
        updatedSocialArray.splice(index, 1);
        setSocialArray(updatedSocialArray);

        deleteLink(social)
    };

    const deleteLink = async (social) => {
        try {
            const response = await axios.put(global.backendURL + `/user/social-media/${currentUser.userId}`, {
                socialMedia: social.link
            });

            if (response.status === 200) {
                console.log('Social media link deleted successfully');
            } else {
                console.log(`Unexpected response: ${JSON.stringify(response.data)}`);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }


    return (
        <div className='profile'>
            <div className='images'>
                <img src={isOwnProfile ? profileImage : profileImageFriend}
                    alt="" className='cover' />
                <div className='profile-image-container' onClick={handleImageClick}>
                    {image ? <img src={URL.createObjectURL(image)} alt='' className='profile-picture-after' /> : <img src={isOwnProfile ? profileImage : profileImageFriend} className='profile-picture-before' />}
                    {isOwnProfile ? (
                        <FileUploadIcon style={{ fontSize: 50 }} className='upload-image-icon' />
                    ) : null}
                    <input type="file" ref={inputRef} onChange={handleImageChange} className='upload-image-btn' />
                </div>

            </div>

            <div className='profileContainer'>
                <div className='userInfo'>

                    <div className='center'>
                        <div className='name'>
                            <span>{isOwnProfile ? currentUser.userId : userId}</span>
                        </div>

                        <div className='social-link'>
                            <button onClick={handleClickDisplaySocialMedia} className='social-button'>Social Media</button>
                            {showSocialMedia && (
                                <ul>
                                    {socialArray.map((social, index) => (
                                        <li key={index} className='list-item'>
                                            <div className='link-container'>
                                                <FaLink style={{fontSize: 20}} className='logo'/>
                                                <a href={social.link} target="_blank" rel="noopener noreferrer">
                                                    {social.link}
                                                </a>
                                            </div>

                                            {isOwnProfile && (<div className='remove-container'>
                                                <HighlightOffIcon style={{ fontSize: 30 }} onClick={() => handleRemoveLink(index, social)} className='logo' />
                                                <div className='tool-tip'>
                                                    Remove link
                                                </div>
                                            </div>

                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                    </div>
                </div>
            </div>
            <div className='container-post'>
                <PostsProfile userId={isOwnProfile ? currentUser.userId : userId} imageProfile={isOwnProfile ? profileImage : profileImageFriend} />
            </div>
        </div>
    )
}

export default Profile
