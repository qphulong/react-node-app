import './addFriendTest.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
const AddFriendTest = () => {
    return (
        <div className='add-friend-page-test'>
            <div className='profile-container'>
                <div className='user-info'>

                    <div className='invitation'>
                        <div className='get-link'>
                            <p>Give this link to someone you want to add</p>
                            <div className='random-link-container'>
                                <span>Here is the link</span>
                                <div>
                                    <ContentCopyIcon style={{ fontSize: 30 }} className='logo' />
                                    <div className='tool-tip'>Copy link</div>
                                </div>
                            </div>

                            <button className='get-link-button' >Generate link</button>
                        </div>
                        <div className='get-password'>
                            <p>Password to add</p>
                            <div className='password-container'>
                                <div className='password'>
                                    <input
                                        type='text'
                                        id='password'
                                        placeholder='Your password'
                                    />
                                </div>

                                <div className='copy-password-icon'>
                                    <ContentCopyIcon style={{ fontSize: 30 }} className='logo' />
                                    <div className='tool-tip'>
                                        Copy password
                                    </div>
                                </div>

                            </div>
                            <button className='change-password-button'>
                                Save
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default AddFriendTest