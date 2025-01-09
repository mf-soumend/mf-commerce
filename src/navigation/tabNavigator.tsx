import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import {
  BottomTabNavigationOptions,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import { Colors, spacing } from "src/theme";
import { verticalScale as vs } from "src/utils";
import { PrimaryScreenProps } from "./primaryNavigator";
import Octicons from "@expo/vector-icons/Octicons";
import Home from "src/screens/home";
import Profile from "src/screens/profile";
import Notifications from "src/screens/notifications";
import Orders from "src/screens/orders";
import { selectUser, useAppSelector } from "src/store";
import makeCommanStyles from "styles";

export type TabParamsList = {
  home: undefined;
  notification: undefined;
  orders: undefined;
  profile: undefined;
};

/**
 * Tab Navigator Instance
 */
const Tab = createBottomTabNavigator<TabParamsList>();

export type TabScreenProps<T extends keyof TabParamsList> =
  BottomTabScreenProps<TabParamsList, T>;

export const TabNavigator: FC<PrimaryScreenProps<"shopHome">> = ({
  navigation: mainNav,
}) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const user = useAppSelector(selectUser).user;
  const commonStyles = makeCommanStyles(colors);
  /**
   * Screen options for tab navigator
   */
  const screenOptions: BottomTabNavigationOptions = {
    animation: "shift",
    tabBarStyle: [styles.container, styles.tabShadow],
    tabBarActiveTintColor: colors.tabBarPrimary,
    tabBarInactiveTintColor: colors.tabBarSecondary,
    tabBarHideOnKeyboard: true,
    tabBarItemStyle: styles.tabBtn,
  };

  /**
   * Generate screen options for tab navigator
   *
   * @param icon - JSX.Element | IconTypes: Icon element or icon type.
   */
  const generateScreenOptions = ({
    icon,
  }: {
    icon?: "home" | "bell" | "log" | "person";
  }): BottomTabNavigationOptions => ({
    tabBarShowLabel: false,
    tabBarIcon: ({ color }) => (
      <Octicons name={icon} size={vs(spacing.lg)} color={color} />
    ),
  });
  return (
    <Tab.Navigator
      detachInactiveScreens
      initialRouteName="home"
      screenOptions={screenOptions}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={({ navigation: tabNav }) => ({
          ...generateScreenOptions({
            icon: "home",
          }),
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: () => {
            return (
              <TouchableOpacity
                style={[
                  commonStyles.leftRightBtnStyle,
                  commonStyles.tabNavBtnExtra,
                ]}
                onPress={() => {
                  tabNav.navigate("profile");
                }}
              >
                {user?.image ? (
                  // TODO: replace "source={require("assets/categorytemp.png")}" with "src={user.image}"
                  <Image
                    source={require("assets/user.png")}
                    style={styles.profilePicture}
                  />
                ) : (
                  <Octicons
                    name="person"
                    size={vs(spacing.lg)}
                    color={colors.black}
                  />
                )}
              </TouchableOpacity>
            );
          },
          headerRight: () => {
            return (
              <TouchableOpacity
                style={[
                  commonStyles.leftRightBtnStyle,
                  commonStyles.tabNavBtnExtra,
                  { backgroundColor: colors.primary },
                ]}
                onPress={() => {
                  mainNav.navigate("cart");
                }}
              >
                <Image
                  source={require("assets/cart.png")}
                  style={commonStyles.leftRightBtnImageStyle}
                />
              </TouchableOpacity>
            );
          },
          headerStyle: commonStyles.tabNavHeader,
        })}
      />
      <Tab.Screen
        name="notification"
        component={Notifications}
        options={{
          ...generateScreenOptions({
            icon: "bell",
          }),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="orders"
        component={Orders}
        options={{
          ...generateScreenOptions({
            icon: "log",
          }),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          ...generateScreenOptions({
            icon: "person",
          }),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

/**
 * Creates styles for the component
 * @param colors - Colors: Color palette.
 */
const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      borderTopWidth: 0,
      height: vs(80),
    },
    tabShadow: {
      boxShadow: "none",
    },
    tabBtn: {
      marginTop: vs(spacing.md),
    },
    profilePicture: {
      height: vs(40),
      width: vs(40),
    },
  });
