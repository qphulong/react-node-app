import "./navBar.scss";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Datetime from "../datetime/Datetime";

const NavBar = () => {
  const items = [
    {
      id: 1,
      value: "Profile page",
      icon: <AccountCircleIcon style={{ fontSize: 25 }} />,
    },
    {
      id: 2,
      value: "Change password",
      icon: <SettingsIcon style={{ fontSize: 25 }} />,
    },
    {
      id: 3,
      value: "Log out",
      icon: <LogoutIcon style={{ fontSize: 25 }} />,
    },
  ];

  const { darkMode, toggle } = useContext(DarkModeContext);
  const { currentUser, login, logout } = useContext(AuthContext);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selection, setSelection] = useState([]);
  const toggleDropdown = () => setOpenDropdown(!openDropdown);
  const profileRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  function handleOnClick(item) {
    if (item.id == 1) {
      console.log("1");
    } else if (item.id == 2) {
      console.log("2");
    } else if (item.id == 3) {
      logout();

      window.location.reload();
    }
  }

  const handleClick = (e) => {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      } else if (openDropdown && profileRef.current.contains(e.target)) {
        setOpenDropdown(!openDropdown);
      }
    }
  };

  return (
    <div className="navBar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "None" }}>
          <div className="logo">
            <span>OnlyMe</span>
          </div>
        </Link>
        <HomeOutlinedIcon style={{ fontSize: 30 }} />
        {darkMode ? (
          <Brightness6Icon style={{ fontSize: 30 }} onClick={toggle} />
        ) : (
          <WbSunnyIcon style={{ fontSize: 30 }} onClick={toggle} />
        )}
      </div>
      <div className="dateTime">
        <Datetime />
      </div>
      <div className="right">
        <PersonOutlineOutlinedIcon style={{ fontSize: 30 }} />
        <EmailOutlinedIcon style={{ fontSize: 30 }} />
        <NotificationsNoneOutlinedIcon style={{ fontSize: 30 }} />

        <div
          className="user"
          onClick={() => toggleDropdown(!openDropdown)}
          ref={profileRef}
        >
          <div className="user-info">
            <img src={currentUser.profilePic} alt="" />
            <span>{currentUser.name}</span>
          </div>
        </div>
        <div className="dropdown" ref={dropdownRef}>
          {openDropdown && (
            <ul className="profile-dropdown">
              {items.map((item) => (
                <li className="list-item" key={item.id}>
                  <button onClick={() => handleOnClick(item)}>
                    <span>{item.value}</span>
                    {item.icon}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
