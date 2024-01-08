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
import { ToastContainer, toast } from "react-toastify";

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
    const MAX_PASSWORD_CHAR = 16//Maximum password length
    const MIN_PASSWORD_CHAR = 8//Minimum password length

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

    const handleRandomLink = () => {
        try {
            return axios.post(global.backendURL + "/user/add-friends", {
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

    //==============================================================================================================
    //==============================================================================================================
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

    //Copy the password to Clipboard
    const copyPasswordToClipboard = () => {
        if (!isEditablePassword){
            navigator.clipboard.writeText(passWord)
            .then(() => {
                // Optionally, you can provide feedback to the user that the copy was successful
                toast.success("Password copied to clipboard!", {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            })
            .catch((err) => {
                toast.error("Could not copy password to clipboard:", {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            });
        }
        else{
            toast.warning("You need to save your password first", {
                position: toast.POSITION.TOP_RIGHT,
              });
        }
        
    };

    //Copy the link to Clipboard
    const copyLinkToClipboard = () => {
        if (randomLink){
            navigator.clipboard.writeText(randomLink)
            .then(() => {
                // Optionally, you can provide feedback to the user that the copy was successful
                toast.success("Invitation link copied to clipboard!", {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            })
            .catch((err) => {
                toast.error("Could not copy invitation link to clipboard:", {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            });
        }
        else{
            toast.warning("You need to generate the invitation link", {
                position: toast.POSITION.TOP_RIGHT,
              });
        }
        
    };
    //==============================================================================================================
    //==============================================================================================================

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

                        {/* <div className='social-link-friend'>
                            <a href='https://facebook.com'>
                                <FacebookIcon style={{ fontSize: 30 }} className='logo' />
                            </a>

                            <a href='https://instagram.com'>
                                <InstagramIcon style={{ fontSize: 30 }} className='logo' />
                            </a>

                            <a href='https://www.linkedin.com/'>
                                <LinkedInIcon style={{ fontSize: 30 }} className='logo' />
                            </a>
                        </div> */}

                    </div>

                    <div className='invitation'>
                        <div className='get-link'>
                            <p>Give this link to someone you want to add</p>                        
                                <div className='random-link-container'>
                                    {randomLink ? (<span>{randomLink}</span>):(<span className='default-link'>Your link</span>)}
                                    
                                    <div>
                                        <ContentCopyIcon style={{ fontSize: 30 }} onClick={copyLinkToClipboard} className='logo'/>
                                        <div className='tool-tip'>Copy link</div>
                                    </div>
                                </div>

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
                                    <ContentCopyIcon style={{ fontSize: 30 }} className='logo' onClick={copyPasswordToClipboard} />
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
            <ToastContainer/>

        </div>
    )
}

export default AddFriend