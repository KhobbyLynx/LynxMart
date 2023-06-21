import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://lynxmart-api.onrender.com",
});

export default newRequest;
