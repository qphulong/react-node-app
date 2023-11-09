import './leftBar.scss'
import Friends from "../../assets/1.png"
import Group from "../../assets/2.png"
import Market from "../../assets/3.png"
import Watch from "../../assets/4.png"
import Memories from "../../assets/5.png"
import Events from "../../assets/6.png"
import Gaming from "../../assets/7.png"
import Galleries from "../../assets/8.png"
import Video from "../../assets/9.png"
import Messages from "../../assets/10.png"
import Tutorials from "../../assets/11.png"
import Courses from "../../assets/12.png"
import Funds from "../../assets/13.png"

function LeftBar(){
    return (
        <div className = "leftbar">
            <div className='container'>
                <div className='menu'>
                    <div className='user'>
                        <img src='https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
                        alt=''/>
                        <span>TMK</span>
                    </div>

                    <div className='item'>
                        <img src={Friends} alt=''/>
                        <span>Friends</span>
                    </div>

                    <div className='item'>
                        <img src={Group} alt=''/>
                        <span>Group</span>
                    </div>

                    <div className='item'>
                        <img src={Market} alt=''/>
                        <span>Marketplace</span>
                    </div>

                    <div className='item'>
                        <img src={Watch} alt=''/>
                        <span>Watch</span>
                    </div>

                    <div className='item'>
                        <img src={Memories} alt=''/>
                        <span>Memories</span>
                    </div>

                    <hr/>
                    <div className='menu'>
                        <span>Shortcuts</span>

                        <div className='item'>
                            <img src={Events} alt=''/>
                            <span>Events</span>
                        </div>

                        <div className='item'>
                            <img src={Gaming} alt=''/>
                            <span>Gaming</span>
                        </div>

                        <div className='item'>
                            <img src={Galleries} alt=''/>
                            <span>Galleries</span>
                        </div>

                        <div className='item'>
                            <img src={Video} alt=''/>
                            <span>Video</span>
                        </div>

                        <div className='item'>
                            <img src={Messages} alt=''/>
                            <span>Messages</span>
                        </div>
                    </div>

                    <hr/>
                    <div className='menu'>

                        <span>Others</span>
                        <div className='item'>
                            <img src={Tutorials} alt=''/>
                            <span>Tutorials</span>
                        </div>

                        <div className='item'>
                            <img src={Courses} alt=''/>
                            <span>Courses</span>
                        </div>

                        <div className='item'>
                            <img src={Funds} alt=''/>
                            <span>Funds</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftBar;