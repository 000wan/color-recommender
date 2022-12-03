import React, { useEffect, useState } from "react";
import Profile from "../components/Profile/Profile";
import './css/profile.css'
import { auth } from '../tools/auth';

const ProfilePage = () => {
  const [ username, setUsername ] = useState<string>('');

  useEffect(() => {
    auth().then(( data ) => {
      if (data.username) {
        setUsername(data.username);
      }
    });
  }, []);

  return (
    <div className="profile">
      <Profile USERNAME={ username } />
    </div>
  )
}

export default ProfilePage;