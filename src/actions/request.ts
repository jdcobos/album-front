import axios from "axios"
import type { Irequest } from "./request.interface";

const Request  = async({authorization = true, method, route, params, customHeaders}: Irequest) => {
    const token = localStorage.getItem("token");
    const headers: any = {
        "Content-Type": "application/json",
        ...customHeaders
      };
    if (authorization && token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    const instance = axios({
        baseURL: `http://localhost:3000/api/${route}`,
        method,
        data: params,
        headers
    });

    return instance
}

export default Request