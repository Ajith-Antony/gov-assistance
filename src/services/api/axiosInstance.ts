import axios from "axios";
import { API_ENDPOINTS, TIMEOUTS } from "../../constants";

const axiosInstance = axios.create({
  baseURL: "/",
  timeout: TIMEOUTS.API_REQUEST,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
