import "./post.scss";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Comments from "../comments/Comments.js";
import { useEffect, useState, useRef } from "react";
import ImageSlider from "./ImageSlider.js";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const Post = ({ post }) => {
  const items = [{
    id: 1,
    value: "Report",
    icon: <ReportGmailerrorredIcon style = {{fontSize: 25}}/>
  }]
  //comment state
  const [commentOpen, setCommentOpen] = useState(false);
  const [like,setLike] = useState(false)

  //Dropdown state
  const [openDropdown, setOpenDropdown] = useState(false);
  const toggleDropdown = () => setOpenDropdown(!openDropdown);
  const dropdownRef = useRef(null);
  const postRef = useRef(null);

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
      console.log("100");
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

  useEffect(() => {
    getImages(post.postId);
  }, []);

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
  //get comment quantity
  // Queries
  const {isLoading, error, data: cmts} = useQuery({
      queryKey: ["cmts",post.postId],
      queryFn: async () => {
      try {
          return await axios
          .get(`http://localhost:3001/posts/comments/${post.postId}`)
          .then((response) => {
              return response.data;
          });
      } catch (error) {
          throw error; 
      }
      },
  });

  // console.log('====================================');
  // console.log(cmts?.comments.length);
  // console.log('====================================');

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
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span>{post.user.userId}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <div className="extra-functions">
            <MoreHorizIcon onClick = {()=>toggleDropdown(!openDropdown)} ref={postRef} className="icon"/>
            
            <div className="dropdown" ref={dropdownRef}>
              {openDropdown && (
                <ul className="post-dropdown">
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
          <p>{post.content}</p>
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
          <div className="item" onClick={() => setLike(!like)}>
            {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            12
          </div>

          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <CommentOutlinedIcon />
            {cmts?.comments.length}
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

export default Post;
