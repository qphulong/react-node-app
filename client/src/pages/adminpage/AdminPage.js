import LogoutIcon from '@mui/icons-material/Logout';
import './adminPage.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import UserElement from './UserElement';

const AdminPage = () => {
    const { currentUser, login, logout, profileImage } = useContext(AuthContext);
    const navigate = useNavigate()
    const [isAdmin,setIsAdmin] = useState(false)
    const [allUsers,setAllUsers] = useState([])

    const handleLogOut = () => {
        logout()
        navigate("/login")
    }

    //==================================================================================
    //==================================================================================
    // Check admin
    const CheckIsAdmin = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/user/${currentUser.userId}/admin`);

            if (response.status === 200) {
                // console.log('====================================');
                // console.log(response.data.isAdmin);
                // console.log('====================================');
                setIsAdmin(response.data.isAdmin)
            }
            else {
                console.log(`Unexpected response: ${JSON.stringify(response.data)}`);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    useEffect(() => {
        CheckIsAdmin()
    },[])
    //==================================================================================
    //==================================================================================
    // get all users
    const GetAllUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/user/admin`);

            if (response.status === 200) {
                // console.log('====================================');
                // console.log(response.data.users);
                // console.log('====================================');
                setAllUsers(response.data.users)
            }
            else {
                console.log(`Unexpected response: ${JSON.stringify(response.data)}`);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    useEffect(() => {
        GetAllUsers()
    },[])
    //==================================================================================
    //==================================================================================

    if(isAdmin === false){
        return (
            <div className='not-admin-page'>
                <div className='notification'>
                    You cannot be here. Only Admins have permission to access this page. <br></br>
                    Please go back to your previous page.
                </div>
                <div className='back-container'>    
                    <LogoutIcon style={{fontSize: 60, color: 'white'}}/>
                </div>
            </div>
        )
    }

    return (
        <div className='admin-page'>
            <div className='nav-bar'>
                <div className='left'>
                    <div className='logo'>
                        <Link to={"/"} style={{textDecoration: "none"}}>
                            <span>OnlyMe</span>
                        </Link>
                    </div>
                </div>
                <div className='middle'>
                    <div className='datetime'>
                        Date
                    </div>
                </div>
                <div className='right'>
                    <LogoutIcon style={{ fontSize: 40 }} onClick={handleLogOut}/>
                </div>
            </div>
            <div className='list-user'>
                {allUsers?.map((user) => {
                    return <UserElement userIdElement = {user} key={user} />;
                })}
            </div>
        </div>

    )
}

export default AdminPage