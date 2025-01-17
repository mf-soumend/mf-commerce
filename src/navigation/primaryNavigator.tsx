import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { NavigationProps } from "./appNavigator";
import Login from "src/screens/login";
import { selectIsAuthenticated, useAppSelector } from "src/store";
import { TabNavigator, TabParamsList } from "./tabNavigator";
import Cart from "src/screens/cart";
import ProductList from "src/screens/productList";
import { NavigatorScreenParams, useTheme } from "@react-navigation/native";
import {
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import makeCommanStyles from "styles";
import Search from "src/screens/search";
import { ArrowLeft2 } from "iconsax-react-native";
import { verticalScale as vs } from "src/utils";
import { spacing } from "src/theme";
import ProductDetails from "src/screens/productDetails";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderConfirmationScreen from "src/screens/cart/orderConfirmation";
import OrderSuccess from "src/screens/cart/orderSuccess";
import OrderDetails from "src/screens/orderDetails";

export type PrimaryParamList = {
  login: undefined;
  shopHome: NavigatorScreenParams<TabParamsList> | undefined;
  cart: undefined;
  productList: undefined;
  search: undefined;
  productDetails: { id: number };
  orderConfirmation: undefined;
  orderSuccess: undefined;
  orderDetails: { id: number };
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
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={scheme === "dark" ? "light-content" : "dark-content"}
      />
      <PrimaryStack.Navigator
        initialRouteName={isUserAuthenticated ? "shopHome" : "login"}
        screenOptions={({ navigation }) => ({
          headerShown: true,
          headerStyle: commonStyles.header,
          headerTitleAlign: "center",
          headerShadowVisible: false,
          header: ({ options }) => {
            const renderHeaderTitle = () => {
              if (typeof options.headerTitle === "function") {
                // Call the function to render the title
                return options.headerTitle({
                  children: "",
                  tintColor: colors.text,
                });
              } else if (typeof options.headerTitle === "string") {
                // Render the string directly
                return (
                  <Text style={commonStyles.primaryHeaderTitle}>
                    {options.headerTitle}
                  </Text>
                );
              }
              return null; // Default case, no title
            };

            return (
              <View style={commonStyles.header}>
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
                {renderHeaderTitle()}
              </View>
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
            <PrimaryStack.Screen
              name="orderDetails"
              component={OrderDetails}
              options={({ route }) => ({
                headerTitle: () => (
                  <Text style={commonStyles.primaryHeaderTitle}>
                    Order #{route.params.id}
                  </Text>
                ),
              })}
            />
            <PrimaryStack.Screen
              name="orderConfirmation"
              component={OrderConfirmationScreen}
              options={{
                headerTitle: () => (
                  <Text style={commonStyles.primaryHeaderTitle}>Checkout</Text>
                ),
              }}
            />
            <PrimaryStack.Screen name="search" component={Search} />
            <PrimaryStack.Screen
              name="orderSuccess"
              component={OrderSuccess}
              options={{ headerShown: false }}
            />
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
    </SafeAreaView>
  );
};
