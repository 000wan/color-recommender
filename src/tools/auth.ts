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
  interface IAPIResponse { loginSuccess: boolean, message: string };

  try {
    const { data } = await axios.post<IAPIResponse>(APIBase + "/auth/login", { credential });
    if( data.loginSuccess ) {
      //alert(data.message);
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

export { auth, findUsername, signinHandler, signupHandler };