import axios from "axios";
import _ from "lodash";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
    // withCredentials: true,
});

// Sử dụng interceptor cho response
instance.interceptors.response.use(
    (response) => {
        return response.data; // Trả về dữ liệu từ response
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
