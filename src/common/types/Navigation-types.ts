import {Earning} from '../interfaces/earning.interface';

export type RootStackParamList = {
  RegisterScreen: undefined;
  LoginScreen: undefined;
  HomeScreen: undefined;
  SeeMoreEarningScreen: {earning: Earning};
  ForgotPasswordScreen: undefined;
  ResetPasswordScreen: undefined;
  ValidateCodeScreen: undefined;
  EditEarningScreen: {earning: Earning};
  DeleteEarningScreen: undefined;
};
