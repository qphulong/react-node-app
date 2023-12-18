import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import './friends.scss'

const Friends = () => {
    return (
        <div className='friends'>
            <div className="title">
                <p>Friends</p>
                <AutoAwesomeIcon style={{ fontSize: 20 }}/>
            </div>
            <div className="content-container">
                <div className='item'>
                    <div className='friends-top'>
                        <img src='https://images.pexels.com/photos/2055500/pexels-photo-2055500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
                        <span className='friends-name'>
                            Viet Tung
                        </span>
                    </div>
                    <div className='friends-mid'>
                        <div className='friends-left'>
                            <FacebookIcon style={{fontSize : 30}}/>
                            <InstagramIcon style={{fontSize: 30}}/>
                            <LinkedInIcon style={{fontSize: 30}}/>
                        </div>
                        <div className='friends-center'>
                            <div className='friends-position'>
                                <PlaceIcon style={{fontSize: 25}} className='logo'/>
                                <span>England</span>
                            </div>
                            <div className='friends-phone'>
                                <PhoneIcon style={{fontSize: 25}} className='logo'/>
                                <span>+840123456789</span>
                            </div>
                        </div>
                        <div className='friends-right'>
                            <MailOutlineIcon style={{fontSize: 30}}/>
                            <MoreVertIcon style = {{fontSize: 30}}/>
                        </div>
                    </div>
                    <div className='friends-bottom'>
                        <button>
                            Visit
                        </button>
                    </div>
                </div>
                <div className='item'>
                    <div className='friends-top'>
                        <img src='https://images.pexels.com/photos/2055500/pexels-photo-2055500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
                        <span className='friends-name'>
                            Viet Tung
                        </span>
                    </div>
                    <div className='friends-mid'>
                        <div className='friends-left'>
                            <FacebookIcon style={{fontSize : 30}}/>
                            <InstagramIcon style={{fontSize: 30}}/>
                            <LinkedInIcon style={{fontSize: 30}}/>
                        </div>
                        <div className='friends-center'>
                            <div className='friends-position'>
                                <PlaceIcon style={{fontSize: 25}} className='logo'/>
                                <span>England</span>
                            </div>
                            <div className='friends-phone'>
                                <PhoneIcon style={{fontSize: 25}} className='logo'/>
                                <span>+840123456789</span>
                            </div>
                        </div>
                        <div className='friends-right'>
                            <MailOutlineIcon style={{fontSize: 30}}/>
                            <MoreVertIcon style = {{fontSize: 30}}/>
                        </div>
                    </div>
                    <div className='friends-bottom'>
                        <button>
                            Visit
                        </button>
                    </div>
                </div>
                <div className='item'>
                    <div className='friends-top'>
                        <img src='https://images.pexels.com/photos/2055500/pexels-photo-2055500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
                        <span className='friends-name'>
                            Viet Tung
                        </span>
                    </div>
                    <div className='friends-mid'>
                        <div className='friends-left'>
                            <FacebookIcon style={{fontSize : 30}}/>
                            <InstagramIcon style={{fontSize: 30}}/>
                            <LinkedInIcon style={{fontSize: 30}}/>
                        </div>
                        <div className='friends-center'>
                            <div className='friends-position'>
                                <PlaceIcon style={{fontSize: 25}} className='logo'/>
                                <span>England</span>
                            </div>
                            <div className='friends-phone'>
                                <PhoneIcon style={{fontSize: 25}} className='logo'/>
                                <span>+840123456789</span>
                            </div>
                        </div>
                        <div className='friends-right'>
                            <MailOutlineIcon style={{fontSize: 30}}/>
                            <MoreVertIcon style = {{fontSize: 30}}/>
                        </div>
                    </div>
                    <div className='friends-bottom'>
                        <button>
                            Visit
                        </button>
                    </div>
                </div>
                <div className='item'>
                    <div className='friends-top'>
                        <img src='https://images.pexels.com/photos/2055500/pexels-photo-2055500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
                        <span className='friends-name'>
                            Viet Tung
                        </span>
                    </div>
                    <div className='friends-mid'>
                        <div className='friends-left'>
                            <FacebookIcon style={{fontSize : 30}}/>
                            <InstagramIcon style={{fontSize: 30}}/>
                            <LinkedInIcon style={{fontSize: 30}}/>
                        </div>
                        <div className='friends-center'>
                            <div className='friends-position'>
                                <PlaceIcon style={{fontSize: 25}} className='logo'/>
                                <span>England</span>
                            </div>
                            <div className='friends-phone'>
                                <PhoneIcon style={{fontSize: 25}} className='logo'/>
                                <span>+840123456789</span>
                            </div>
                        </div>
                        <div className='friends-right'>
                            <MailOutlineIcon style={{fontSize: 30}}/>
                            <MoreVertIcon style = {{fontSize: 30}}/>
                        </div>
                    </div>
                    <div className='friends-bottom'>
                        <button>
                            Visit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Friends