import { StyleSheet, Text, View } from "react-native";
import React, { FC, useMemo } from "react";
import { Colors, fontSize, spacing, typography } from "src/theme";
import { verticalScale as vs } from "src/utils";
import { useTheme } from "@react-navigation/native";
import Image from "src/components/image";
import Button from "src/components/button";
import { PrimaryScreenProps } from "src/navigation";

const OrderSuccess: FC<PrimaryScreenProps<"orderSuccess">> = ({
  navigation,
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyle(colors), [colors]);
  return (
    <View style={styles.container}>
      <View style={styles.successImageWrapper}>
        <Image
          style={styles.successImage}
          source={require("assets/order-success.png")}
        />
      </View>
      <View style={styles.successMessageContainer}>
        <Text style={styles.title}>Order Placed Successfully</Text>
        <Text style={styles.description}>
          You will receive an email confirmation
        </Text>
        <View style={styles.btnWrapper}>
          <Button
            title="See Order Details"
            onPress={() => {
              navigation.popTo("shopHome", { screen: "orders" });
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default OrderSuccess;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    successImageWrapper: {
      flex: 1,
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
    },
    successImage: {
      width: vs(250),
      objectFit: "contain",
    },
    successMessageContainer: {
      flex: 0.8,
      backgroundColor: colors.background,
      borderTopStartRadius: vs(spacing.md),
      borderTopEndRadius: vs(spacing.md),
      paddingVertical: vs(spacing.xxl),
      paddingHorizontal: vs(spacing.lg),
    },
    title: {
      fontSize: fontSize.h1,
      fontFamily: typography.bold,
      color: colors.text,
      textAlign: "center",
    },
    description: {
      marginTop: vs(spacing.lg),
      fontFamily: typography.regular,
      fontSize: fontSize.h3,
      color: colors.paragraph,
      textAlign: "center",
    },
    btnWrapper: {
      flex: 1,
      justifyContent: "flex-end",
    },
  });
