import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./postModerator.scss";
import { useEffect, useState, useRef, useContext } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const PostModerator = ({ postIdModerator }) => {
  // const [images, setImages] = useState(['https://pbs.twimg.com/media/GCfJUsAaEAATOon?format=jpg&name=4096x4096',
  // 'https://pbs.twimg.com/media/GCfJLAEaMAAXvmP?format=jpg&name=4096x4096',
  // 'https://pbs.twimg.com/media/GCfHyvCaUAAODgW?format=jpg&name=4096x4096']);
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [currentPost, setCurrentPost] = useState(null);
  const length = images?.length;

  const nextSlide = () => {
    setCurrent((prevCurrent) =>
      prevCurrent === length - 1 ? 0 : prevCurrent + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prevCurrent) =>
      prevCurrent === 0 ? length - 1 : prevCurrent - 1
    );
  };

  //=================================================================================================
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
    getImages(postIdModerator);
  }, []);
  //=================================================================================================
  //=================================================================================================
  //Get info of one post
  const getOnePost = async () => {
    try {
      const response = await axios.get(
        window.backendURL + `/posts/retrieve/${postIdModerator}`
      );

      if (response.status === 200) {
        console.log("====================================");
        console.log("get successfully", response.data.post);
        console.log("====================================");
        setCurrentPost(response.data.post);
      } else {
        console.log(`Unexpected response: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  useEffect(() => {
    getOnePost();
  }, []);
  //=================================================================================================
  //=================================================================================================
  // Handle Click Keep
  const queryClient = useQueryClient();

  // Mutations
  const mutationKeep = useMutation({
    mutationFn: () => {
      return axios.put(window.backendURL + `/user/moderator/keep`, {
        postId: postIdModerator,
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["ModeratorPosts"] });
      console.log("====================================");
      console.log("Keep: ", postIdModerator);
      console.log("====================================");
      toast.success("Post kept successfully!");
    },
  });
  const handleKeep = (e) => {
    e.preventDefault();
    mutationKeep.mutate({ postIdModerator });
  };
  //=================================================================================================
  //=================================================================================================
  // Handle Click Remove
  // Mutations
  const mutationRemove = useMutation({
    mutationFn: () => {
      return axios.put(window.backendURL + `/user/moderator/remove`, {
        postId: postIdModerator,
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["ModeratorPosts"] });
      console.log("====================================");
      console.log("Remove: ", postIdModerator);
      console.log("====================================");
      toast.success("Post removed successfully!");
    },
  });
  const handleRemove = (e) => {
    e.preventDefault();
    mutationRemove.mutate({ postIdModerator });
  };

  //=================================================================================================
  //=================================================================================================

  return (
    <div className="post-moderator">
      <div className="middle-part">
        <div className="content">
          <span>Post content</span>
          <div className="post-content">
            {currentPost ? currentPost.content : "Nothing"}
          </div>
        </div>
        {images && (
          <div>
            {images.length != 0 ? <span>Post images</span> : <span></span>}

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
          </div>
        )}
      </div>
      <div className="bottom-part">
        <button className="accept-btn" onClick={handleKeep}>
          Keep
        </button>
        <button className="reject-btn" onClick={handleRemove}>
          Remove
        </button>
      </div>
      {<ToastContainer />}
    </div>
  );
};

export default PostModerator;
