import "./changePassword.scss"
import { FaLink } from "react-icons/fa";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { currentUser } = useContext(AuthContext)
    const [socialLink, setSocialLink] = useState("")

    //==========================================================================================
    //==========================================================================================
    //Check ConfirmPassword === Newpassword
    const passwordsMatch = () => {
        return newPassword === confirmPassword;
    };

    //Limit digit here
    //Constant
    const MAX_PASSWORD_CHAR = 16
    const MIN_PASSWORD_CHAR = 8

    const validatePassword = (password) => {
        if (password.length < MIN_PASSWORD_CHAR || password.length > MAX_PASSWORD_CHAR) {
            return false;
        } else {
            return true;
        }
    };


    //==========================================================================================
    //==========================================================================================
    //Limit digit social link

    //==========================================================================================
    //==========================================================================================

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
        var isError = false;
        if(oldPassword === newPassword){
            toast.error("OldPassword must be different from newpassword")
            isError = true;
        }
        if (!passwordsMatch()) {
            toast.error('Passwords do not match');
            isError = true;
        }
        if (!validatePassword(newPassword) || !validatePassword(confirmPassword) || !validatePassword(oldPassword)) {
            toast.error(`Password must be between ${MIN_PASSWORD_CHAR} and ${MAX_PASSWORD_CHAR} characters.`);
            isError = true;
        }
        if (isError){
            return;
        }
        try {
            const response = await axios.put(`http://localhost:3001/user/password`, {
                userId: currentUser.userId,
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

    const handleSocialLinkChange = (event) => {
        setSocialLink(event.target.value)
    };

    const handleChangeSocialLink = async () => {
        // Do something with the social links
        // You can access facebookLink, instagramLink, linkedInLink here
        try {
            const response = await axios.put(`http://localhost:3001/user/social-media`, {
                userId: currentUser.userId,
                link: socialLink
            });

            if (response.status === 200) {
                console.log('====================================');
                console.log("update successfully");
                console.log('====================================');
                toast.success('Add social link successfully'); // Display success toast
                setSocialLink("")
            }
            else {
                console.log(`Unexpected response: ${JSON.stringify(response.data)}`);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
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
                        <input className="input-old-password" type="password" onChange={handleOldPasswordChange} />
                    </div>
                    <div className="password-container">
                        <p>New password</p>
                        <input className="input-new-password" type="password" onChange={handleNewPasswordChange} />
                    </div>
                    <div className="password-container">
                        <p>Confirm password</p>
                        <input className="input-confirm-password" type="password" onChange={handleConfirmPasswordChange} />
                    </div>
                    <div>
                        <button className="change-button" onClick={handleClickChangePassword}>Change password</button>
                    </div>
                </div>
            </div>

            <div className="change-social-link">
                <div className="title">
                    Add social link
                </div>
                <div className="change-social-link-container">
                    <div className="link-container">
                        <FaLink style={{ fontSize: 30 }} className="logo" />
                        <input className="input-facebook-link" type="text" onChange={handleSocialLinkChange} value={socialLink}/>
                    </div>
                    <div>
                        <button className="change-button" onClick={handleChangeSocialLink}>Add social link</button>
                    </div>
                </div>
            </div>
            {<ToastContainer />}
        </div>
    )


}

export default ChangePassword