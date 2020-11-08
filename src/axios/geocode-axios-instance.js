import axios from "axios";

const instance = axios.create({
    // baseURL: "https://dumb-fb-de682.firebaseio.com/",
    // baseURL: "https://mockfb-1a939.firebaseio.com/",
    baseURL: "https://mockfb2.firebaseio.com/"
});

instance.interceptors.request.use(reqConfig => {
    const token = localStorage.getItem('authToken')
    if (token) {
        reqConfig.headers.common['Authorization'] = token
    }
    return reqConfig;
}, err => console.log(err))

export default instance;

