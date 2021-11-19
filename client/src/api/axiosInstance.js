import axios from 'axios';

export default (baseURL) => {
    const axiosInstance = axios.create({
        baseURL: baseURL
    });

    return axiosInstance;
}