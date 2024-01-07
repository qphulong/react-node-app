import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import "./share.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify"
import {
  useMutation,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
const Share = () => {
  const { currentUser, profileImage } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  // =================================================================================================
  // =================================================================================================
  // check limit images + limit word
  const MAX_WORD = 150;
  const MAX_IMAGE = 5;
  const [descWord, setDescWord] = useState(0);

  // console.log(file)


  const handleContentChange = (e) => {
    const content = e.target.value.split(" ")
    setDescWord(content.length)

    if (content.length <= MAX_WORD) {
      setDesc(e.target.value)

      if (e.target.value == '') {
        setDescWord(0)
      }
    }
    else {
      setDesc(e.target.value.slice(0, desc.length))
      toast.warning("Your content is out of limit", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  const handleImageLimit = (e) => {

    setFile(e.target.files)
    const imageLength = e.target.files.length
    if (imageLength > MAX_IMAGE) {
      toast.warning("Your image is out of limit", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setFile(null)
    }
  }

  // =================================================================================================
  // =================================================================================================

  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation({
    mutationFn: (newPost) => {
      return axios.post("http://localhost:3001/posts", {
        content: desc,
        userId: currentUser.userId,
      });
    },
    onSuccess: (response) => {
      // Access the newly created post object here
      // setNewPost(response.data);

      // const newPostObject = response.data;
      // console.log("Newly added post:", typeof(newPostObject));
      if (file) upload(response.data);

      // add more
      setDesc("");
      setFile(null);

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts", currentUser.userId] });
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc });
    // print
    // console.log(newPostId);

  };

  //upload
  const upload = async (newPostUpdate) => {
    try {
      const formData = new FormData();
      for (const f of file) {
        formData.append("images", f);
      }
      // console.log('====================================');
      // console.log(newPostUpdate);
      // console.log('====================================');
      // console.log('====================================');
      // console.log(newPostUpdate.post);
      // console.log('====================================');
      const response = await axios.post(
        `http://localhost:3001/storage/upload/${newPostUpdate.post}`,
        formData
      );

      if (response.status === 200) {
        // console.log("oke 200");
        return response.data;
      } else {
        console.error("Upload failed:", response.statusText);
        throw new Error("File upload failed"); // Re-throw for better handling
      }
    } catch (err) {
      console.error("Error during upload:", err.message, err.stack);
      throw err; // Re-throw to allow for further handling
    }
  };

  //remove image
  const removeImage = (indexToRemove) => {
    setFile((prevFile) => {
      const updatedFile = Array.from(prevFile);
      updatedFile.splice(indexToRemove, 1);
      return updatedFile;
    });
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={profileImage}
            alt=""
          />
          <textarea
            type="text"
            placeholder={`What's on your mind ${currentUser.name}?`}
            onChange={(e) => handleContentChange(e)
            }
            value={desc}
          />
        </div>

        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              multiple
              onChange={(e) => handleImageLimit(e)}
              style={{ display: "none" }}
            />
            <label htmlFor="file">
              <div className="item">
                <AddPhotoAlternateIcon style={{ fontSize: 25 }} />
                <span>Add Image</span>
              </div>
            </label>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share now</button>
          </div>
        </div>

        <div className="imageContainerPreview">
          {file &&
            Array.from(file).map((f, index) => (
              <div key={index} className="imagePreview">
                <img src={URL.createObjectURL(f)} alt={`Preview ${index}`} />
                <div className="remove-container">
                  <button onClick={() => removeImage(index)}>X</button>
                  <div className="tool-tip">Remove</div>
                </div>

              </div>
            ))}
        </div>
      </div>
      {<ToastContainer />}
    </div>
  );
};

export default Share;
