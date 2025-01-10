/**
 * Themes allow you to change the colors of various components provided by React Navigation. You can use themes to:
 * Customize the colors match your brand
 * Provide light and dark themes based on the time of the day or user preference
 */
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { colors } from "theme/colors";
import { ExtendedTheme, ThemeWithMode } from "theme/theme.types";

export type Colors = typeof lightThemeColors;

/**
 * theme
 */
const theme: ThemeWithMode = {
  light: {
    primary: colors.primary,
    text: colors.black,
    textSecondary: colors.textSecondaryDark,
    paragraph: colors.paragraph,
    background: colors.white,
    backgroundSecondary: colors.cultured,
    tertiary: colors.yankeesBlue,
    btnTextPrimary: colors.white,
    btnTextSecondary: colors.chineseSilver,
    border: colors.platinum,
    placeholderText: colors.gray,
    card: colors.cardBgLight,
    tabBarPrimary: colors.tabPrimary,
    tabBarSecondary: colors.tabSecondary,
  },
  dark: {
    primary: colors.primary,
    text: colors.white,
    textSecondary: colors.white,
    paragraph: colors.paragraphDark,
    background: colors.darkBg,
    backgroundSecondary: colors.culturedDark,
    tertiary: colors.lightGray,
    btnTextPrimary: colors.lavendarGray,
    btnTextSecondary: colors.silverFoil,
    border: colors.darkCharcole,
    placeholderText: colors.gray,
    card: colors.cardBgDark,
    tabBarPrimary: colors.tabDarkPrimary,
    tabBarSecondary: colors.tabDarkSecondary,
  },
};

/**
 * Define list of available theme
 * To add custom theme navigate to ./themes and export custom theme
 * Define custom theme below and update value as custom theme name in settings.ts
 */

const commonColors = {
  common: {
    success: colors.success,
    danger: colors.danger,
    warning: colors.warning,
    info: colors.info,
    spinner: "rgba(0, 0, 0, 0.5)",
  },
  light: {},
  dark: {},
};

/**
 * Light theme colors
 */
const lightThemeColors = {
  ...DefaultTheme.colors,
  ...colors,
  ...commonColors.common,
  ...commonColors.light,
  ...theme.light,
};

/**
 * Dark theme colors
 */
const darkThemeColors = {
  ...DarkTheme.colors,
  ...colors,
  ...commonColors.common,
  ...commonColors.dark,
  ...theme.dark,
};

/** Light mode theme and colors */
export const lightTheme: ExtendedTheme = {
  ...DefaultTheme,
  dark: false,
  colors: lightThemeColors,
};

/** Dark mode theme and colors */
export const darkTheme: ExtendedTheme = {
  ...DarkTheme,
  dark: true,
  colors: darkThemeColors,
};
