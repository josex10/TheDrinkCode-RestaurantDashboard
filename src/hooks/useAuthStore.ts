import { useDispatch, useSelector } from "react-redux";
import { appApi } from "../api";
import {
  clearErrorMessage,
  onChangeAuth,
  onChangeSelectedRestaurant,
  onChecking,
  onLogin,
  onLogout,
} from "../store/Auth";
import { IStartLogin, IStartRegister } from "./models";
import {
  IAuthResponse,
  IAuthState,
  IChangeAuthRestaurantSelected,
  IChangeAuthlanguage,
  IInformationAuthResponse,
} from "./models/IUseAuthStore";
import { ELanguageISOCodes, ELocalStorageNames } from "../commons/enums";

interface IRootState {
  auth: IAuthState;
}

const checkLocalStorageLanguage = () => {
  let selectedLanguageResponse = "";

  const selectedLanguage = localStorage.getItem(
    ELocalStorageNames.SELECTED_LANGUAGE
  );
  if (selectedLanguage) {
    selectedLanguageResponse = selectedLanguage;
  } else {
    localStorage.setItem(
      ELocalStorageNames.SELECTED_LANGUAGE,
      ELanguageISOCodes.es
    );
    selectedLanguageResponse = ELanguageISOCodes.es;
  }

  return selectedLanguageResponse;
};

export const useAuthStore = () => {
  const { status, auth, errorMessage } = useSelector(
    (state: IRootState) => state.auth
  );

  const dispatch = useDispatch();

  const startLogin = async (props: IStartLogin) => {
    dispatch(onChecking());
    try {
      const apiResponse = await appApi.post("/auth/login", {
        username: props.username,
        password: props.password,
      });
      const response: IAuthResponse = apiResponse.data.successResponse.data;
      const { auth, token } = response;
      localStorage.setItem(ELocalStorageNames.TOKEN, token);
      localStorage.setItem(
        ELocalStorageNames.TOKEN_INIT_DATE,
        String(new Date().getTime())
      );
      localStorage.setItem(
        ELocalStorageNames.SELECTED_RESTAURANT,
        String(auth.selected_restaurant)
      );
      auth.language = checkLocalStorageLanguage();
      dispatch(onLogin(auth));
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
    const token = localStorage.getItem(ELocalStorageNames.TOKEN);
    const selectedRestaurant = localStorage.getItem(
      ELocalStorageNames.SELECTED_RESTAURANT
    );
    if (!token || !selectedRestaurant) return dispatch(onLogout(null));

    try {
      const apiResponse = await appApi.get("auth/renew");
      const response: IAuthResponse = apiResponse.data.successResponse.data;
      const { auth, token } = response;
      localStorage.setItem(ELocalStorageNames.TOKEN, token);
      localStorage.setItem(
        ELocalStorageNames.TOKEN_INIT_DATE,
        String(new Date().getTime())
      );
      auth.selected_restaurant = Number(selectedRestaurant);
      auth.language = checkLocalStorageLanguage();
      dispatch(onLogin(auth));
    } catch (error) {
      console.log(error);
      localStorage.clear();
      dispatch(onLogout(null));
    }
  };

  const changeAuthSelectedRestaurant = (
    props: IChangeAuthRestaurantSelected
  ) => {
    localStorage.setItem(
      ELocalStorageNames.SELECTED_RESTAURANT,
      String(props.restaurant_id)
    );
    const authCopy: IInformationAuthResponse = {
      ...auth,
      selected_restaurant: props.restaurant_id,
    };

    dispatch(onChangeAuth(authCopy));
  };

  const changeAuthLanguage = (props: IChangeAuthlanguage) => {
    const { language } = props;
    localStorage.setItem(
      ELocalStorageNames.SELECTED_LANGUAGE,
      String(language)
    );
    const authCopy: IInformationAuthResponse = {
      ...auth,
      language: language,
    };

    dispatch(onChangeAuth(authCopy));
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout(null));
  };

  return {
    //* Propiedades
    errorMessage,
    status,
    auth,

    //* Métodos
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
    changeAuthSelectedRestaurant,
    changeAuthLanguage,
  };
};
