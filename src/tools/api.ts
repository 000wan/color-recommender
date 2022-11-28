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
    console.log(data.log);
    return data.log;
  } else {
    console.log('Get log Failed!');
    return [];
  }
}

const APILogAction = async ( index:number, color: string, next: (log: LogSchema[]) => void ) => {
  interface IAPIResponse { logSuccess: boolean, log: LogSchema[] };

  const { data } = await axios.post<IAPIResponse>(APIBase + "/user/logAction", { index, color, length: APILogLength });
  if( data.logSuccess ) {
    console.log(data.log);
    next(data.log);
  } else {
    console.log('Log Failed!');
  }
}

export { APIBase, APIGetLog, APILogAction };