import React, { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import DataPlot from "./DataPlot";
import './css/Profile.css';
import { APIGetProfile } from '../../tools/api';
import { useInterval } from '../../tools/interval';

interface LogSchema {
  index: number,
  color: string,
  timestamp: string
}

interface ProfileProps {
  USERNAME: string // original username
}

const Profile = ({ USERNAME }: ProfileProps) => {
  const [ username, setUsername ] = useState<string>('');
  const [ timer, setTimer ] = useState<number>(0);

  // 2: My account, 1: Found, 0: Not Found, -1: Searching
  const [ profileType, setProfileType ] = useState<number>(-1);
  const [ NUsername, setNUsername ] = useState<string>('');
  const [ NJoinDate, setNJoinDate ] = useState<string>('');
  const [ NLog, setNLog ] = useState<LogSchema[]>([]);
  const [ NHideProfile, setNHideProfile ] = useState<boolean>(false);

  // check whether username duplicated
  const tickTime = 2000; // ms
  const timerDelay = 1000;

  const tick = () => {
    if ( profileType === -1 ) {
      setTimer(timer => timer + 1);

      if ( !username ) { // Empty name => My Profile
        APIGetProfile(USERNAME).then(( data ) => {
          if ( data.result ) {
            if (data.username === USERNAME) {
              setProfileType(2); // My account
              setNUsername(data.username);
              setNJoinDate(data.joinDate);
              setNLog(data.log);
              setNHideProfile(data.hideProfile);
            } else {
              setProfileType(-1); // Err, try again
            }
          } else {
            setProfileType(-1); // Err
          }
        });
      } else if ( timer >= tickTime/timerDelay ) {
        // didn't check yet
        APIGetProfile(username).then(( data ) => {
          if ( data.result ) {
            if (data.username === USERNAME) {
              setProfileType(2); // My account
            } else {
              setProfileType(1); // Found
            }
            setNUsername(data.username);
            setNJoinDate(data.joinDate);
            setNLog(data.log);
            setNHideProfile(data.hideProfile);
          } else {
            setProfileType(0); // Not Found
          }
        });
      }
    }
    //console.log(timer);
  }

  useEffect(() => {
    setProfileType(-1);
    setTimer(0);
  }, [ username ]);

  useInterval(tick, timerDelay);

  return (
    <div className="profile-layout">
      <div className="profile-top">
        <div className="profile-search">
          <span className="material-symbols-outlined">
            search
          </span>
          <input className={"username-input"} type={"text"} value={ username } onChange={e => setUsername( e.target.value )} placeholder={"Search for other users!"} />
        </div>
        <ProfileHeader profileType={profileType} username={NUsername} joinDate={new Date(NJoinDate).toLocaleDateString()} hideProfile={NHideProfile} />
      </div>
      <div className="profile-content">
        {
          ( profileType === 2 ) // my profile
          ? <DataPlot data={ NLog } />
          : (
          ( profileType === 1 ) // other profile
          ? (
          ( NHideProfile )
          ? <p>
            <span className="material-symbols-outlined">
              lock
            </span>
            Profile Hidden by Account Owner
            </p>
          : <DataPlot data={ NLog } />
          )
          : <br />
          )
        }
      </div>
    </div>
  )
}

export default Profile;