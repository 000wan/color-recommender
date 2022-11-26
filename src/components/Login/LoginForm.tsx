import React, { useState, useEffect } from "react";
import './css/LoginForm.css'
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import axios from "axios";
import { APIBase } from '../../tools/api';
import { useInterval } from '../../tools/interval';
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true; // For cookies

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

  const signin = async (credential: UserCredential) => {
    interface IAPIResponse { loginSuccess: boolean, message: string };

    try {
      const { data } = await axios.post<IAPIResponse>(APIBase + "/auth/login", { credential });
      if( data.loginSuccess ) {
        alert(data.message);
        navigate("/");
      } else {
        alert("Sign-In Failed: " + data.message);
      }
    } catch (e: any) {
      const data:IAPIResponse = e.response.data; 
      alert(data.message);
    }
  }

  const signup = async (credential: UserCredential) => {
    interface IAPIResponse { registerSuccess: boolean, message: string };

    try {
      const { data } = await axios.post<IAPIResponse>(APIBase + "/auth/register", { credential });
      if ( data.registerSuccess ) {
        // alert("Sign-Up Success: " + data.message);
        signin(credential); // login if register successfully
      } else {
        alert("Sign-Up Failed: " + data.message);
      }
    } catch (e: any) {
      const data:IAPIResponse = e.response.data; 
      alert(data.message);
    }
  }

  const handleSubmit = (event: any) => {
    const credential:UserCredential = { username, password }; 

    switch( submitType ) {
      case 1:
        signin(credential);
        break;
      case 0:
        signup(credential);
        break;
    }
    event.preventDefault();
  }

  // check whether username duplicated
  const tickTime = 2000; // ms
  const timerDelay = 1000;

  const findUsername = async ( username: string ) => {
    try {
      interface IAPIResponse { result: boolean };
      const { data } = await axios.post<IAPIResponse>(APIBase + "/auth/find-user", { username });
      if(data.result) {
        return 1; // Found
      } else {
        return 0; // Not found
      }
    } catch (e) {
      return -1; // Error
    }
  }

  const tick = () => {
    setTimer(timer => timer + 1);

    if ( !username ) { // forbidden username (empty)
      setAuthType(-1);
      setNameOK(0);
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
        <br />
        <button className={"login-button"} type={"submit"} onClick={e => setSubmitType(1)} disabled={authType !== 1}>Sign-In</button>
        <button className={"login-button"} type={"submit"} onClick={e => setSubmitType(0)} disabled={authType !== 0}>Sign-Up</button>
      </form>
    </div>
  );
}

export default LoginForm;