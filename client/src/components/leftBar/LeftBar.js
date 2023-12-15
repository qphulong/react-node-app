import './leftBar.scss'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PeopleIcon from '@mui/icons-material/People';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import { Button } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
const LeftBar = () => {
    return (
        <div className='leftBar'>
            <div className='container'>
                <div className='menu'>
                    <div className='item'>
                        <HomeOutlinedIcon/>
                        <span>Home</span>
                    </div>

                    <div className='item'>
                        <NotificationsNoneOutlinedIcon/>
                        <span>Notifications</span>
                    </div>

                    <div className='item'>
                        <PersonOutlineOutlinedIcon  />
                        <span>Profile</span>
                    </div>

                    <div className='item'>
                        <PeopleIcon/>
                        <span>Friends</span>
                    </div>

                    <div className='item'>
                        <PersonAddIcon/>
                        <span>Add Friends</span>
                    </div>

                    <div className='item'>
                        <DensitySmallIcon/>
                        <span>More</span>
                    </div>
                </div>

                <Button>Tweet</Button>

                <div className='user'>
                    <img src='https://images.pexels.com/photos/2055500/pexels-photo-2055500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
                    <span>Jony Doe</span>
                    <MoreHorizIcon/>
                </div>
            </div>
        </div>
    )
}

export default LeftBar