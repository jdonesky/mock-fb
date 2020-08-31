import axios from "axios";

const instance = axios.create({
  baseURL: "https://dumb-fb-de682.firebaseio.com/",
});


export default instance;
