import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Colors, fontSize, spacing, typography } from "src/theme";
import { verticalScale as vs } from "src/utils";
import Button from "./button";
import { PrimaryParamList } from "src/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ResultNotFoundProps {
  source?: ImageSourcePropType | undefined;
  title: string;
}

const ResultNotFound = ({
  source = require("assets/search.png"),
  title,
}: ResultNotFoundProps) => {
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  const navigation =
    useNavigation<NativeStackNavigationProp<PrimaryParamList>>();
  const goToHome = () => {
    if (navigation.canGoBack()) {
      navigation.pop();
    } else {
      navigation.navigate("shopHome"); // Fallback navigation
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.resultWrapper}>
        <Image source={source} style={styles.image} />
        <Text style={styles.errorMessage}>{title}</Text>
        <Button
          title="Explore Categories"
          onPress={goToHome}
          titleStyle={{ paddingHorizontal: vs(spacing.lg) }}
        />
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
