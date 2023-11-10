import "./profile.scss"
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Background from "../../assets/tmp.png"



export default function () {
  return (
    <div className='profile'>
        <div className='images'>
            <img src={Background} alt="ok bro" className='cover'/>
            <img src={Background} alt="" className='profilePic'/>
        </div>
        <div className="profileContainer">
          <div className="uInfo">
            <div className="left">
              <a href="https://www.facebook.com/">
                <FacebookTwoToneIcon fontSize="medium"/>
              </a>
              <a href="https://www.instagram.com/">
                <InstagramIcon fontSize="medium"/>
              </a>
              <a href="https://www.pinterest.com/">
                <PinterestIcon fontSize="medium"/>
              </a>
              <a href="https://www.linkedin.com/feed/">
                <LinkedInIcon fontSize="medium"/>
              </a>
            </div>
            <div className="center">
              <span>Username</span>
              <div className="info">
                <div className="item">
                  <PlaceIcon fontSize="medium"/>
                  <span>VietNam</span>
                </div>
                <div className="item">
                  <LanguageIcon fontSize="medium"/>
                  <span>VietNam</span>
                </div>
                
              </div>
              <button>
                  follow
                </button>
            </div>
            <div className="right">
              <EmailIcon/>
              <MoreVertIcon/>
            </div>
          </div>

        </div>
    </div>
  )
}


