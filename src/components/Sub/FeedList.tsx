import React from "react";
import Feed from "./Feed";
import "./css/Feed.css"

interface FeedSchema {
  color: string,
  content: string
}

interface FeedListProps { 
  data: FeedSchema[],
  LClickEvent: ( color: string ) => void,
  RClickEvent: ( color: string ) => void
}

const FeedList = ({ data, LClickEvent, RClickEvent }: FeedListProps) => {
  return (
    <div className="sub-content">
      <div className="item-feed">
        { data.map(({color, content}, i) => 
            <Feed key={i} color={ color } title={ color.toUpperCase() } content={ content } LClickEvent={ LClickEvent } RClickEvent={ RClickEvent } />
        ) }
      </div>
    </div>
  )
}

export default FeedList;