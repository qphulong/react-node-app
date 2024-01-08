import { ToastContainer, toast } from "react-toastify";
import "./userElement.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const UserElement = ({ userIdElement }) => {
  const [check, setCheck] = useState(false);
  const [isModerator, setIsmoderator] = useState(false);
  //========================================================================================
  //========================================================================================
  //check moderator or not
  const CheckModeratorOrNot = async () => {
    try {
      const response = await axios.get(
        window.backendURL + `/user/${userIdElement}/moderator`
      );

      if (response.status === 200) {
        // console.log('====================================');
        // console.log(response.data.isModerator);
        // console.log('====================================');
        setIsmoderator(response.data.isModerator);
      } else {
        console.log(`Unexpected response: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  useEffect(() => {
    CheckModeratorOrNot();
  }, []);
  //========================================================================================
  //========================================================================================
  // assign moderator
  const AssignModerator = async () => {
    try {
      const response = await axios.put(
        window.backendURL + `/user/admin/assign`,
        {
          userId: userIdElement,
        }
      );

      if (response.status === 200) {
        // console.log('====================================');
        // console.log(response.data);
        // console.log('====================================');
        toast.success("Assign Moderator successfully"); // Display success toast
        setIsmoderator(true);
      } else {
        console.log(`Unexpected response: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleAssignModerator = () => {
    AssignModerator();
  };
  //========================================================================================
  //========================================================================================
  // delete moderator
  const DeleteModerator = async () => {
    try {
      const response = await axios.put(
        window.backendURL + `/user/admin/unassign`,
        {
          userId: userIdElement,
        }
      );

      if (response.status === 200) {
        // console.log('====================================');
        // console.log(response.data);
        // console.log('====================================');
        toast.success("Unassign Moderator successfully"); // Display success toast
        setIsmoderator(false);
      } else {
        console.log(`Unexpected response: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const handleDeleteModerator = () => {
    DeleteModerator();
  };

  return (
    <div className="user-element-container">
      <div className="user-element">
        <div className="user-info">
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="user-picture"
          />
          <span className="user-name">{userIdElement}</span>
        </div>
        {isModerator === false ? (
          <button
            className="assign-moderator-button"
            onClick={handleAssignModerator}
          >
            Assign Moderator
          </button>
        ) : (
          <button
            className="delete-moderator-button"
            onClick={handleDeleteModerator}
          >
            Delete Moderator
          </button>
        )}
      </div>
      {<ToastContainer />}
    </div>
  );
};

export default UserElement;
