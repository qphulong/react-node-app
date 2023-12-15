import './navBar.scss'
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
const NavBar = () => {
    return (
        <div className='navBar'>
            <div className='left'>
                <Link to = '/' style={{textDecoration: 'None'}}>
                    <span>OnlyMe</span>
                </Link>
                <HomeOutlinedIcon/>
                <Brightness6Icon/>

                <div className='dateTime'>
                    14th December 2023
                </div>
            </div>
            <div className='right'>
                <PersonOutlineOutlinedIcon/>
                <EmailOutlinedIcon/>
                <NotificationsNoneOutlinedIcon/>

                <div className='user'>
                    <img src='https://images.pexels.com/photos/2055500/pexels-photo-2055500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
                    <span>Jony Doe</span>
                </div>
            </div>
        </div>
    )
}

export default NavBar