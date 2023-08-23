import { useDispatch, useSelector } from "react-redux";
import { appApi } from "../api";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../store/Auth";
import { IStartLogin, IStartRegister } from "./models/IuseAuthStore";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async (props: IStartLogin) => {
    dispatch(onChecking());
    try {
      const { data } = await appApi.post("/auth/local", {
        identifier: props.email,
        password: props.password,
      });
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("token-init-date", String(new Date().getTime()));
      dispatch(onLogin(data.user));
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async (props: IStartRegister) => {
    dispatch(onChecking());
    try {
      const { data } = await appApi.post("/auth/new", {
        email: props.email,
        password: props.password,
        name: props.name,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", String(new Date().getTime()));
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout("-Error-"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout(null));

    try {
      const { data } = await appApi.get("auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", String(new Date().getTime()));
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout(null));
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout(null));
  };

  return {
    //* Propiedades
    errorMessage,
    status,
    user,

    //* Métodos
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
  };
};
