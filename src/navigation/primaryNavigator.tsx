import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { NavigationProps } from "./appNavigator";
import Login from "src/screens/login";
import Home from "src/screens/home";

export type PrimaryParamList = {
  login: undefined;
  home: undefined;
};
export type PrimaryScreenProps<T extends keyof PrimaryParamList> =
  NativeStackScreenProps<PrimaryParamList, T>;
const PrimaryStack = createNativeStackNavigator<PrimaryParamList>();
export const PrimaryNavigator = (props: NavigationProps) => {
  return (
    <PrimaryStack.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
    >
      <PrimaryStack.Screen name="login" component={Login} />
      <PrimaryStack.Screen name="home" component={Home} />
    </PrimaryStack.Navigator>
  );
};
