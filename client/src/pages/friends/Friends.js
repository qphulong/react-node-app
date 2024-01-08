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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Friends = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const dropdownRefs = useRef({});
    const extraFunctionRef = useRef(null);
    const { currentUser } = useContext(AuthContext);
    const [friend, setFriend] = useState(null);
    const { data: FriendsInfo } = useQuery({
        queryKey: ["FriendsInfo"],
        queryFn: async () => {
            try {
                return await axios
                    .get(`http://localhost:3001/user/friends/${currentUser.userId}`)
                    .then((response) => {
                        console.log('====================================');
                        console.log(response.data);
                        console.log('====================================');
                        return response.data;
                    });
            } catch (error) {
                throw error;
            }
        },
    });

    const responseData = async (friendIdPro) => {
        try {
            const res = await axios.delete("http://localhost:3001/user/friends", {
                data: { userId: currentUser.userId, friendId: friendIdPro }
            });

            console.log('====================================');
            console.log(res);
            console.log('====================================');
            window.location.reload();
        } catch (error) {
            console.error('====================================');
            console.error(error);
            console.error('====================================');
        }
    }

    useEffect(() => {
        responseData(friend);
    }, [friend]);
    //=========================================================================================================
    //=========================================================================================================
    // DELETE FRIEND FUNCTION
    // const queryClient = useQueryClient()
    // // Mutations
    // const mutationDelete = useMutation({
    //     mutationFn: (friendId) => {
    //     return axios.delete(`http://localhost:3001/user/friends`,{
    //         userId: currentUser.userId,
    //         friendId: friendId
    //     });
    //     },
    //         onSuccess: () => {
    //         console.log("Delete friend success!");
    //         queryClient.invalidateQueries({ queryKey: ["FriendsInfo"] });
    //     },
    //         onError: (error) => {
    //         console.error("Delete friend error:", error);
    //     },
    // });

    // const handleDeletePost = (friendId) => {
    //     mutationDelete.mutate({ friendId }, {
    //         onSuccess: () => {
    //             console.log("DELETE request sent successfully");
    //         },
    //         onError: (error) => {
    //             console.log("DELETE request error:", error);
    //         }
    //     });
    // };
    //=========================================================================================================
    //=========================================================================================================


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
    // useEffect(() => {
    //     document.addEventListener("mousedown", handleClick);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClick);
    //     };
    // });

    useEffect(() => {
        const handleClick = (friendId, e) => {
            if (
                openDropdown[friendId] &&
                dropdownRefs.current[friendId] &&
                !dropdownRefs.current[friendId].contains(e.target) &&
                extraFunctionRef.current &&
                !extraFunctionRef.current.contains(e.target)
            ) {
                setOpenDropdown((prevState) => ({
                    ...prevState,
                    [friendId]: false,
                }));
            }

        };

        document.addEventListener("mousedown", (e) => {
            Object.keys(openDropdown).forEach((friendId) => {
                handleClick(friendId, e);
            });
        });

        return () => {
            document.removeEventListener("mousedown", (e) => {
                Object.keys(openDropdown).forEach((friendId) => {
                    handleClick(friendId, e);
                });
            });
        };
    }, [openDropdown]);

    //Click dropdown 
    function handleOnClick(friendId, item) {
        if (item.id == 1) {
            console.log("1");
            setFriend(friendId)
            // handleDeletePost(friendId)
        }
    }
    //===================================================================================================================
    //profile image
    const [profileImages, setProfileImages] = useState({});
    const fetchProfileImage = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3001/user/profile-pic/${id}`);

            if (response.status === 200) {
                const imageFilename = response.data
                // console.log('====================================');
                // console.log(imageFilename.profilePic);
                // console.log('====================================');
                setProfileImages((prevProfileImages) => ({
                    ...prevProfileImages,
                    [id]: imageFilename.profilePic,
                }));
            } else {
                console.log(`Unexpected response: ${JSON.stringify(response.data)}`);
            }
        } catch (error) {
            console.error('Error fetching profile image:', error.message);
        }
    };
    useEffect(() => {
        if (FriendsInfo && FriendsInfo.friends) {
            FriendsInfo.friends.forEach((friend) => {
                fetchProfileImage(friend.userId);
            });
        }
    }, [FriendsInfo]);
    //===================================================================================================================
    return (
        <div className='friends'>
            <div className="title">
                <p>Friends</p>
                <AutoAwesomeIcon style={{ fontSize: 20 }} className='logo' />
            </div>
            <div className="content-container">
                {FriendsInfo && FriendsInfo.friends.map((friend) => (
                    <div className='item' key={friend.userId}>
                        <div className='friends-top'>
                            <img src={profileImages[friend.userId] || 'https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} alt='' />
                            <span className='friends-name'>
                                {friend.userId}
                            </span>
                        </div>
                        <div className='friends-mid'>
                            <Link to={`/profile/${friend.userId}`}>
                                <button>
                                    Visit
                                </button>
                            </Link>
                            <MoreVertIcon style={{ fontSize: 30 }} onClick={() => toggleDropdown(friend.userId)}
                                ref={extraFunctionRef} className='logo' />
                            <div className="dropdown" ref={(ref) => (dropdownRefs.current[friend.userId] = ref)}>
                                {openDropdown[friend.userId] && (
                                    <ul className="extra-function-dropdown">
                                        {items.map((item) => (
                                            <li className="list-item" key={item.id}>
                                                <button onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleOnClick(friend.userId, item);
                                                }
                                                }>
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
                ))}
            </div>
        </div>
    )
}

export default Friends