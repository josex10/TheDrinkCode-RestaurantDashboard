import { ENotificationType } from "../enums";

export type TOnShowMessageProps = {
  type: ENotificationType;
  message: string;
};
