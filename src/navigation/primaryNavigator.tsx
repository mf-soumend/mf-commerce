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
import ProductList from "src/screens/productList";
import { useTheme } from "@react-navigation/native";
import { Image, TouchableOpacity, useColorScheme } from "react-native";
import makeCommanStyles from "styles";

export type PrimaryParamList = {
  login: undefined;
  shopHome: undefined;
  cart: undefined;
  productList: undefined;
};
export type PrimaryScreenProps<T extends keyof PrimaryParamList> =
  NativeStackScreenProps<PrimaryParamList, T>;
const PrimaryStack = createNativeStackNavigator<PrimaryParamList>();
export const PrimaryNavigator = (props: NavigationProps) => {
  const isUserAuthenticated = useAppSelector(selectIsAuthenticated);
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const commonStyles = makeCommanStyles(colors);
  return (
    <PrimaryStack.Navigator
      initialRouteName={isUserAuthenticated ? "shopHome" : "login"}
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: commonStyles.header,
        title: "",
        headerShadowVisible: false,
        headerLeft: () => {
          return (
            <TouchableOpacity
              style={commonStyles.leftRightBtnStyle}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image
                source={
                  scheme === "dark"
                    ? require("assets/arrowleftDark.png")
                    : require("assets/arrowleft.png")
                }
                style={commonStyles.leftRightBtnImageStyle}
              />
            </TouchableOpacity>
          );
        },
      })}
    >
      {isUserAuthenticated ? (
        <>
          <PrimaryStack.Screen
            name="shopHome"
            options={{ headerShown: false }}
            component={TabNavigator}
          />
          <PrimaryStack.Screen name="cart" component={Cart} />
          <PrimaryStack.Screen name="productList" component={ProductList} />
        </>
      ) : (
        <PrimaryStack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
      )}
    </PrimaryStack.Navigator>
  );
};
