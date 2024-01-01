import './rightBar.scss'

function RightBar(){
    return (
        <div className = "rightBar">
            <div className='container'>
                <div className='online-friends'>
                    <span>My Friends</span>

                    <div className='user'>
                        <div className='userInfo'>
                            <img src='https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
                            alt=''/>
                            <span>TMK</span>   
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RightBar;