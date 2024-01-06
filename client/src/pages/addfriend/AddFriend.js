import './addFriend.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import e from 'cors';


const AddFriend = () => {
    const { currentUser, profileImage } = useContext(AuthContext);
    const [randomLink, setRandomLink] = useState(null);
    const [passWord, setPassWord] = useState("")
    const [isEditablePassword, setIsEditablePassword] = useState(true);
    const [passwordWarning, setPasswordWarning] = useState('');
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
        // Check password length when changing the mode
        if (isEditablePassword) {
            const isValidPassword = validatePassword(passWord);
            if (!isValidPassword) {
                setIsEditablePassword(isEditablePassword)
            }
            else {
                setIsEditablePassword(!isEditablePassword);
                if (passwordInputRef.current) {
                    passwordInputRef.current.focus();
                }
            }
        }
        else{
            setIsEditablePassword(!isEditablePassword);
        }

    };

    //Check length of password
    const validatePassword = (password) => {
        if (password.length < MIN_PASSWORD_CHAR || password.length > MAX_PASSWORD_CHAR) {
            setPasswordWarning(`Password must be between ${MIN_PASSWORD_CHAR} and ${MAX_PASSWORD_CHAR} characters.`);
            return false;
        } else {
            setPasswordWarning('');
            return true;
        }
    };


    const handleRandomLink = () => {
        try {
            return axios.post("http://localhost:3001/user/add-friends", {
                userId: currentUser.userId,
                linkPassword: passWord
            }).then((res) => {
                setRandomLink(res.data.friendLink)
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
                                        <div className='tool-tip'>Copy link</div>
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
                                            value={passWord}
                                        />
                                    </div>
                                ) : (
                                    <div className='password'>
                                        <input
                                            type='text'
                                            id='password'
                                            placeholder='Your password'
                                            readonly='readonly'
                                            ref={passwordInputRef}
                                            onChange={(e) => setPassWord(e.target.value)}
                                            value={passWord}
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
                            {passwordWarning && (
                                <div className='password-warning'>{passwordWarning}</div>
                            )}
                            <button className='change-password-button' onClick={handleToggleEditPassword}>
                                {isEditablePassword ? ("Save") : ("Change")}
                            </button>
                        </div>
                    </div>

                </div>



            </div>


        </div>
    )
}

export default AddFriend