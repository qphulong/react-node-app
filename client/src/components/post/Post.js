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
import { useEffect, useState } from "react";

const Post = ({ post }) => {
  //comment state
  const [commentOpen, setCommentOpen] = useState(false);

  //images
  const [images, setImages] = useState([]); //images = [image1, image2, ...
  //retrieve images from API
  const getImages = async (postId) => {
    const response = await fetch(
      `http://localhost:3001/posts/images/${postId}`
    );
    const data = await response.json();
    console.log(data);
    setImages(data.images);

    for (let i = 0; i < data.images.length; i++) {
      const image = data.images[i];
      data.images[i] = `http://localhost:3001/${image}`;
    }
  };

  useEffect(() => {
    getImages(post.postId);
  }, []);

  console.log('====================================');
  console.log(post.postId);
  console.log(images);
  console.log('====================================');
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
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span>{post.user.userId}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>

        <div className="content">
          <p>{post.content}</p>
          {images.map((image, index) => (
            <img
              src={image}
              alt=""
              key={index}
              style={{ marginRight: "10px" }}
            />
          ))}
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
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;
