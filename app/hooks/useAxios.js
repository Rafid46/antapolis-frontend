import axios from "axios";
const axiosPublic = axios.create({
  baseURL: "https://antapolis-server-2.onrender.com",
});
const useAxios = () => {
  return axiosPublic;
};
export default useAxios;
