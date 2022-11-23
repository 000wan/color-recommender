import React from "react";
import axios from "axios";
import { APIBase } from '../tools/api';

const LoginPage = () => {
  const [ username, setUsername ] = React.useState<string>("");
  const [ password, setPassword ] = React.useState<string>("");
  
  const signin = async (e: any) => {
    interface IAPIResponse { loginSuccess: boolean, message: string };

    try {
      const { data } = await axios.post<IAPIResponse>(APIBase + "/auth/login", { credential: {username, password} });
      if(data.loginSuccess) {
        alert("Login Success!");
      }
    } catch (e: any) {
      //console.log(e);
      const data:IAPIResponse = e.response.data; 
      alert("[Login Failed] " + data.message);
    }
  }

  const signup = async (e: any) => {
    try {
      const res = await axios.post(APIBase + "/auth/register", { credential: {username, password} });
      console.log(res.data.message);
    } catch (e: any) {
      //console.log(e);
      alert(e.response.data.message);
    }
  }

  return (
    <div className="login">
      <div className="login-form">
        Username: <input type={"text"} value={username} onChange={e => setUsername(e.target.value)}/>
        <br />
        Password: <input type={"password"} value={password} onChange={e => setPassword(e.target.value)}/>
        <br />
        <button onClick={signin}>Sign-In</button>
        <button onClick={signup}>Sign-Up</button>
      </div>
    </div>
  )
}

export default LoginPage;