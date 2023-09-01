import axios from "axios";
import { getEnvVariables } from "../helpers";
import { ELocalStorageNames } from "../commons/enums";

const { VITE_API_URL } = getEnvVariables();

const appApi = axios.create({
  baseURL: VITE_API_URL,
});

appApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem(ELocalStorageNames.TOKEN)}`,
  };

  return config;
});

export default appApi;
