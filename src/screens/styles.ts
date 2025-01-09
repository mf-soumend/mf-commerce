import { StyleSheet } from "react-native";
import { Colors, fontSize, spacing, typography } from "theme";
import { verticalScale as vs } from "utils";

const makeCommanStyles = (colors: Colors) =>
  StyleSheet.create({
    header: {
      backgroundColor: colors.background,
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
    tabNavBtnExtra: {
      marginHorizontal: vs(spacing.lg),
      marginTop: vs(36),
      marginBottom: 0,
    },
    leftRightBtnStyle: {
      height: vs(40),
      width: vs(40),
      marginHorizontal: vs(spacing.xs),
      backgroundColor: colors.backgroundSecondary,
      marginTop: vs(spacing.xxl),
      marginBottom: vs(spacing.sm),
      borderRadius: "100%",
      overflow: "hidden",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    leftRightBtnImageStyle: {
      height: vs(spacing.md),
      width: vs(spacing.md),
    },
  });

export default makeCommanStyles;
