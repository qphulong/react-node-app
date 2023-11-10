import "./profile.scss"
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';


export default function () {
  return (
    <div className='profile'>
        <div className='images'>
            <img src="./assets/tmp.png" alt="" className='cover'/>
            <img src="./assets/tmp.png" alt="" className='profilePic'/>
        </div>
        <div className="profileContainer">
          <div className="uiInfo">
            <div className="left">
              <a href="https://www.facebook.com/">
                <FacebookTwoToneIcon fontSize="large"/>
              </a>
              <a href="https://www.instagram.com/">
                <InstagramIcon fontSize="large"/>
              </a>
              <a href="https://www.pinterest.com/">
                <PinterestIcon fontSize="large"/>
              </a>
              <a href="https://www.linkedin.com/feed/">
                <LinkedInIcon fontSize="large"/>
              </a>
            </div>
            <div className="center"></div>
            <div className="right"></div>
          </div>

        </div>
    </div>
  )
}


