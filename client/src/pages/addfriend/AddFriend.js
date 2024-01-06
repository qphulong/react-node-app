import './addFriend.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useContext, useState, useRef } from 'react';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';


const AddFriend = () => {
    const { currentUser } = useContext(AuthContext);
    const [passWord, setPassWord] = useState("")
    const [randomLink, setRandomLink] = useState(null);
    const [isEditablePassword, setIsEditablePassword] = useState(true);
    const passwordInputRef = useRef(null);

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
                console.log('====================================');
                console.log(passWord);
                console.log(res.data.friendLink);
                console.log('====================================');
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
                <img src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='' className='cover-image' />
                <img src='https://images.pexels.com/photos/2055500/pexels-photo-2055500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='' className='profile-image' />
            </div>
            <div className='profile-container'>
                <div className='user-info'>

                    <div className='center'>
                        <div className='name'>
                            <span>Hello world</span>
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