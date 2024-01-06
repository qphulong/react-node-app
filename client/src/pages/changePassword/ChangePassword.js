import "./changePassword.scss"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const ChangePassword = () => {
    return (
        <div className="container">
            <div className="change-password-page">
                <div className="title">
                    Change password
                </div>

                <div className="change-password-container">
                    <div className="password-container">
                        <p>Old password</p>
                        <input className="input-old-password" type="password" />
                    </div>
                    <div className="password-container">
                        <p>New password</p>
                        <input className="input-new-password" type="password" />
                    </div>
                    <div className="password-container">
                        <p>Confirm new password</p>
                        <input className="input-confirm-password" type="password" />
                    </div>
                    <div>
                        <button className="change-button">Change password</button>
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
                        <input className="input-facebook-link" type="text" />
                    </div>
                    <div className="link-container">
                        <InstagramIcon style={{fontSize:40}} className="logo"/>
                        <input className="input-instagram-link" type="text" />
                    </div>
                    <div className="link-container">
                        <LinkedInIcon style={{fontSize:40}} className="logo"/>
                        <input className="input-linkedin-link" type="text" />
                    </div>
                    <div>
                        <button className="change-button">Change social link</button>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default ChangePassword