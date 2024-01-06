import "./changePassword.scss"

const ChangePassword = () => {
    return <div className="change-password-page">
        <div className="title">
            Change password
        </div>
        <form>
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            id="oldPassword"
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
          />
        </div>
        <button type="submit">Change Password</button>
      </form>

    </div>
}

export default ChangePassword