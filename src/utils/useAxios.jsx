import axios from "axios";
import { useEffect } from "react";
import useMainContext from "./useMainContext";
import { useNavigate } from "react-router";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_dbApi,
  withCredentials: true,
});

const useAxios = () => {
  const { signOutUser, toastErr } = useMainContext();
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        toastErr(`${err.message}`);
        console.error(err);
        if (err.status === 401 || err.status === 403) {
          signOutUser()
            .then(() => {
              toastErr(`user was logged out`);
              navigate(`/login`);
            })
            .catch((error) => console.error(error));
        }

        return Promise.reject(err);
      }
    );
  }, [navigate, signOutUser, toastErr]);
  return axiosInstance;
};

export default useAxios;
