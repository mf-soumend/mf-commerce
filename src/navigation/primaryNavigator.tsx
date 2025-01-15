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
import {
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import makeCommanStyles from "styles";
import Search from "src/screens/search";
import { ArrowLeft2 } from "iconsax-react-native";
import { verticalScale as vs } from "src/utils";
import { spacing } from "src/theme";
import ProductDetails from "src/screens/productDetails";

export type PrimaryParamList = {
  login: undefined;
  shopHome: undefined;
  cart: undefined;
  productList: undefined;
  search: undefined;
  productDetails: { id: number };
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
    <>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={scheme === "dark" ? "light-content" : "dark-content"}
      />
      <PrimaryStack.Navigator
        initialRouteName={isUserAuthenticated ? "shopHome" : "login"}
        screenOptions={({ navigation }) => ({
          headerShown: true,
          headerStyle: commonStyles.header,
          title: "",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft: () => {
            return (
              <TouchableOpacity
                style={commonStyles.leftRightBtnStyle}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <ArrowLeft2
                  size={vs(spacing.md)}
                  variant="Broken"
                  color={colors.text}
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
            <PrimaryStack.Screen
              name="cart"
              component={Cart}
              options={{
                headerTitle: () => (
                  <Text style={commonStyles.primaryHeaderTitle}>Cart</Text>
                ),
              }}
            />
            <PrimaryStack.Screen name="search" component={Search} />
            <PrimaryStack.Screen
              name="productDetails"
              component={ProductDetails}
            />
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
    </>
  );
};
