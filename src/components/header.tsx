import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from 'styled-components';
import './header.css'

const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  position: fixed;
  z-index: 10;
  background-color: white;
  box-shadow: 0px 2px 10px rgb(0 0 0 / 10%);
  `

interface HeaderProps {
  titleColor: string
}

const Header = ({ titleColor }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const titleClickHandler = (e: any) => {
    if (location.pathname === "/") {
      window.location.replace("/");
    } else {
      navigate("/");
    }
  }

  return (
    <HeaderContainer>
      <button className="nav-button" onClick={(e) => navigate("/profile")}>
        <span className="material-symbols-outlined nav-icon">
          account_circle
        </span>
      </button>
      <h1 className="header-title" style={{color: titleColor}} onClick={titleClickHandler}>
        Color Recommender
      </h1>
    </HeaderContainer>
  );
}

export default Header;