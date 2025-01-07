import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { FC } from "react";
import { useTheme } from "@react-navigation/native";
import { Colors, fontSize, spacing, typography } from "src/theme";
import { verticalScale as vs } from "src/utils";
import { FontAwesome6 } from "@expo/vector-icons";

export interface InputProps extends Omit<TextInputProps, "ref"> {
  // The label text to display if not using `labelTx`.
  label?: string;
  // The placeholder text to display if not using `placeholderTx`.
  placeholder?: string;
  // Optional input style override.
  style?: StyleProp<TextStyle>;
  // Style overrides for the container.
  containerStyle?: StyleProp<ViewStyle>;
  // Style overrides for the input wrapper.
  inputWrapperStyle?: StyleProp<ViewStyle>;
  // Style overrides for the outer wrapper.
  outerWrapper?: StyleProp<ViewStyle>;
  // Style overrides for the error text.
  errorStyle?: StyleProp<TextStyle>;
  // The type of icon to be displayed on the right side of the text input.
  rightIcon?: string;
  // The type of icon to be displayed on the left side of the text input.
  leftIcon?: string;
  // Determines whether the text input is disabled or not.
  disabled?: boolean;
  // The size of the left icon.
  leftIconSize?: number;
  // The size of the right icon.
  rightIconSize?: number;
  // Display error string for textinput
  error?: string;
  // Callback function to be executed when the right icon is pressed.
  onPressRightIcon?: () => void;
}

const Input: FC<InputProps> = ({
  label,
  placeholder,
  style,
  containerStyle,
  inputWrapperStyle,
  outerWrapper,
  errorStyle,
  rightIcon,
  leftIcon,
  disabled,
  secureTextEntry,
  leftIconSize = vs(16),
  rightIconSize = vs(16),
  error,
  onPressRightIcon,
  ...rest
}) => {
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  const wrapperStyle = [
    styles.inputWrapperStyles,
    { borderColor: !!!error ? colors.border : colors.danger },
    containerStyle,
  ];
  return (
    <View style={[styles.outerWrapper, outerWrapper]}>
      <View style={wrapperStyle}>
        {leftIcon && (
          <FontAwesome6
            name={leftIcon}
            size={leftIconSize}
            color={!error ? colors.tertiary : colors.danger}
          />
        )}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.placeholderText}
          editable={!disabled}
          style={[styles.inputStyles, style]}
          cursorColor={colors.primary}
          secureTextEntry={secureTextEntry}
          {...rest}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onPressRightIcon}>
            <FontAwesome6
              name={rightIcon}
              size={rightIconSize}
              color={!error ? colors.tertiary : colors.danger}
            />
          </TouchableOpacity>
        )}
      </View>
      {!!error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}
    </View>
  );
};

export default Input;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    outerWrapper: {} as ViewStyle,
    inputWrapperStyles: {
      backgroundColor: colors.backgroundSecondary,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.backgroundSecondary,
      borderRadius: vs(spacing.xxs),
      paddingHorizontal: vs(spacing.sm),
    } as ViewStyle,
    inputStyles: {
      backgroundColor: colors.backgroundSecondary,
      flex: 1,
      height: vs(56),
      paddingHorizontal: vs(spacing.xs),
      fontSize: fontSize.body,
      fontFamily: typography.medium,
      color: colors.text,
      paddingTop: Platform.OS == "android" ? 2 : 0,
      paddingBottom: 0,
    } as TextStyle,
    errorText: {
      color: colors.danger,
      marginLeft: vs(spacing.xxxs),
      marginTop: vs(spacing.xxs),
    } as TextStyle,
  });
