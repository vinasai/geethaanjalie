import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_HOST}api`,
    headers: {
        'Content-Type': 'application/json',
    },
});
console.log("Base URL:", axiosInstance.defaults.baseURL);
export default axiosInstance;

//${process.env.REACT_APP_HOST}api