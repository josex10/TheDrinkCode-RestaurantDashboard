import { useDispatch, useSelector } from "react-redux";
import {
  onSetLoading,
  onSetErrorMessage,
  onSetProvider,
  onSetSuccessMessage,
} from "../../../store/Auth/providerSlice";
import { appApi } from "../../../api";
import { useAuthStore } from "../../../hooks";
import {
  IProvider,
  TProviderForm,
  TProviderState,
} from "../../../commons/types";

type TGeneralAPIResponse = {
  data: TGeneralAPISuccessResponse;
};

type TGeneralAPISuccessResponse = {
  successResponse: TSuccessResponseCreateProvider;
};

type TSuccessResponseCreateProvider = {
  data: IProvider;
  messageCode: string;
};

type TGeneralAPIErrorResponse = {
  response: TGeneralAPIResponseBody;
};

type TGeneralAPIResponseBody = {
  data: TGeneralAPIResponseSubBody;
};
type TGeneralAPIResponseSubBody = {
  errorResponse: GeneralAPICustomErrorResponse;
};

type GeneralAPICustomErrorResponse = {
  timestamp: Date;
  path: string;
  code: number;
  message: string;
  messageCode: string;
};

interface IRootState {
  provider: TProviderState;
}

const createProviderBasedOnValues = (props: TProviderForm) => {
  const entries = Object.entries(props);
  const data = entries.map(([key, val]) => {
    if (
      val.trim().length !== 0 &&
      val != "" &&
      val != null &&
      val != undefined
    ) {
      return { key, val };
    }
    return;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let providerObject: any;
  data.forEach((object) => {
    if (object?.key) {
      providerObject = { ...providerObject, [object.key]: object.val };
    }
  });

  return providerObject;
};

export const useProvider = () => {
  const { providers, errorMessage, loading, successMessage } = useSelector(
    (state: IRootState) => state.provider
  );

  const dispatch = useDispatch();
  const { auth } = useAuthStore();
  const { company_id } = auth;
  const startSaveProvider = async (props: TProviderForm) => {
    dispatch(onSetLoading(true));

    try {
      const newProvider = {
        ...createProviderBasedOnValues(props),
        clm_id_company: company_id,
      };
      const apiResponse: TGeneralAPIResponse = await appApi.post(
        "/provider",
        newProvider
      );
      const { data, messageCode } = apiResponse.data.successResponse;
      dispatch(onSetProvider(data));
      dispatch(onSetSuccessMessage(messageCode));
    } catch (error) {
      const newError = error as TGeneralAPIErrorResponse;
      const { messageCode } = newError.response.data.errorResponse;
      dispatch(onSetErrorMessage(messageCode));
    } finally {
      dispatch(onSetLoading(false));
    }
  };

  const clearMessages = () => {
    dispatch(onSetSuccessMessage(null));
    dispatch(onSetErrorMessage(null));
  };
  return {
    //* Propiedades
    providers,
    errorMessage,
    loading,
    successMessage,

    //* Métodos
    startSaveProvider,
    clearMessages,
  };
};
