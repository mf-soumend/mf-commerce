import { StyleSheet } from "react-native";
import { Colors, fontSize, spacing, typography } from "theme";
import { verticalScale as vs } from "utils";

const makeCommanStyles = (colors: Colors) =>
  StyleSheet.create({
    header: {
      backgroundColor: colors.background,
      paddingHorizontal: vs(spacing.lg),
      flexDirection: "row",
      gap: vs(spacing.md),
      alignItems: "center",
    },
    tabNavHeader: {
      height: vs(100),
      backgroundColor: colors.background,
    },
    headerTitle: {
      fontSize: fontSize.h3,
      fontFamily: typography.medium,
      color: colors.text,
    },
    primaryHeaderTitle: {
      fontSize: fontSize.h3,
      fontFamily: typography.bold,
      color: colors.text,
      marginTop: vs(40),
      marginRight: vs(56),
      flex: 1,
      textAlign: "center",
    },
    tabNavBtnExtra: {
      marginHorizontal: vs(spacing.lg),
      marginBottom: 0,
    },
    leftRightBtnStyle: {
      height: vs(40),
      width: vs(40),
      backgroundColor: colors.backgroundSecondary,
      borderRadius: "100%",
      overflow: "hidden",
      flexDirection: "row",
      justifyContent: "center",
      marginTop: vs(spacing.xxl),
      marginBottom: vs(spacing.sm),
      alignItems: "center",
    },
    leftRightBtnImageStyle: {
      height: vs(spacing.md),
      width: vs(spacing.md),
    },
  });

export default makeCommanStyles;
