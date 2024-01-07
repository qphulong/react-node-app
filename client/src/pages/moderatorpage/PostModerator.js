import  './postModerator.scss';

const PostModerator = () => {
    return (
        <div className='post-moderator'>
            <div className='top-part'>
                <img src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='' className='profile-picture'/>
                <div className='post-info'>
                    <span className='user-name'>Hong Nhut</span>
                    <span className='time'>1 min ago</span>
                </div>
            </div>
            <div className='middle-part'>
                <div className='content'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
                </div>
                <div className='picture-list'>
                    <img src='https://pbs.twimg.com/media/GCfJUsAaEAATOon?format=jpg&name=4096x4096' alt='' className='
                    picture'/>
                    <img src='https://pbs.twimg.com/media/GCfJLAEaMAAXvmP?format=jpg&name=4096x4096' alt='' className='
                    picture'/>
                    <img src='https://pbs.twimg.com/media/GCfJLAEaMAAXvmP?format=jpg&name=4096x4096' alt='' className='
                    picture'/>  
                    <img src='https://pbs.twimg.com/media/GCfJUsAaEAATOon?format=jpg&name=4096x4096' alt='' className='
                    picture'/>    
                </div>
            </div>
            <div className='bottom-part'>
                <button className='accept-btn'>Accept</button>
                <button className='reject-btn'>Reject</button>
            </div>
        </div>
    )
}

export default PostModerator