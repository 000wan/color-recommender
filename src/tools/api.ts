import axios from "axios";
const APIBase = process.env.REACT_APP_BACK_URL;

interface LogSchema {
  index: number,
  color: string,
  timestamp: string
}
const APILogLength = 10;

const APIGetLog = async () => {
  interface IAPIResponse { isAuth: boolean, log: LogSchema[] };
  const { data } = await axios.get<IAPIResponse>(APIBase + "/user/history?length=" + APILogLength);
  if( data.isAuth ) {
    //console.log(data.log);
    return data.log;
  } else {
    console.log('Get log Failed!');
    return [];
  }
}

const APILogAction = async ( index:number, color: string, next: (log: LogSchema[]) => void ) => {
  interface IAPIResponse { logSuccess: boolean, log: LogSchema[] };

  const { data } = await axios.post<IAPIResponse>(APIBase + "/user/action", { index, color, length: APILogLength });
  if( data.logSuccess ) {
    //console.log(data.log);
    next(data.log);
  } else {
    console.log('Log Failed!');
  }
}

const APIGetRecommend = async () => {
  interface IAPIResponse { success: boolean, data: string[] };

  const APIdata = (await axios.get<IAPIResponse>(APIBase + "/user/recommend")).data;
  if( APIdata.success ) {
    console.log(APIdata.data);
    return APIdata.data;
  } else {
    console.log('Get recommend Failed!');
    return [];
  }
}

const APIGetProfile = async ( username: string ) => {
  interface IAPIResponse {
    result: boolean,
    username: string,
    joinDate: string 
  };
  const { data } = await axios.post<IAPIResponse>(APIBase + "/user/profile", { username });
  return data;
}

export {
  APIBase, 
  APIGetLog, 
  APILogAction, 
  APIGetRecommend,
  APIGetProfile
};