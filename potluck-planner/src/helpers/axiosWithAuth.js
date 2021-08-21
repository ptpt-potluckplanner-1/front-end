import axios from "axios";
import { BASE_URL } from "../constants/constants";

const axiosWithAuth = (params) => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      authorization: token,
    },
  });
};

export default axiosWithAuth;
