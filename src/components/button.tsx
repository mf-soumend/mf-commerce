import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React, { FC } from "react";
import { useTheme } from "@react-navigation/native";
import { Colors, fontSize, typography } from "src/theme";
import { verticalScale as vs } from "src/utils";

export interface ButtonProps {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}
const Button: FC<ButtonProps> = ({
  title,
  onPress,
  style,
  titleStyle,
  ...rest
}) => {
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      {...rest}
    >
      <Text style={[styles.buttonText, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    button: {
      backgroundColor: colors.primary,
      borderRadius: vs(100),
      paddingVertical: vs(11),
      flexDirection: "row",
      justifyContent: "center",
    },
    buttonText: {
      textAlign: "center",
      color: colors.white,
      fontSize: fontSize.h3,
      fontFamily: typography.medium,
    },
  });
