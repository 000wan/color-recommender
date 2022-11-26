import React from 'react';
import styled from 'styled-components';
import './css/Feed.css';

const StyledFeed = styled.div`
    border: 1px solid rgb(0 0 0 / 30%);
    border-radius: 10px;
    margin: 10px;
    padding: 5px 20px;
    height: 80px;
    width: 200px;
    box-shadow: 0px 0px 10px rgb(0 0 0 / 10%);
  `

interface FeedProps {
  color: string,
  title: string,
  content: string
}

const Feed = ({ color, title, content }: FeedProps) => {
  return (
    <StyledFeed>
      <div className="feed-color">
        <button className="pixel pixel-button" style={{ backgroundColor: color }} />
      </div>
      <div className="feed-main">
        <h3 className="feed--title">{title}</h3>
        <p className="feed--content">{content}</p>
      </div>
    </StyledFeed>
  );
};

export default Feed;