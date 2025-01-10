import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { Colors, fontSize, spacing, typography } from "src/theme";
import { verticalScale as vs } from "src/utils";

const ResultNotFound = () => {
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  return (
    <View style={styles.container}>
      <View style={styles.resultWrapper}>
        <Image source={require("assets/search.png")} style={styles.image} />
        <Text style={styles.errorMessage}>
          Sorry, we couldn't find any matching result for your Search.
        </Text>
      </View>
    </View>
  );
};

export default ResultNotFound;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: vs(spacing.xl),
      alignItems: "center",
    },
    resultWrapper: {
      marginTop: vs(120),
      gap: vs(spacing.lg),
      paddingHorizontal: vs(spacing.lg),
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      height: vs(100),
      width: vs(100),
    },
    errorMessage: {
      fontSize: fontSize.h2,
      color: colors.text,
      fontFamily: typography.regular,
      textAlign: "center",
    },
  });
