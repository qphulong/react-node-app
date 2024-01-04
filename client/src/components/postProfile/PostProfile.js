import "./postProfile.scss";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Comments from "../comments/Comments.js";
import { useContext, useEffect, useState, useRef } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import PostsProfile from "../postsProfile/PostsProfile.js";
import { AuthContext } from "../../context/authContext.js";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const PostProfile = ({ post }) => {
  const { currentUser, login, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  //comment state
  const [commentOpen, setCommentOpen] = useState(false);

  //Dropdown state
  const [openDropdown, setOpenDropdown] = useState(false);
  const toggleDropdown = () => setOpenDropdown(!openDropdown);
  const dropdownRef = useRef(null);
  const postRef = useRef(null);

  const items = [{
    id: 1,
    value: "Edit content",
    icon: <EditNoteIcon style={{fontSize: 25}}/>,
  },
  {
    id: 2,
    value: "Delete post",
    icon: <DeleteIcon style={{fontSize: 25}}/>,
  }]

  //images
  const [images, setImages] = useState([]); //images = [image1, image2, ...
  //retrieve images from API
  const getImages = async (postId) => {
    const response = await fetch(
      `http://localhost:3001/posts/images/${postId}`
    );
    const data = await response.json();
    // console.log(data);
    setImages(data.images);

    for (let i = 0; i < data.images.length; i++) {
      const image = data.images[i];
      data.images[i] = `http://localhost:3001/${image}`;
    }
  };

  useEffect(() => {
    getImages(post.postId);
  }, []);

  //Check mouse out
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  //Handle the dropdown
  function handleOnClick(item) {
    if (item.id == 1) {
      console.log("1");
      setIsEditing(true);
    } else if (item.id == 2) {
      handleDeletePost();
    } 
  }

  const handleClick = (e) => {
    if (postRef.current && !postRef.current.contains(e.target)) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      } else if (openDropdown && postRef.current.contains(e.target)) {
        setOpenDropdown(!openDropdown);
      }
    }
  };

  //=========================================================================================================
  //=========================================================================================================
  // EDIT POST
  const handleEditConfirm = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/posts`, {
        postId: post.postId,
        newContent: editedContent,
      });

      if (response.status === 200) {
        console.log("Content updated successfully:", response.data);
        setIsEditing(false);
      } else {
        console.error("Error updating content:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating content:", error.message);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedContent(post.content);
  };
  //=========================================================================================================
  //=========================================================================================================
  // Delete post
  const handleDeletePost = async () => {
    console.log(post.postId);
    try {
      const response = await axios.delete(`http://localhost:3001/posts/${post.postId}`);
      console.log(response.data);
      if (response.status === 200) {
        console.log("Post deleted successfully:", response.data);
      } else {
        console.error("Error deleting post:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  //=========================================================================================================
  //=========================================================================================================

  //console.log('====================================');
  //console.log(post.postId);
  //console.log(images);
  //console.log('====================================');
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

//   if (!Array.isArray(images) || images.length <= 0) {
//     return null;
//   }
  //temp
  const liked = false;

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src="https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              atl=""
            />
            <div className="details">
              <span>{currentUser.userId}</span>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <div className="extra-functions">
            <MoreHorizIcon onClick = {()=>toggleDropdown(!openDropdown)} ref={postRef} className="icon"/>
            {/* 1. Change post
            2. Delete post */}
            <div className="dropdown" ref={dropdownRef}>
              {openDropdown && (
                <ul className="post-profile-dropdown">
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

        <div className="content">
          {isEditing ? (
            <div>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <button onClick={handleEditConfirm}>Save</button>
              <button onClick={handleEditCancel}>Cancel</button>
            </div>
          ) : (
            <p>{post.content}</p>
          )}
          {images && 
            <section className='slider'>
                {images.map((image, index) => {
                return (
                <div
                    className={index === current ? 'slide active' : 'slide'}
                    key={index}
                >
                    <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
                    <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
                    {index === current && (
                    <img src={image} alt='travel image' className='image' />
                    )}
                </div>
                );
            })}
            </section>}

          {/* {images.map((image, index) => (
            <img
              src={image}
              alt=""
              key={index}
              style={{ marginRight: "10px" }}
            />
          ))} */}
        </div>

        <div className="info">
          <div className="item">
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            12
          </div>

          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <CommentOutlinedIcon />
            12
          </div>

          <div className="item">
            <ShareOutlinedIcon />
          </div>
        </div>

        {/* <div
          className="images"
          style={{ display: "flex", overflowX: "auto", color: "white" }}
        >
          {images.map((image, index) => (
            <img
              src={image}
              alt=""
              key={index}
              style={{ marginRight: "10px" }}
            />
          ))}
        </div> */}
        {commentOpen && <Comments postId={post.postId}/>}
      </div>
    </div>
  );
};

export default PostProfile;
