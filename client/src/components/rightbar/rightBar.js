import './rightBar.scss'

function RightBar(){
    return (
        <div className = "rightbar">
            <div className='container'>
                <div className='item'>
                    <span>Suggestions for u</span>
                    <div className='user'>
                        <div className='userInfo'>
                            <img src='https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
                            alt=''/>
                            <span>TMK</span>
                        </div>

                        <div className='buttons'>
                            <button>follow</button>
                            <button>dismiss</button>
                        </div>
                    </div>

                    <div className='user'>
                        <div className='userInfo'>
                            <img src='https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
                            alt=''/>
                            <span>TMK</span>
                        </div>

                        <div className='buttons'>
                            <button>follow</button>
                            <button>dismiss</button>
                        </div>
                    </div>

                </div>

                <div className='item'>
                    <span>Latest Activities</span>
                    <div className='user'>
                        <div className='userInfo'>
                            <img src='https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
                            alt=''/>
                            <p>
                                <span>TMK</span>    
                                Changed their cover picture
                            </p>
                        </div>

                        <span>1 min ago</span>
                    </div>

                    <div className='user'>
                        <div className='userInfo'>
                            <img src='https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
                            alt=''/>
                            <p>
                                <span>TMK</span>    
                                Changed their cover picture
                            </p>
                        </div>

                        <span>1 min ago</span>
                    </div>

                    <div className='user'>
                        <div className='userInfo'>
                            <img src='https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
                            alt=''/>
                            <p>
                                <span>TMK</span>    
                                Changed their cover picture
                            </p>
                        </div>

                        <span>1 min ago</span>
                    </div>

                    <div className='user'>
                        <div className='userInfo'>
                            <img src='https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
                            alt=''/>
                            <p>
                                <span>TMK</span>    
                                Changed their cover picture
                            </p>
                        </div>

                        <span>1 min ago</span>
                    </div>
                </div>

                <div className='item'>
                    <span>Online Friends</span>

                    <div className='user'>
                        <div className='userInfo'>
                            <img src='https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
                            alt=''/>
                            <div className='online'></div>
                            <span>TMK</span>   
                        </div>
                    </div>

                    <div className='user'>
                        <div className='userInfo'>
                            <img src='https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
                            alt=''/>
                            <div className='online'></div>
                            <span>TMK</span>   
                        </div>
                    </div>

                    <div className='user'>
                        <div className='userInfo'>
                            <img src='https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
                            alt=''/>
                            <div className='online'></div>
                            <span>TMK</span>   
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RightBar;