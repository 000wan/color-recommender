import React from "react";
import './css/LoginForm.css'
import axios from "axios";
import { APIBase } from '../../tools/api';

interface UserCredential {
  username: string,
  password: string
}

interface LoginProps {}

interface LoginState extends UserCredential {
  submitType: number
}

class LoginForm extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      username: "",
      password: "",
      submitType: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  signin = async (credential: UserCredential) => {
    interface IAPIResponse { loginSuccess: boolean, message: string };

    try {
      const { data } = await axios.post<IAPIResponse>(APIBase + "/auth/login", { credential });
      if(data.loginSuccess) {
        alert("Login Success!");
      } else {
        alert("Login Failed!");
      }
    } catch (e: any) {
      const data:IAPIResponse = e.response.data; 
      alert("[Login Failed] " + data.message);
    }
  }

  signup = async (credential: UserCredential) => {
    interface IAPIResponse { message: string };

    try {
      const { data } = await axios.post<IAPIResponse>(APIBase + "/auth/register", { credential });
      alert(data.message);
    } catch (e: any) {
      const data:IAPIResponse = e.response.data; 
      alert(data.message);
    }
  }

  handleSubmit(event: any) {
    const credential:UserCredential = {
      username: this.state.username,
      password: this.state.password
    } 

    switch(this.state.submitType) {
      case 0: // Sign-In
        this.signin(credential);
        break;
      case 1: // Sign-Up
        this.signup(credential);
        break;
    }
    event.preventDefault();
  }

  render() {
    return (
      <div className={"login-form"}>
        <form onSubmit={this.handleSubmit}>
          <label className={"login-label"}>Username</label>
          <input className={"login-input"} type={"text"} value={this.state.username} onChange={e => this.setState({username: e.target.value})}/>

          <label className={"login-label"}>Password (Optional)</label>
          <input className={"login-input"} type={"password"} value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
          <br />
          <button className={"login-button"} type={"submit"} onClick={e => this.setState({submitType: 0})}>Sign-In</button>
          <button className={"login-button"} type={"submit"} onClick={e => this.setState({submitType: 1})}>Sign-Up</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;