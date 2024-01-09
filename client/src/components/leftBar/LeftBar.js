import "./leftBar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import EnhancedEncryptionOutlinedIcon from "@mui/icons-material/EnhancedEncryptionOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import AddModeratorOutlinedIcon from "@mui/icons-material/AddModeratorOutlined";
import axios from "axios";
import { Link } from "react-router-dom";
const LeftBar = () => {
  const { currentUser, profileImage } = useContext(AuthContext);
  const [isModerator, setIsModerator] = useState(false);

  const fetchModeratorStatus = async () => {
    try {
      const response = await axios.get(
        window.backendURL + `/user/${currentUser.userId}/moderator`
      );

      console.log(response.data);

      if (response.status === 200) {
        setIsModerator(response.data.isModerator);
      } else {
        console.log(`Unexpected response: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      console.error("Error fetching moderator status:", error.message);
    }
  };

  useEffect(() => {
    fetchModeratorStatus();
  }, []);
  //===================================================================================================================
  //profile image
  // const [profileImage,setProfileImage] = useState("https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
  // const fetchProfileImage = async () => {
  //   try {
  //     const response = await axios.get(window.backendURL + `/user/profile-pic/${currentUser.userId}`);

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
          <Link to={"/"} className="item">
            <HomeOutlinedIcon style={{ fontSize: 30 }} className="logo" />
            <span>Home</span>
          </Link>

          {/* <div className="item">
            <NotificationsNoneOutlinedIcon style={{ fontSize: 30 }} />
            <span>Notifications</span>
          </div> */}

          <Link to={`/profile/${currentUser.userId}`} className="item">
            <PersonOutlineOutlinedIcon
              style={{ fontSize: 30 }}
              className="logo"
            />
            <span>Profile</span>
          </Link>

          <Link to={"/friends"} className="item">
            <PeopleOutlineIcon style={{ fontSize: 30 }} className="logo" />
            <span>Friends</span>
          </Link>

          <Link to={"/addfriends"} className="item">
            <PersonAddAltIcon style={{ fontSize: 30 }} className="logo" />
            <span>Add Friends</span>
          </Link>

          <Link to={"/change"} className="item">
            <EnhancedEncryptionOutlinedIcon
              style={{ fontSize: 30 }}
              className="logo"
            />
            <span>Change</span>
          </Link>

          {isModerator && (
            <Link to={"/moderators"} className="item">
              <AddModeratorOutlinedIcon
                style={{ fontSize: 30 }}
                className="logo"
              />
              <span>Moderators</span>
            </Link>
          )}
        </div>
        <div className="button-container">
          <Link to="/">
            <button>Share</button>
          </Link>
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
