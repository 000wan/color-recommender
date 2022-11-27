import React from "react";
import Feed from "./Feed";
import "./css/Feed.css"

interface LogSchema {
  index: number,
  color: string,
  timestamp: string
}

interface UserHistoryProps { history: LogSchema[] }

const UserHistory = ({ history }: UserHistoryProps) => {
  return (
    <div className="sub-content">
      <div className="item-feed">
        { history.map(({color, timestamp}, i) => 
            <Feed key={i} color={color} title={color.toUpperCase()} content={'⏱'+(new Date(timestamp).toTimeString().slice(0,8))} />
        ) }
      </div>
    </div>
  )
}

export default UserHistory;