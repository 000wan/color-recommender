import axios from "axios";
const APIBase = process.env.REACT_APP_BACK_URL;

interface LogSchema {
  index: number,
  color: string,
  timestamp: string
}

const APIGetLog = async () => {
  interface IAPIResponse { isAuth: boolean, log: LogSchema[] };
  const { data } = await axios.get<IAPIResponse>(APIBase + "/user/history");
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

  const { data } = await axios.post<IAPIResponse>(APIBase + "/user/logAction", { index, color });
  if( data.logSuccess ) {
    console.log(data.log);
    next(data.log);
  } else {
    console.log('Log Failed!');
  }
}

export { APIBase, APIGetLog, APILogAction };