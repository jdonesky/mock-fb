import axios from "axios";

const instance = axios.create({
  baseURL: "https://dumb-fb-de682.firebaseio.com/",
});

instance.interceptors.request.use(reqConfig => {
  const token = localStorage.getItem('authToken')
  if (token) {
    reqConfig.headers.common['Authorization'] = token
    console.log('AXIOS INSTANCE ATTACHED TOKEN!');
  }
  return reqConfig;
}, err => console.log(err))

export default instance;



