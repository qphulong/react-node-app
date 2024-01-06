import './addFriend.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';


const AddFriend = () => {
    const { currentUser,profileImage,passWordLink,setPassWordLink,randomLinkInvitation,setRandomLinkInvitation } = useContext(AuthContext);
    const [randomLink, setRandomLink] = useState(null);
    const [passWord, setPassWord] = useState("")
    const [isEditablePassword, setIsEditablePassword] = useState(true);
    const passwordInputRef = useRef(null);

    // useEffect(() => {
    //     console.log("Current Link:", randomLinkInvitation);
    //  }, [randomLinkInvitation]);

    // const data = "add-friends/tmk3010-e5eaee39-819d-45b8-991f-de9a997fb4b4"
    // const extractedValue = data.split('/')[1].split('-')[0]; // "tmk3010"
    // console.log('====================================');
    // console.log(extractedValue);
    // console.log('====================================');

    //Constant
    const MAX_PASSWORD_CHAR = 16
    const MIN_PASSWORD_CHAR = 8

    const handleToggleEditPassword = () => {
        setIsEditablePassword(!isEditablePassword);
        if (passwordInputRef.current) {
            passwordInputRef.current.focus();
        }
    };

    //Check length of password
    const validPassword = passWord.length >= MIN_PASSWORD_CHAR && passWord.length <= MAX_PASSWORD_CHAR


    const handleRandomLink = () => {
        try {
            return axios.post("http://localhost:3001/user/add-friends", {
                userId: currentUser.userId,
                linkPassword: passWord
            }).then((res) => {
                setRandomLink(res.data.friendLink)
                setRandomLinkInvitation(res.data.friendLink)
                setPassWordLink(passWord)
                // console.log('====================================');
                // console.log(passWord);
                // console.log(res.data.friendLink);
                // console.log('====================================');
            })
        }
        catch (err) {
            console.log('====================================');
            console.log(err);
            console.log('====================================');
        }
    }

    return (
        <div className='add-friend-page'>
            <div className='image'>
                <img src={profileImage} alt='' className='cover-image' />
                <img src={profileImage} alt='' className='profile-image' />
            </div>
            <div className='profile-container'>
                <div className='user-info'>

                    <div className='center'>
                        <div className='name'>
                            <span>{currentUser.userId}</span>
                        </div>

                        <div className='social-link-friend'>
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

                    <div className='invitation'>
                        <div className='get-link'>
                            <p>Give this link to someone you want to add</p>
                            {randomLink ? (
                                <div className='random-link-container'>
                                    <span>{randomLink}</span>
                                    <div>
                                        <ContentCopyIcon style={{ fontSize: 30 }} />
                                        <div className='tooltip'>Copy link</div>
                                    </div>
                                </div>) : (
                                <div className='random-link-container'>
                                    <span>Here is your link</span>
                                    <div>
                                        <ContentCopyIcon style={{ fontSize: 30 }} className='logo' />
                                        <div className='tool-tip'>Copy link</div>
                                    </div>

                                </div>
                            )
                            }

                            <button className='get-link-button' onClick={handleRandomLink}>Generate link</button>
                        </div>
                        <div className='get-password'>
                            <p>Password to add</p>
                            <div className='password-container'>
                                {isEditablePassword ? (
                                    <div className='password'>
                                        <input
                                            type='text'
                                            id='password'
                                            placeholder='Your password'
                                            ref={passwordInputRef}
                                            onChange={(e) => setPassWord(e.target.value)}
                                        />
                                    </div>
                                ) : (
                                    <div className='password'>
                                        <input
                                            type='text'
                                            id='password'
                                            placeholder='Your password'
                                            readonly = 'readonly'
                                            ref={passwordInputRef}
                                            onChange={(e) => setPassWord(e.target.value)}
                                        />
                                    </div>
                                )}

                                <div className='copy-password-icon'>
                                    <ContentCopyIcon style={{ fontSize: 30 }} className='logo' />
                                    <div className='tool-tip'>
                                        Copy password
                                    </div>
                                </div>

                            </div>
                            <button className='change-password-button' onClick={handleToggleEditPassword}>
                                Change
                            </button>
                        </div>
                    </div>

                </div>



            </div>


        </div>
    )
}

export default AddFriend