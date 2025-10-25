import axios from "axios";
import { getCookie } from "./storage";

const HTTP = axios.create({
  baseURL: `https://dummyjson.com`,
  //  withCredentials: true,
});

HTTP.interceptors.request.use((req) => {
  const token = getCookie("token");
  if (token && req.headers) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }
  return req;
});

HTTP.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    const data = err.response && err.response.data;
    if (err.response && err.response.status === 401) {
      document.dispatchEvent(new Event("unauthorized"));
    }
    // console.error("HTTP error: ", err);
    const msg = data.message || err.message;
    err.message = msg;
    throw err;
  }
);

export default HTTP;
