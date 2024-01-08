import { useQuery } from "@tanstack/react-query";
import "./rightBar.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

function RightBar() {
  const { currentUser } = useContext(AuthContext);
  const { data: Friends } = useQuery({
    queryKey: ["Friends"],
    queryFn: async () => {
      try {
        return await axios
          .get(window.backendURL + `/user/friends/${currentUser.userId}`)
          .then((response) => {
            return response.data;
          });
      } catch (error) {
        throw error;
      }
    },
  });

  //fetch image profile
  const fetchProfileImage = async (userId) => {
    try {
      const response = await axios.get(
        window.backendURL + `/user/profile-pic/${userId}`
      );

      if (response.status === 200) {
        const imageFilename = response.data;
        return imageFilename.profilePic;
      } else {
        // console.log(`Unexpected response: ${JSON.stringify(response.data)}`);
        return "https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
      }
    } catch (error) {
      //   console.error('Error fetching profile image:', error.message);
      return "https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    }
  };
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (Friends && Friends.friends) {
        const promises = Friends.friends.map(async (friend) => {
          const profileImage = await fetchProfileImage(friend.userId);
          return profileImage;
        });

        const newImages = await Promise.all(promises);

        setImages(newImages);
      }
    };

    fetchData();
  }, [Friends]);

  // console.log('====================================');
  // console.log(Friends);
  // console.log('====================================');

  return (
    <div className="rightBar">
      <div className="container">
        <div className="online-friends">
          <span>My Friends</span>

          {Friends &&
            Friends.friends.map((friend, index) => (
              <div className="user" key={friend.userId}>
                <div className="userInfo">
                  <img src={images[index]} alt={friend.userId} />
                  <span>{friend.userId}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default RightBar;
