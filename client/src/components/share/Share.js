import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import "./share.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useState } from "react";
import {
  useMutation,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
const Share = () => {
  const { currentUser } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  // =================================================================================================
  // =================================================================================================
  // check limit images + limit word

  // =================================================================================================
  // =================================================================================================

  // const [newPost, setNewPost] = useState(null);
  // console.log('====================================');
  // console.log(file);
  // console.log('====================================');
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

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts",currentUser.userId] });
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
            src="https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <input
            type="text"
            placeholder={`What's on your mind ${currentUser.name}?`}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              multiple
              onChange={(e) => setFile(e.target.files)}
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
                <button onClick={() => removeImage(index)}>Remove</button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Share;
