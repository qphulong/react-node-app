import "./profile.scss"
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function () {
  return (
    <div className='profile'>
        <div className='images'>
            <img src="./assets/tmp.png" alt="" className='cover'/>
            <img src="./assets/tmp.png" alt="" className='profilePic'/>
        </div>
        <div className="profileContainer">
          <div className="uInfo">
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
            <div className="center">
              <span>Username</span>
              <div className="info">
                <div className="item">
                  <PlaceIcon fontSize="large"/>
                  <span>VietNam</span>
                </div>
                <div className="item">
                  <LanguageIcon fontSize="large"/>
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


