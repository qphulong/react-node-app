import "./changePassword.scss"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {currentUser} = useContext(AuthContext)

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleClickChangePassword = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/user/password`,{
               userId : currentUser.userId,
               newPassword: newPassword,
               confirmPassword: oldPassword
            });
        
            if (response.status === 200) {
                console.log('====================================');
                console.log("update successfully");
                console.log('====================================');
                toast.success('Change password successfully'); // Display success toast
            } 
            else {
                console.log(`Unexpected response: ${JSON.stringify(response.data)}`);
            }
        } catch (error) {
        console.error('Error:', error.message);
        }
    };

    const handleFacebookLinkChange = (event) => {
        // Do something with the Facebook link
        const facebookLink = event.target.value;
        // console.log("Facebook Link:", facebookLink);
    };

    const handleInstagramLinkChange = (event) => {
        // Do something with the Instagram link
        const instagramLink = event.target.value;
        // console.log("Instagram Link:", instagramLink);
    };

    const handleLinkedInLinkChange = (event) => {
        // Do something with the LinkedIn link
        const linkedInLink = event.target.value;
        // console.log("LinkedIn Link:", linkedInLink);
    };

    const handleChangeSocialLink = () => {
        // Do something with the social links
        // You can access facebookLink, instagramLink, linkedInLink here
    };
    return (
        <div className="container">
            <div className="change-password-page">
                <div className="title">
                    Change password
                </div>

                <div className="change-password-container">
                    <div className="password-container">
                        <p>Old password</p>
                        <input className="input-old-password" type="password" onChange={handleOldPasswordChange}/>
                    </div>
                    <div className="password-container">
                        <p>New password</p>
                        <input className="input-new-password" type="password" onChange={handleNewPasswordChange}/>
                    </div>
                    <div className="password-container">
                        <p>Confirm password</p>
                        <input className="input-confirm-password" type="password" onChange={handleConfirmPasswordChange}/>
                    </div>
                    <div>
                        <button className="change-button" onClick={handleClickChangePassword}>Change password</button>
                    </div>
                </div>
            </div>

            <div className="change-social-link">
                <div className="title">
                    Change social link
                </div>
                <div className="change-social-link-container">
                    <div className="link-container">
                        <FacebookIcon style={{fontSize:40}} className="logo"/>
                        <input className="input-facebook-link" type="text" onChange={handleFacebookLinkChange}/>
                    </div>
                    <div className="link-container">
                        <InstagramIcon style={{fontSize:40}} className="logo"/>
                        <input className="input-instagram-link" type="text" onChange={handleInstagramLinkChange}/>
                    </div>
                    <div className="link-container">
                        <LinkedInIcon style={{fontSize:40}} className="logo"/>
                        <input className="input-linkedin-link" type="text" onChange={handleLinkedInLinkChange}/>
                    </div>
                    <div>
                        <button className="change-button" onClick={handleChangeSocialLink}>Change social link</button>
                    </div>
                </div>
            </div>
            {<ToastContainer />}
        </div>
    )


}

export default ChangePassword