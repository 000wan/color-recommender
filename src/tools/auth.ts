import axios from "axios";
import { APIBase } from './api';

axios.defaults.withCredentials = true; // For cookies

interface UserCredential {
  username: string,
  password: string
}

const auth = async () => {
  interface IAPIResponse { isAuth: boolean, username: string };
  const { data } = await axios.get<IAPIResponse>(APIBase + "/auth");
  
  if( !data.isAuth ) { // token in cookie is not available
    document.cookie = "x_auth=; max-age=-1"; // delete x_auth cookie
  }
  return data;
}

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

const signinHandler = async (credential: UserCredential, next: any) => {
  interface IAPIResponse { loginSuccess: boolean, token: string, message: string };

  try {
    const { data } = await axios.post<IAPIResponse>(APIBase + "/auth/login", { credential });
    if( data.loginSuccess ) {
      //alert(data.message);
      document.cookie = "x_auth=" + data.token;
      next();
    } else {
      alert("Sign-In Failed: " + data.message);
    }
  } catch (e: any) {
    const data:IAPIResponse = e.response.data; 
    alert(data.message);
  }
}

const signupHandler = async (credential: UserCredential, next: any) => {
  interface IAPIResponse { registerSuccess: boolean, message: string };

  try {
    const { data } = await axios.post<IAPIResponse>(APIBase + "/auth/register", { credential });
    if ( data.registerSuccess ) {
      // alert("Sign-Up Success: " + data.message);
      signinHandler(credential, next); // login if register successfully
    } else {
      alert("Sign-Up Failed: " + data.message);
    }
  } catch (e: any) {
    const data:IAPIResponse = e.response.data; 
    alert(data.message);
  }
}

const signoutHandler = async (next: any) => {
  interface IAPIResponse { logoutSuccess: boolean, message: string };

  try {
    const { data } = await axios.post<IAPIResponse>(APIBase + "/auth/logout");
    if( data.logoutSuccess ) {
      // delete auth cookie
      document.cookie = "x_auth=; max-age=-1";
      next();
    } else {
      alert("Sign-Out Failed: " + data.message);
    }
  } catch (e: any) {
    const data:IAPIResponse = e.response.data; 
    alert(data.message);
  }
}

export { auth, findUsername, signinHandler, signupHandler, signoutHandler };