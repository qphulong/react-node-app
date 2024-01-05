import "./leftBar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PeopleIcon from "@mui/icons-material/People";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import EnhancedEncryptionOutlinedIcon from '@mui/icons-material/EnhancedEncryptionOutlined';
import axios from "axios";
const LeftBar = () => {
  const { currentUser,profileImage } = useContext(AuthContext);
  //===================================================================================================================
  //profile image
  // const [profileImage,setProfileImage] = useState("https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
  // const fetchProfileImage = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:3001/user/profile-pic/${currentUser.userId}`);
  
  //     if (response.status === 200) {
  //       const imageFilename = response.data
  //       console.log('====================================');
  //       console.log(imageFilename.profilePic);
  //       console.log('====================================');
  //       setProfileImage(imageFilename.profilePic)
  //     } else {
  //       console.log(`Unexpected response: ${JSON.stringify(response.data)}`);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching profile image:', error.message);
  //   }
  // };
  // useEffect(() => {
  //   fetchProfileImage();
  // },[])
  // fetchProfileImage();
  //===================================================================================================================

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="item">
            <HomeOutlinedIcon style={{ fontSize: 30 }} />
            <span>Home</span>
          </div>

          {/* <div className="item">
            <NotificationsNoneOutlinedIcon style={{ fontSize: 30 }} />
            <span>Notifications</span>
          </div> */}

          <div className="item">
            <PersonOutlineOutlinedIcon style={{ fontSize: 30 }} />
            <span>Profile</span>
          </div>

          <div className="item">
            <PeopleIcon style={{ fontSize: 30 }} />
            <span>Friends</span>
          </div>

          <div className="item">
            <PersonAddIcon style={{ fontSize: 30 }} />
            <span>Add Friends</span>
          </div>

          <div className="item">
            <EnhancedEncryptionOutlinedIcon style={{ fontSize: 30 }} />
            <span>Change Password</span>
          </div>

          <div className="item">
            <DensitySmallIcon style={{ fontSize: 30 }} />
            <span>More</span>
          </div>
        </div>
        <div className="button-container">
          <button>Tweet</button>
        </div>

        <div className="user">
          <img src={profileImage} alt="" />
          <div className="user-info">
            <span className="user-name">{currentUser.userId}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
