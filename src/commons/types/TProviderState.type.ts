import { IProvider } from ".";

export type TProviderState = {
  providers: IProvider[];
  errorMessage: string | null;
  loading: boolean;
  successMessage: string | null;
};
