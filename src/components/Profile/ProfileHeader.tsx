import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signoutHandler } from "../../tools/auth";
import { APIHideProfile } from "../../tools/api";
import './css/ProfileHeader.css'

interface ProfileHeaderProps {
  profileType: number // 2: My account, 1: Found, 0: Not Found, -1: Searching
  username: string,
  joinDate: string,
  hideProfile: boolean
}

const ProfileHeader = ({ profileType, username, joinDate, hideProfile }: ProfileHeaderProps) => {
  const [ hidden, setHidden ] = useState<boolean>(hideProfile);
  const navigate = useNavigate();

  useEffect(() => {
    setHidden(hideProfile);
  }, [ hideProfile ]);

  const handleSignout = (e: any) => {
    signoutHandler(() => navigate("/login"));
  }

  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    APIHideProfile(e.target.checked).then(( data ) => {
      setHidden(data.hideProfile);
    });
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
                <input type="checkbox" name="hide" checked={hidden} onChange={(e) => checkHandler(e)} />
                &nbsp;Hide profile data to others
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