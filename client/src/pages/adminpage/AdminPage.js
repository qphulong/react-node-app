import LogoutIcon from '@mui/icons-material/Logout';
import './adminPage.scss'
const AdminPage = () => {
    return (
        <div className='admin-page'>
            <div className='nav-bar'>
                <div className='left'>
                    <div className='logo'>
                        <span>OnlyMe</span>
                    </div>
                </div>
                <div className='middle'>
                    <div className='datetime'>
                        14th December 2023
                    </div>
                </div>
                <div className='right'>
                    <LogoutIcon style={{ fontSize: 40 }} />
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
                <div className='user'>
                    <div className='user-info'>
                        <img src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='' className='user-picture' />
                        <span className='user-name'>Username</span>
                    </div>
                    <button className='set-moderator-button'>Set Moderator</button>
                </div>
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