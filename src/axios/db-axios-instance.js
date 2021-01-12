import axios from "axios";

const instance = axios.create({
  // baseURL: "https://mockfb2.firebaseio.com/"

  // MockFb3 with cloud functions
  baseURL: "https://mockfb3-bc1eb-default-rtdb.firebaseio.com"
});

instance.interceptors.request.use(reqConfig => {
  const token = localStorage.getItem('authToken')
  if (token) {
    reqConfig.headers.common['Authorization'] = token
  }
  return reqConfig;
}, err => console.log(err))

export default instance;



