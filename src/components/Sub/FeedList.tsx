import React from "react";
import Feed from "./Feed";
import "./css/Feed.css"

interface FeedSchema {
  color: string,
  content: string
}

interface FeedListProps { data: FeedSchema[] }

const FeedList = ({ data }: FeedListProps) => {
  return (
    <div className="sub-content">
      <div className="item-feed">
        { data.map(({color, content}, i) => 
            <Feed key={i} color={ color } title={ color.toUpperCase() } content={ content } />
        ) }
      </div>
    </div>
  )
}

export default FeedList;