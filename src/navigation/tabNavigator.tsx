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
import Home from "src/screens/home";
import Profile from "src/screens/profile";
import Notifications from "src/screens/notifications";
import Orders from "src/screens/orders";
import makeCommanStyles from "styles";
import {
  Home2,
  NotificationBing,
  Receipt1,
  Profile as Prf,
  Bag2,
} from "iconsax-react-native";

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
    icon: (color: string) => React.JSX.Element;
  }): BottomTabNavigationOptions => ({
    tabBarShowLabel: false,
    tabBarIcon: ({ color }) => icon(color),
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
            icon: (color: string) => (
              <Home2 size={vs(spacing.lg)} color={color} variant="Broken" />
            ),
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
                <Image
                  source={require("assets/user.png")}
                  style={styles.profilePicture}
                />
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
                <Bag2
                  variant={"Broken"}
                  size={vs(spacing.md)}
                  color={colors.white}
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
            icon: (color: string) => (
              <NotificationBing
                size={vs(spacing.lg)}
                color={color}
                variant="Broken"
              />
            ),
          }),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="orders"
        component={Orders}
        options={{
          ...generateScreenOptions({
            icon: (color) => (
              <Receipt1 size={vs(spacing.lg)} color={color} variant="Broken" />
            ),
          }),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          ...generateScreenOptions({
            icon: (color) => (
              <Prf size={vs(spacing.lg)} color={color} variant="Broken" />
            ),
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
