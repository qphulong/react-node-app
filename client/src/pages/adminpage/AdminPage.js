import LogoutIcon from '@mui/icons-material/Logout';
import './adminPage.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
const AdminPage = () => {
    const { currentUser, login, logout, profileImage } = useContext(AuthContext);
    const navigate = useNavigate()
    const [isAdmin,setIsAdmin] = useState(false)

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
                console.log('====================================');
                console.log(response.data.isAdmin);
                console.log('====================================');
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
    
    //==================================================================================
    //==================================================================================

    if(isAdmin === false){
        return (
            <div>
                You are not admin
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
                        14th December 2023
                    </div>
                </div>
                <div className='right'>
                    <LogoutIcon style={{ fontSize: 40 }} onClick={handleLogOut}/>
                </div>
            </div>
            <div className='list-user'>
                <div className='user'>
                    <div className='user-info'>
                        <img src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='' className='user-picture' />
                        <span className='user-name'>Username</span>
                    </div>
                    <button className='set-moderator-button'>Set Moderator</button>
                </div>
            </div>
        </div>

    )
}

export default AdminPage