import { ToastContainer, toast } from "react-toastify";
import "./userElement.scss"
import axios from "axios";
import { useState } from "react";

const UserElement = ({userIdElement}) => {
    
    const [check,setCheck] = useState(false)

    //========================================================================================
    //========================================================================================
    // assign moderator
    const AssignModerator = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/user/admin/assign`,{
                userId : userIdElement
            });

            if (response.status === 200) {
                console.log('====================================');
                console.log(response.data);
                console.log('====================================');
                toast.success('Assign Moderator successfully'); // Display success toast
                setCheck(true)
            }
            else {
                console.log(`Unexpected response: ${JSON.stringify(response.data)}`);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleAssignModerator = () => {
        AssignModerator()
    }
    //========================================================================================
    //========================================================================================

    const handleDeleteModerator = () => {

    }

    return (
        <div className='user-element'>
            <div className='user-info'>
                <img src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='' className='user-picture' />
                <span className='user-name'>{userIdElement}</span>
            </div>
            {check === false ? 
            <button className='set-moderator-button' onClick={handleAssignModerator}>Assign Moderator</button> :
            <button className='set-moderator-button' onClick={handleDeleteModerator}>Delete Moderator</button>}
            {<ToastContainer/>}
        </div>
    )
}

export default UserElement