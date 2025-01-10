import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginUser, useAppDispatch } from "src/store";
import Button from "src/components/button";
import { Colors, fontSize, spacing, typography } from "src/theme";
import { verticalScale as vs } from "src/utils";
import Input from "src/components/input";
import { useFormik } from "formik";
import { initialLoginData, loginSchema } from "validation";
import { login } from "src/service";
import OverlayActivityIndicator from "src/components/overlayActivityIndicator";
import { Eye, EyeSlash } from "iconsax-react-native";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: initialLoginData,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      login(values)
        .then((res) => {
          dispatch(loginUser({ user: res }));
        })
        .catch((err) => {
          formik.setErrors({ password: "Wrong username or password !!" });
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });
  return (
    <SafeAreaView style={styles.containerWrapper}>
      <OverlayActivityIndicator loading={loading} />
      <TouchableWithoutFeedback
        onPress={
          Platform.OS === "android" || Platform.OS === "ios"
            ? Keyboard.dismiss
            : () => {}
        }
      >
        <View style={styles.container}>
          <Text style={styles.loginText}>Sign in</Text>
          <View style={styles.loginFormContainer}>
            <Input
              placeholder="Username"
              onBlur={formik.handleBlur("username")}
              onChangeText={formik.handleChange("username")}
              error={
                formik.touched.username && formik.errors.username
                  ? formik.errors.username
                  : ""
              }
            />
            <Input
              placeholder="Password"
              onBlur={formik.handleBlur("password")}
              onChangeText={formik.handleChange("password")}
              secureTextEntry={!showPassword}
              rightIcon={(error) =>
                !showPassword ? (
                  <EyeSlash
                    size={vs(spacing.md)}
                    color={!error ? colors.tertiary : colors.danger}
                    variant="Broken"
                  />
                ) : (
                  <Eye
                    size={vs(spacing.md)}
                    color={!error ? colors.tertiary : colors.danger}
                    variant="Broken"
                  />
                )
              }
              onPressRightIcon={() => {
                setShowPassword((val) => !val);
              }}
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""
              }
            />
            <Button title="Login" onPress={formik.handleSubmit} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Login;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    containerWrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
      paddingHorizontal: vs(23),
    },
    loginText: {
      color: colors.text,
      fontFamily: typography.medium,
      fontSize: fontSize.h1,
      marginTop: vs(123),
    },
    loginFormContainer: {
      marginTop: vs(32),
      rowGap: vs(23),
    },
  });
