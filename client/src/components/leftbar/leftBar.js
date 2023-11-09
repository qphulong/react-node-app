import './leftBar.scss'

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
                        <img src='' alt=''/>
                        <span>Friends</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftBar;