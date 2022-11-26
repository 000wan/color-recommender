import React from "react";
import Feed from "./Feed";
import "./css/Feed.css"

const UserHistory = () => {
  return (
    <div className="sub-content">
      <div className="item-feed">
        <Feed color="#000000" title="#000000" content="black" />
        <Feed color="#ff0000" title="#ff0000" content="red" />
        <Feed color="#00ff00" title="#00ff00" content="green" />
        <Feed color="#0000ff" title="#0000ff" content="blue" />
      
      </div>
    </div>
  )
}

export default UserHistory;