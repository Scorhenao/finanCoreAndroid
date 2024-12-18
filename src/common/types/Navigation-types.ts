import {BudgetResponse} from '../interfaces/budgetResponse.interface';
import {Earning} from '../interfaces/earning.interface';
import {User} from '../interfaces/user.interface';

export type RootStackParamList = {
  RegisterScreen: undefined;
  LoginScreen: undefined;
  HomeScreen: undefined;
  SeeMoreEarningScreen: {earning: Earning};
  ForgotPasswordScreen: undefined;
  ResetPasswordScreen: undefined;
  ValidateCodeScreen: undefined;
  AddEarningsScreen: undefined;
  EditEarningScreen: {earning: Earning};
  DeleteEarningScreen: undefined;
  AddBudgetScreen: {
    earningId: String;
    amountAvailable: string;
    earningName: string;
  };
  CategoriesScreen: undefined;
  BudgetsScreen: {earningId: String; earningName: String};
  EditBudgetScreen: {budget: BudgetResponse};
  AddTransactionScreen: {budgetId: string; budgetName: string};
  ProfileScreen: {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
  };
};
