import "./userElement.scss"

const UserElement = ({userIdElement}) => {
    
    return (
        <div className='user-element'>
            <div className='user-info'>
                <img src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='' className='user-picture' />
                <span className='user-name'>{userIdElement}</span>
            </div>
            <button className='set-moderator-button'>Set Moderator</button>
        </div>
    )
}

export default UserElement