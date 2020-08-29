import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-dumb-fb.firebaseio.com/",
});


export default instance;
