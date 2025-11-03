import axios from "axios"
import type { Irequest } from "./request.interface";

const Request  = async({method, params}: Irequest) => {
    const instance = axios({
        baseURL: "http://localhost:3000/api/auth/login",
        method,
        data: params,
   
          headers: {
      "Content-Type": "application/json",
    }
    });

    return instance
}

export default Request