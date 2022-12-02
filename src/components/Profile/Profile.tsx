import React from "react";
import { useNavigate } from "react-router-dom";
import { signoutHandler } from "../../tools/auth";
import './css/Profile.css';

const Profile = () => {
  const navigate = useNavigate();

  const handleSignout = (e: any) => {
    signoutHandler(() => navigate("/login"));
  }

  return (
    <div className="profile-layout">
      <div className="profile-header">
        <div className="profile-box">
          <div className="profile-box-image">
            <span className="material-symbols-outlined profile-box-image-icon">
              person
            </span>
          </div>
          <div className="profile-box-info">
            <h2>
              USERNAME
            </h2>
            <p>
              Joined in 2022/12/02
            </p>
          </div>
          <div className="profile-box-option">
            <label style={{float: "left"}}>
              <input type="checkbox" name="public" value={1} />
              &nbsp;Show my profile to others
            </label>
            <button className="signout-button" onClick={ handleSignout }>
              <span className="material-symbols-outlined" style={{paddingLeft: 0}}>
                logout
              </span>
              Sign-Out
            </button>
          </div>
        </div>
      </div>
      <div className="profile-content">
        <p>Test</p>
      </div>
    </div>
  )
}

export default Profile;