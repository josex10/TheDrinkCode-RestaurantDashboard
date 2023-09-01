export interface IStartLogin {
  username: string;
  password: string;
}
export interface IStartRegister {
  email: string;
  password: string;
  name: string;
}

export interface IChangeAuthRestaurantSelected {
  restaurant_id: number;
}
export interface IChangeAuthlanguage {
  language: string;
}

export interface IAuthResponse {
  auth: IInformationAuthResponse;
  token: string;
}
export interface IInformationAuthResponse {
  user_id: number;
  user_name: string;
  selected_restaurant: number;
  company_id: number;
  company_name: string;
  restaurants: IRestaurantAuthResponse[];
  role_id: number;
  role_name: string;
  role_key: string;
  language: string;
}

export interface IRestaurantAuthResponse {
  restaurant_id: number;
  restaurant_name: string;
}

export interface IAuthState {
  status: string;
  auth: IInformationAuthResponse;
  errorMessage: string;
}
