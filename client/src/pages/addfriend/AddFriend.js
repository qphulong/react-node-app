import './addFriend.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';


const AddFriend = () => {
    return (
        <div className='add-friend-page'>
            <div className='image'>
                <img src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='' className='cover-image' />
                <img src='https://images.pexels.com/photos/2055500/pexels-photo-2055500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='' className='profile-image' />
            </div>
            <div className='profile-container'>
                <div className='user-info'>
                    <div className='left'>
                        <a href='https://facebook.com'>
                            <FacebookIcon style={{ fontSize: 25 }} className='logo'/>
                        </a>

                        <a href='https://instagram.com'>
                            <InstagramIcon style={{ fontSize: 25 }} className='logo'/>
                        </a>

                        <a href='https://www.linkedin.com/'>
                            <LinkedInIcon style={{ fontSize: 25 }} className='logo'/>
                        </a>
                    </div>
                    <div className='center'>
                        <div className='name'>
                            <span>Hello world</span>
                        </div>
                        <div className='info'>
                            <div className='item'>
                                <PlaceIcon />
                                <span>World</span>
                            </div>

                            <div className='item'>
                                <PhoneIcon />
                                <span>123456</span>
                            </div>
                        </div>
                    </div>
                    <div className='right'>
                        <EmailOutlined />
                        <MoreVertIcon />
                    </div>
                </div>
            </div>
            <div className='invitation'>
                <div className='get-link'>
                    <p>Give this link to someone you want to add</p>
                    <button className='get-link-button'>Random link</button>
                </div>
                <div className='get-password'>
                    <p>Password to add</p>
                    <div className='password-container'>
                        <div className='password'>
                            <span>this is password</span>
                        </div>
                        <PersonAddAltIcon style={{ fontSize: 25 }} className='logo'/>
                    </div>
                    <button className='change-password-button'>
                        Change
                    </button>
                </div>
            </div>

        </div>
    )
}

export default AddFriend