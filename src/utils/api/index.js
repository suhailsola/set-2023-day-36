import axios from "axios";

const LOCAL_URL = "http://172.16.50.222:8080";
const HOME_URL = "exp://192.168.0.22:8080";
const RENDER = "https://bitly-clone-45p9.onrender.com";

export const postLoginUser = async (data) => {
  // console.log(data);
  return await axios
    .post(`${RENDER}/api/login`, data)
    .then((res) => res.data)
    .catch((error) => error.error);
};

export const postRegisterUser = async (data) => {
  return axios.post(`${RENDER}/api/register`, data).then((res) => res.data);
};

export const getAllLinks = async (token) =>
  axios.get(`${RENDER}/api/link`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const postCreateNewLink = async (token, data) => {
  return axios
    .post(`${RENDER}/api/link`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};
