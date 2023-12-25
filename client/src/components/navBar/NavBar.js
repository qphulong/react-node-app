import './navBar.scss'
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { DarkModeContext } from '../../context/darkModeContext';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
const NavBar = () => {

    const {darkMode,toggle} = useContext(DarkModeContext);
    const {currentUser} = useContext(AuthContext)

    return (
        <div className='navBar'>
            <div className='left'>
                <Link to = '/' style={{textDecoration: 'None'}}>
                    <div className='logo'>
                        <span>OnlyMe</span>
                    </div>
                </Link>
                <HomeOutlinedIcon style={{ fontSize: 30 }}/>
                {darkMode ? <Brightness6Icon style={{ fontSize: 30 }} onClick={toggle}/>  
                          : <WbSunnyIcon style={{ fontSize: 30 }} onClick={toggle}/>}
            </div>
            <div className='dateTime'>
                    14th December 2023
            </div>
            <div className='right'>
                <PersonOutlineOutlinedIcon style={{ fontSize: 30 }}/>
                <EmailOutlinedIcon style={{ fontSize: 30 }}/>
                <NotificationsNoneOutlinedIcon style={{ fontSize: 30 }}/>

                <div className='user'>
                    <img src={currentUser.profilePic} alt=''/>
                    <span>{currentUser.name}</span>
                </div>
            </div>
        </div>
    )
}

export default NavBar