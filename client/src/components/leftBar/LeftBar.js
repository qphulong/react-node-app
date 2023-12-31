import './leftBar.scss'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PeopleIcon from '@mui/icons-material/People';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
const LeftBar = () => {
    const {currentUser} = useContext(AuthContext)

    return (
        <div className='leftBar'>
            <div className='container'>
                <div className='menu'>
                    <div className='item'>
                        <HomeOutlinedIcon style={{ fontSize: 30 }}/>
                        <span>Home</span>
                    </div>

                    <div className='item'>
                        <NotificationsNoneOutlinedIcon style={{ fontSize: 30 }}/>
                        <span>Notifications</span>
                    </div>

                    <div className='item'>
                        <PersonOutlineOutlinedIcon style={{ fontSize: 30 }} />
                        <span>Profile</span>
                    </div>

                    <div className='item'>
                        <PeopleIcon style={{ fontSize: 30 }}/>
                        <span>Friends</span>
                    </div>

                    <div className='item'>
                        <PersonAddIcon style={{ fontSize: 30 }}/>
                        <span>Add Friends</span>
                    </div>

                    <div className='item'>
                        <DensitySmallIcon style={{ fontSize: 30 }}/>
                        <span>More</span>
                    </div>
                </div>
                <div className='button-container'>
                    <button>Tweet</button>
                </div>
                

                <div className='user'>
                    <img src={currentUser.profilePic} alt=''/>
                    <div className='user-info'>
                        <span className='user-name'>{currentUser.name}</span>
                        <span className='user-email'>@jony_doe2003</span>
                    </div>
                
                </div>
            </div>
        </div>
    )
}

export default LeftBar