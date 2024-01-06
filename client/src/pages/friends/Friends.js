import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import './friends.scss'
import { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Friends = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const extraFunctionRef = useRef(null);
    const { currentUser } = useContext(AuthContext);
    const { data: FriendsInfo } = useQuery({
        queryKey: ["FriendsInfo"],
        queryFn: async () => {
            try {
                return await axios
                    .get(`http://localhost:3001/user/friends/${currentUser.userId}`)
                    .then((response) => {
                        return response.data;
                    });
            } catch (error) {
                throw error;
            }
        },
    });


    const toggleDropdown = (friendId) => {
        setOpenDropdown(prevState => ({
            ...prevState,
            [friendId]: !prevState[friendId]
        }));
    };

    const items = [
        {
            id: 1,
            value: "Remove friend",
            icon: <PersonRemoveIcon style={{ fontSize: 25 }} />,
        },]
    // console.log('====================================');
    // console.log(FriendsInfo);
    // console.log('====================================');

    //Click out of dropdown
    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    });

    //Click dropdown 
    function handleOnClick(friendId, item) {
        if (item.id == 1) {
            console.log("1");
        }
    }

    const handleClick = (e) => {
        if (extraFunctionRef.current && !extraFunctionRef.current.contains(e.target)) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpenDropdown(false);
            } else if (openDropdown && extraFunctionRef.current.contains(e.target)) {
                setOpenDropdown(!openDropdown);
            }
        }
    };

    return (
        <div className='friends'>
            <div className="title">
                <p>Friends</p>
                <AutoAwesomeIcon style={{ fontSize: 20 }} />
            </div>
            <div className="content-container">
                {FriendsInfo && FriendsInfo.friends.map((friend) => (
                    <div className='item'>
                        <div className='friends-top'>
                            <img src='https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='' />
                            <span className='friends-name'>
                                {friend.userId}
                            </span>
                        </div>
                        <div className='friends-mid'>
                            <div className='friends-left'>

                            </div>
                            <div className='friends-center'>
                                <FacebookIcon style={{ fontSize: 30 }} className='logo'/>
                                <InstagramIcon style={{ fontSize: 30 }} className='logo'/>
                                <LinkedInIcon style={{ fontSize: 30 }} className='logo'/>
                            </div>
                            <div className='friends-right'>
                                <MoreVertIcon style={{ fontSize: 30 }} onClick={()=>toggleDropdown(friend.userId) }
                                ref = {extraFunctionRef} className='logo'/>
                                <div className="dropdown" ref={dropdownRef}>
                                    {openDropdown[friend.userId] && (
                                        <ul className="extra-function-dropdown">
                                            {items.map((item) => (
                                                <li className="list-item" key={item.id}>
                                                    <button onClick={() => handleOnClick(friend.userId, item)}>
                                                        <span>{item.value}</span>
                                                        {item.icon}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='friends-bottom'>
                            <button>
                                Visit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Friends