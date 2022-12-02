import React, { useState, useEffect } from "react";
import './css/LoginForm.css'
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { findUsername, signinHandler, signupHandler } from '../../tools/auth';
import { useInterval } from '../../tools/interval';
import { useNavigate } from "react-router-dom";

interface UserCredential {
  username: string,
  password: string
}

interface LoginProps {}

const LoginForm = ( props: LoginProps ) => {
  // credential
  const [ username, setUsername ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  // etc
  const [ submitType, setSubmitType ] = useState<number>(0); // 1: Sign-In, 0: Sign-Up
  const [ authType, setAuthType ] = useState<number>(-1); // 1: Sign-In, 0: Sign-Up, -1: Neither
  const [ nameOK, setNameOK ] = useState<number>(0); // 1: OK, 0: Not OK, -1: Checking
  const [ timer, setTimer ] = useState<number>(0);

  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    const credential:UserCredential = { username, password }; 

    switch( submitType ) {
      case 1:
        if ( username === process.env.REACT_APP_USERNAME && password === process.env.REACT_APP_PASSWORD ) {
          document.cookie = "x_auth=" + username;
          navigate("/");
        } else {
          signinHandler(credential, () => navigate("/"));
        }
        break;
      case 0:
        signupHandler(credential, () => navigate("/"));
        break;
    }
    event.preventDefault();
  }

  // check whether username duplicated
  const tickTime = 2000; // ms
  const timerDelay = 1000;

  const tick = () => {
    setTimer(timer => timer + 1);

    if ( !username ) { // forbidden username (empty)
      setAuthType(-1);
      setNameOK(0);
    } else if ( username === process.env.REACT_APP_USERNAME ) { // username for test
      setAuthType(1);
      setNameOK(1);
    } else if ( timer >= tickTime/timerDelay && nameOK === -1 ) {
      // didn't check yet
      findUsername(username).then(( res ) => {
        setAuthType(res); // 1: Found => Sign-In, 0: Not found => Sign-Up, -1: Neither available
        if( res === -1 ) {
          setNameOK(-1);
        } else {
          setNameOK(1);
        }
      });
    }
    //console.log(timer);
  }

  useEffect(() => {
    setAuthType(-1);
    setNameOK(-1);
    setTimer(0);
  }, [ username ]);

  useInterval(tick, timerDelay);

  const [ emoji, setEmoji ] = useState<number>(0);
  useEffect(() => {
    switch ( nameOK ) {
      case -1:
        setEmoji(0x23F3); // checking
        break;
      case 0:
        setEmoji(0x274C); // not OK
        break;
      case 1:
        setEmoji(0x2705); // OK
        break;
    }
  }, [ nameOK ]);

  const [ showPwd, setShowPwd ] = useState<boolean>(false);

  return (
    <div className={"login-form"}>
      <form onSubmit={ handleSubmit }>
        <label className={"login-label"}>Username { String.fromCharCode(emoji) }</label>
        <input className={"login-input"} type={"text"} value={ username } onChange={e => setUsername( e.target.value )} />

        <label className={"login-label"}>Password (Optional)</label>
        <input className={"login-input"} type={ showPwd ? "text" : "password" } value={ password } onChange={e => setPassword( e.target.value )} />
        <IconButton id={"visible-button"} onClick={e => setShowPwd(!showPwd)}>
          { showPwd ? <Visibility /> : <VisibilityOff /> }
        </IconButton>
        
        <button className={"login-button"} type={"submit"} onClick={e => setSubmitType(1)} disabled={authType !== 1}>Sign-In</button>
        <button className={"login-button"} type={"submit"} onClick={e => setSubmitType(0)} disabled={authType !== 0}>Sign-Up</button>
      </form>
    </div>
  );
}

export default LoginForm;