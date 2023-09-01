import { EMessageCode, ENotificationType } from "../enums";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { TOnShowMessageProps } from "../types";

export const useNotificationMessage = () => {
  const { t } = useTranslation();

  const onShowMessage = (props: TOnShowMessageProps) => {
    const { type } = props;
    let { message } = props;

    if (!message && type === ENotificationType.ERROR) {
      message = EMessageCode.messageGeneralErrorDefault;
    } else if (!message && type === ENotificationType.SUCCESS) {
      message = EMessageCode.messageGeneralSuccessDefault;
    }
    switch (type) {
      case ENotificationType.ERROR:
        toast.error(t(message));
        break;
      case ENotificationType.SUCCESS:
        toast.success(t(message));
        break;
      default:
        toast.error(t(message));
        break;
    }
  };

  return {
    onShowMessage,
  };
};
