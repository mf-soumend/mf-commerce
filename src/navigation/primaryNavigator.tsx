import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { NavigationProps } from "./appNavigator";
import Login from "src/screens/login";
import Home from "src/screens/home";
import { selectIsAuthenticated, useAppSelector } from "src/store";

export type PrimaryParamList = {
  login: undefined;
  home: undefined;
};
export type PrimaryScreenProps<T extends keyof PrimaryParamList> =
  NativeStackScreenProps<PrimaryParamList, T>;
const PrimaryStack = createNativeStackNavigator<PrimaryParamList>();
export const PrimaryNavigator = (props: NavigationProps) => {
  const isUserAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <PrimaryStack.Navigator
      initialRouteName={isUserAuthenticated ? "home" : "login"}
      screenOptions={{ headerShown: false }}
    >
      {isUserAuthenticated ? (
        <PrimaryStack.Screen name="home" component={Home} />
      ) : (
        <PrimaryStack.Screen name="login" component={Login} />
      )}
    </PrimaryStack.Navigator>
  );
};
