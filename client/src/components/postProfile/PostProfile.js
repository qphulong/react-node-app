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
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import PostsProfile from "../postsProfile/PostsProfile.js";
import { AuthContext } from "../../context/authContext.js";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

const PostProfile = ({ imageProfile, userId, post }) => {
  const { currentUser, login, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  //comment state
  const [commentOpen, setCommentOpen] = useState(false);
  const [like, setLike] = useState(false);

  //Dropdown state
  const [openDropdown, setOpenDropdown] = useState(false);
  const toggleDropdown = () => setOpenDropdown(!openDropdown);
  const dropdownRef = useRef(null);
  const postRef = useRef(null);
  const isOwnProfile = currentUser.userId === userId;
  const [timestamp, setTimestamp] = useState(post.createdAt); // Replace with your actual API data
  useEffect(() => {
    const formattedTimestamp = moment(timestamp).fromNow(); // Use moment.js to format
    setTimestamp(formattedTimestamp);
    // console.log('====================================');
    // console.log(timestamp);
    // console.log('====================================');
  }, [post.createdAt]);

  const items = [
    {
      id: 1,
      value: "Edit content",
      icon: <EditNoteIcon style={{ fontSize: 25 }} />,
    },
    {
      id: 2,
      value: "Delete post",
      icon: <DeleteIcon style={{ fontSize: 25 }} />,
    },
  ];

  //images
  const [images, setImages] = useState([]); //images = [image1, image2, ...
  //retrieve images from API
  const getImages = async (postId) => {
    const response = await fetch(window.backendURL + `/posts/images/${postId}`);
    const data = await response.json();
    // console.log(data);
    if (data && data.images) {
      setImages(data.images);

      for (let i = 0; i < data.images.length; i++) {
        const image = data.images[i];
        data.images[i] = window.backendURL + `/${image}`;
      }
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
    if (isOwnProfile) {
      if (item.id == 1) {
        setOpenDropdown(!openDropdown);
        setIsEditing(true);
      } else if (item.id == 2) {
        console.log("2");
        handleDeletePost();
      }
    }
  }

  const handleClick = (e) => {
    if (isOwnProfile) {
      if (postRef.current && !postRef.current.contains(e.target)) {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setOpenDropdown(false);
        } else if (openDropdown && postRef.current.contains(e.target)) {
          setOpenDropdown(!openDropdown);
        }
      }
    }
  };

  //=========================================================================================================
  //=========================================================================================================
  // EDIT POST
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation({
    mutationFn: () => {
      return axios.put(window.backendURL + `/posts`, {
        postId: post.postId,
        newContent: editedContent,
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      setIsEditing(false);
      queryClient.invalidateQueries({
        queryKey: ["postsProfile", currentUser.userId],
      });
      toast.success("Edit post successfully!!!");
    },
  });

  const handleEditConfirm = async (e) => {
    e.preventDefault();
    mutation.mutate({ editedContent });
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedContent(post.content);
  };
  //=========================================================================================================
  //=========================================================================================================
  // DELETE POST FUNCTION

  // Mutations
  const mutationDelete = useMutation({
    mutationFn: () => {
      return axios.delete(window.backendURL + `/posts/${post.postId}`);
    },
    onSuccess: () => {
      console.log("Delete post success!");
      queryClient.invalidateQueries({
        queryKey: ["postsProfile", currentUser.userId],
      });
      toast.success("Delete post successfully!!!");
    },
    onError: (error) => {
      console.error("Delete post error:", error);
    },
  });

  const handleDeletePost = (e) => {
    // e.preventDefault();
    mutationDelete.mutate();
  };
  //=========================================================================================================
  //=========================================================================================================

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
  const {
    isLoading,
    error,
    data: cmtsProfile,
  } = useQuery({
    queryKey: ["cmtsProfile", post.postId],
    queryFn: async () => {
      try {
        return await axios
          .get(window.backendURL + `/posts/comments/${post.postId}`)
          .then((response) => {
            return response.data;
          });
      } catch (error) {
        throw error;
      }
    },
  });

  //===============================================================================================
  // Like function
  // Like function
  const { data: likesProfile } = useQuery({
    queryKey: ["likesProfile", post.postId],
    queryFn: async () => {
      try {
        return await axios
          .get(window.backendURL + `/posts/${post.postId}/likes`)
          .then((response) => {
            return response.data;
          });
      } catch (error) {
        throw error;
      }
    },
  });

  // Mutations
  const mutationLike = useMutation({
    mutationFn: () => {
      return axios.put(window.backendURL + "/posts/likes", {
        userId: currentUser.userId,
        postId: post.postId,
      });
    },
    onSuccess: (response) => {
      console.log("Newly added like:", response.data);

      queryClient.invalidateQueries({
        queryKey: ["likesProfile", post.postId],
      });
    },
    onError: (error, variables, context) => {
      console.log("====================================");
      console.log("error");
      console.log("====================================");
    },
    onSettled: (data, error, variables, context) => {
      console.log("====================================");
      console.log("settle");
      console.log("====================================");
    },
  });

  const handleClickLike = (e) => {
    e.preventDefault();
    fetchLikeData();
    mutationLike.mutate({ user: currentUser.userId, postId: post.postId });
  };

  async function fetchLikeData() {
    try {
      const response = await axios.get(
        window.backendURL + `/posts/${currentUser.userId}/${post.postId}/liked`
      );
      // console.log(response.data.liked);
      if (dem == 0) setLike(response.data.liked);
      else setLike(!response.data.liked);
    } catch (err) {
      console.log(err);
    }
  }

  const [dem, setDem] = useState(0);
  // Call the async function
  useEffect(() => {
    fetchLikeData();
    setDem(dem + 1);
  }, []);

  // console.log('====================================');
  // console.log(cmtsProfile?.comments.length);
  // console.log('====================================');

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={imageProfile} atl="" />
            <div className="details">
              <span>{userId}</span>
              <span className="date">{timestamp}</span>
            </div>
          </div>
          <div className="extra-functions">
            {isOwnProfile ? (
              <MoreHorizIcon
                onClick={() => toggleDropdown(!openDropdown)}
                ref={postRef}
                className="icon"
              />
            ) : (
              <MoreHorizIcon className="icon" />
            )}
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
            <div className="edit-container">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="edit-text"
              />
              <div className="edit-button">
                <button onClick={handleEditConfirm} className="save-button">
                  Save
                </button>
                <button onClick={handleEditCancel} className="cancel-button">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p>{post.content}</p>
          )}
          {images && (
            <section className="slider">
              {images.map((image, index) => {
                return (
                  <div
                    className={index === current ? "slide active" : "slide"}
                    key={index}
                  >
                    <FaArrowAltCircleLeft
                      className="left-arrow"
                      onClick={prevSlide}
                    />
                    <FaArrowAltCircleRight
                      className="right-arrow"
                      onClick={nextSlide}
                    />
                    {index === current && (
                      <img src={image} alt="travel image" className="image" />
                    )}
                  </div>
                );
              })}
            </section>
          )}

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
          <div className="item-container">
            <div className="item" onClick={handleClickLike}>
              {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              {likesProfile?.likes}
            </div>
            <div className="tool-tip">Like</div>
          </div>

          <div className="item-container">
            <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
              <CommentOutlinedIcon />
              {cmtsProfile?.comments.length}
            </div>
            <div className="tool-tip">Comment</div>
          </div>

          <div className="item-container">
            <div className="item">
              <ShareOutlinedIcon />
            </div>
            <div className="tool-tip">Share</div>
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
        {commentOpen && <Comments postId={post.postId} />}
      </div>
      <ToastContainer />
    </div>
  );
};

export default PostProfile;
