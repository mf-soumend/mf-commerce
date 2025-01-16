import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import { useTheme } from "@react-navigation/native";
import { Colors, fontSize, spacing, typography } from "src/theme";
import { verticalScale as vs } from "src/utils";

const FloatingButton = ({
  title = <Text>Sample</Text>,
  onPress = () => {},
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyle(colors), [colors]);
  return (
    <View style={styles.floatingBtnContainer}>
      <TouchableOpacity style={styles.addToBagButton} onPress={onPress}>
        {title}
      </TouchableOpacity>
    </View>
  );
};

export default FloatingButton;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    floatingBtnContainer: {
      position: "absolute",
      bottom: 0,
      height: vs(100),
      left: 0,
      right: 0,
      backgroundColor: colors.background,
      justifyContent: "center",
      paddingHorizontal: vs(spacing.lg),
      zIndex: 99,
    },
    addToBagButton: {
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      backgroundColor: colors.primary,
      borderRadius: vs(100),
      paddingHorizontal: vs(spacing.lg),
      paddingVertical: vs(spacing.md),
    },
  });
