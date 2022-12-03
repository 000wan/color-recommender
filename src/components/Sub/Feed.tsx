import React from 'react';
import styled, { keyframes } from 'styled-components';
import './css/Feed.css';

const feedFade = keyframes`
  0%   { opacity: 0; }
  25%  { opacity: 0.7; }
  50%  { opacity: 1; }
  100% { opacity: 1; }
`

const StyledFeed = styled.div`
    border: 1px solid rgb(0 0 0 / 30%);
    border-radius: 10px;
    margin: 10px;
    padding: 5px 20px;
    height: 80px;
    width: 200px;
    box-shadow: 0px 0px 10px rgb(0 0 0 / 10%);
    animation: ${feedFade} 1s;
  `

interface FeedProps {
  color: string,
  title: string,
  content: string,
  LClickEvent: ( color: string ) => void,
  RClickEvent: ( color: string ) => void
}

const Feed = ({ color, title, content, LClickEvent, RClickEvent }: FeedProps) => {
  return (
    <StyledFeed>
      <div className="feed-color">
        <button className="pixel pixel-button" style={{ backgroundColor: color }} onClick={(e) => LClickEvent(color)} onContextMenu={(e) => {
          RClickEvent(color);
          e.preventDefault();
        }} />
      </div>
      <div className="feed-main">
        <h3 className="feed--title">{title}</h3>
        <p className="feed--content">{content}</p>
      </div>
    </StyledFeed>
  );
};

export default Feed;