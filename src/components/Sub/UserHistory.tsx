import React from "react";
import Feed from "./Feed";
import "./css/Feed.css"

interface LogSchema {
  index: number,
  color: string,
  timestamp: Date
}

interface UserHistoryProps { history: LogSchema[] }

const UserHistory = ({ history }: UserHistoryProps) => {
  return (
    <div className="sub-content">
      <div className="item-feed">
        { history.map(({color, timestamp}, i) => 
            <Feed key={i} color={color} title={color.toUpperCase()} content={timestamp.toString().slice(11,19)} />
        ) }
      </div>
    </div>
  )
}

export default UserHistory;