import axios from "axios";

const instance = axios.create({
  baseURL: "https://dumb-fb-de682.firebaseio.com/",
});

const token = localStorage.getItem('authToken')
instance.defaults.headers['Authorization'] = token

export default instance;

// or create an hoc that wraps and registers an interceptor 
//  that attaches the token to a Authentication header

// axios.interceptors.request.use(res => 
// res.headers.Authorization = token 
// )

