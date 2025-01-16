import { StyleSheet, Text, View } from "react-native";
import React, { FC, useMemo } from "react";
import { PrimaryScreenProps } from "src/navigation";
import { selectUser, useAppDispatch, useAppSelector } from "src/store";
import { selectCart } from "src/store/slices/cartSlice";
import { useTheme } from "@react-navigation/native";
import { Colors, fontSize, spacing, typography } from "src/theme";
import { verticalScale as vs } from "src/utils";
import Button from "src/components/button";

const OrderConfirmationScreen: FC<PrimaryScreenProps<"orderConfirmation">> = ({
  navigation,
}) => {
  const cart = useAppSelector(selectCart);
  const { user } = useAppSelector(selectUser);
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyle(colors), [colors]);
  const fullAddress = useMemo(() => {
    const { address, city, state, stateCode, postalCode } = user?.address;
    return `${address}, ${city}, ${state} (${stateCode}) ${postalCode}`;
  }, [user]);
  const dispatch = useAppDispatch();

  const total = useMemo(
    () =>
      cart.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
      ),
    [cart]
  );
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.paragraph}>Shipping Address</Text>
        <Text numberOfLines={4} style={styles.paragraphHighlight}>
          {fullAddress}
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.paragraph}>Payment Method</Text>
        <Text numberOfLines={4} style={styles.paragraphHighlight}>
          Cash on Delivery
        </Text>
      </View>
      <View style={styles.buttomCard}>
        <View style={styles.bottomCardRow}>
          <Text style={styles.paragraph}>Subtotal</Text>
          <Text style={styles.valueText}>${total.toFixed(2)}</Text>
        </View>
        <View style={styles.bottomCardRow}>
          <Text style={styles.paragraph}>Shipping</Text>
          <Text style={styles.valueText}>Free</Text>
        </View>
        <View style={styles.bottomCardRow}>
          <Text style={styles.paragraph}>Total</Text>
          <Text style={styles.valueText}>${total.toFixed(2)}</Text>
        </View>
        <Button
          titleProps={
            <View style={styles.placeOrderbtn}>
              <Text style={styles.placeOrderbtnText}>{`$${total.toFixed(
                2
              )}`}</Text>
              <Text style={styles.placeOrderbtnText}>Place Order</Text>
            </View>
          }
          style={styles.btnStyle}
          onPress={() => {
            navigation.popTo("orderSuccess");
          }}
        />
      </View>
    </View>
  );
};

export default OrderConfirmationScreen;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: vs(spacing.lg),
      paddingTop: vs(spacing.md),
      gap: vs(spacing.md),
    },
    card: {
      padding: vs(spacing.sm),
      borderRadius: vs(spacing.xs),
      backgroundColor: colors.backgroundSecondary,
    },
    buttomCard: {
      flexGrow: 1,
      paddingVertical: vs(spacing.lg),
      gap: vs(spacing.xs),
      justifyContent: "flex-end",
      backgroundColor: colors.background,
    },
    bottomCardRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    paragraphHighlight: {
      fontFamily: typography.regular,
      fontSize: fontSize.h3,
      color: colors.text,
      marginTop: vs(spacing.xxs),
    },
    paragraph: {
      fontFamily: typography.regular,
      fontSize: fontSize.body2,
      color: colors.paragraph,
    },
    valueText: {
      fontFamily: typography.regular,
      fontSize: fontSize.body2,
      color: colors.text,
    },
    btnStyle: { marginTop: vs(spacing.lg) },
    placeOrderbtn: {
      flex: 1,
      paddingHorizontal: vs(spacing.lg),
      flexDirection: "row",
      justifyContent: "space-between",
    },
    placeOrderbtnText: {
      color: colors.white,
      fontSize: fontSize.h3,
      fontFamily: typography.medium,
    },
  });
