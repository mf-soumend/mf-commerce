import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { NavigationProps } from "./appNavigator";
import Login from "src/screens/login";
import { selectIsAuthenticated, useAppSelector } from "src/store";
import { TabNavigator } from "./tabNavigator";
import Cart from "src/screens/cart";

export type PrimaryParamList = {
  login: undefined;
  shopHome: undefined;
  cart: undefined;
};
export type PrimaryScreenProps<T extends keyof PrimaryParamList> =
  NativeStackScreenProps<PrimaryParamList, T>;
const PrimaryStack = createNativeStackNavigator<PrimaryParamList>();
export const PrimaryNavigator = (props: NavigationProps) => {
  const isUserAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <PrimaryStack.Navigator
      initialRouteName={isUserAuthenticated ? "shopHome" : "login"}
      screenOptions={{
        headerShown: false,
      }}
    >
      {isUserAuthenticated ? (
        <>
          <PrimaryStack.Screen name="shopHome" component={TabNavigator} />
          <PrimaryStack.Screen name="cart" component={Cart} />
        </>
      ) : (
        <PrimaryStack.Screen name="login" component={Login} />
      )}
    </PrimaryStack.Navigator>
  );
};
