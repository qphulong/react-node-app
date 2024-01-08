import "./invitations.scss";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import LogoutIcon from "@mui/icons-material/Logout";

const Invitations = () => {
  const { currentUser } = useContext(AuthContext);
  const [isFriendOrNot, setIsFriendOrNot] = useState(false);
  const [passwordLinkInvite, setPasswordLinkInvite] = useState("");
  useEffect(() => {
    console.log("====================================");
    console.log(passwordLinkInvite);
    console.log("====================================");
  }, [passwordLinkInvite]);
  // const data = "add-friends/tmk3010-e5eaee39-819d-45b8-991f-de9a997fb4b4"
  // const extractedValue = data.split('/')[1].split('-')[0]; // "tmk3010"

  const { link } = useParams();
  const userIdAdd = link.split("-")[0];

  // console.log('====================================');
  // console.log(link);
  // console.log(userId);
  // console.log('====================================');

  const checkIsFriend = async () => {
    try {
      const response = await axios.get(
        window.backendURL +
          `/user/friends/check/${currentUser.userId}/${userIdAdd}`
      );

      if (response.status === 200) {
        // console.log('====================================');
        // console.log("Is friend: ",response.data.isFriend);
        // console.log('====================================');
        setIsFriendOrNot(response.data.isFriend);
      } else {
        console.log(`Unexpected response: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    checkIsFriend();
  }, []);

  if (userIdAdd === currentUser.userId) {
    return (
      <div className="current-user-page">
        <div className="notification">
          You cannot be here. You cannot access to the invitation from yourself.{" "}
          <br></br>
          Please go back to your previous page.
        </div>
        <div className="back-container">
          <Link to={"/"}>
            <LogoutIcon style={{ fontSize: 60, color: "white" }} />
          </Link>
        </div>
      </div>
    );
  }

  // useEffect(() => {
  //     console.log('====================================');
  //     console.log(isFriendOrNot);
  //     console.log('====================================');
  // },[isFriendOrNot])

  if (isFriendOrNot === true) {
    return (
      <div className="already-friend-page">
        <div className="notification">
          You cannot be here. You are already friend with {userIdAdd} <br></br>
          Please go back to your previous page.
        </div>
        <div className="back-container">
          <div>
            <Link to={"/"}>
              <LogoutIcon style={{ fontSize: 60, color: "white" }} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  //add friend
  const addFriend = async () => {
    try {
      const response = await axios.put(
        window.backendURL + `/user/add-friends/${link}`,
        {
          friendId: currentUser.userId,
          linkPassword: passwordLinkInvite,
        }
      );

      if (response.status === 200) {
        console.log("====================================");
        console.log("Add successfully: ", response.data.isFriend);
        console.log("====================================");
        toast.success("Add friend successfully"); // Display success toast
      } else {
        console.log(`Unexpected response: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleClickConfirm = () => {
    addFriend();
  };

  return (
    <div className="invitations">
      <div className="title">
        <span>OnlyMe</span>
      </div>
      <div className="container">
        <div className="content-container">
          <p>You are added by {userIdAdd}</p>
          <div className="input-container">
            <span>Pass: </span>
            <input
              type="text"
              onChange={(e) => setPasswordLinkInvite(e.target.value)}
            />
          </div>
          <div className="confirm-container">
            <Button
              variant="outlined"
              endIcon={<PersonAddAlt1Icon />}
              onClick={handleClickConfirm}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
      {<ToastContainer />}
    </div>
  );
};

export default Invitations;
