import React from "react";
import { useNavigate } from "react-router-dom";
import { signoutHandler } from "../../tools/auth";
import './css/ProfileHeader.css'

interface ProfileHeaderProps {
  profileType: number // 2: My account, 1: Found, 0: Not Found, -1: Searching
  username: string,
  joinDate: string
}

const ProfileHeader = ({ profileType, username, joinDate }: ProfileHeaderProps) => {
  const navigate = useNavigate();

  const handleSignout = (e: any) => {
    signoutHandler(() => navigate("/login"));
  }

  return (
    <div className="profile-header">
      <div className="profile-box">
        <div className="profile-box-image">
          <span className="material-symbols-outlined profile-box-image-icon">
            {
            profileType === -1
              ? "person_search"
              : (
            profileType === 0
              ? "person_off"
              : ( // else ( found case )
                "person"
              )
              )
            }
          </span>
        </div>
        <div className="profile-box-info">
          {
            profileType === -1
              ? <h2>Finding user...</h2>
              : (
            profileType === 0
              ? <h2>User doesn't exist!</h2>
              : ( // else ( found case )
                <div>
                  <h2>
                    {username}
                  </h2>
                  <p>
                    Joined in {joinDate}
                  </p>
                </div>
              )
              )
          }
        </div>
        <div className="profile-box-option">
          {
            profileType === 2
            ? <div> 
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
            : <br />
          }
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader;