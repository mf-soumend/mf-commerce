import { StyleSheet, Text, View } from "react-native";
import React, { FC, useMemo } from "react";
import { PrimaryScreenProps } from "src/navigation";
import { useAppSelector } from "src/store";
import { useTheme } from "@react-navigation/native";
import { Colors, spacing } from "src/theme";
import { verticalScale as vs } from "src/utils";
import { selectCart } from "src/store/slices/cartSlice";
import ResultNotFound from "src/components/resultNotFound";

const Cart: FC<PrimaryScreenProps<"cart">> = () => {
  const cart = useAppSelector(selectCart);
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyle(colors), []);
  if (cart.length === 0) {
    return (
      <ResultNotFound
        title="Your Cart is Empty"
        source={require("assets/parcel.png")}
      />
    );
  }
  return (
    <View style={styles.container}>
      {cart.map((item: any, idx: number) => {
        return (
          <Text key={idx} style={{ color: colors.text }}>
            {item.name} {item.quantity}
          </Text>
        );
      })}
    </View>
  );
};

export default Cart;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: { flex: 1, paddingHorizontal: vs(spacing.lg) },
  });
