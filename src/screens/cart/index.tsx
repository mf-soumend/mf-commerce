import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useMemo } from "react";
import { PrimaryScreenProps } from "src/navigation";
import { useAppDispatch, useAppSelector } from "src/store";
import { useTheme } from "@react-navigation/native";
import { Colors, fontSize, spacing, typography } from "src/theme";
import { verticalScale as vs } from "src/utils";
import { removeAll, selectCart } from "src/store/slices/cartSlice";
import ResultNotFound from "src/components/resultNotFound";
import Button from "src/components/button";
import CartCard from "src/components/cartCard";

const Cart: FC<PrimaryScreenProps<"cart">> = ({ navigation }) => {
  const cart = useAppSelector(selectCart);
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyle(colors), [colors]);
  const dispatch = useAppDispatch();

  const total = useMemo(
    () =>
      cart.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
      ),
    [cart]
  );

  if (cart.length === 0) {
    return (
      <ResultNotFound
        title="Your Cart is Empty"
        source={require("assets/parcel.png")}
      />
    );
  }

  const removeAllFn = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to remove all items from the cart?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => dispatch(removeAll()) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.removeAllWrapper}>
        <TouchableOpacity style={styles.removeAllButton} onPress={removeAllFn}>
          <Text style={styles.removeAllBtn}>Remove All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.productId.toString()}
        renderItem={({ item }) => <CartCard item={item} key={item.productId} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: vs(spacing.xs),
        }}
      />
      <View style={styles.buttomCard}>
        <View style={styles.bottomCardRow}>
          <Text style={styles.paragraph}>Subtotal</Text>
          <Text style={styles.paragraphHighLight}>${total.toFixed(2)}</Text>
        </View>
        <View style={styles.bottomCardRow}>
          <Text style={styles.paragraph}>Shipping</Text>
          <Text style={styles.paragraphHighLight}>Free</Text>
        </View>
        <View style={styles.bottomCardRow}>
          <Text style={styles.paragraph}>Total</Text>
          <Text style={styles.paragraphHighLight}>${total.toFixed(2)}</Text>
        </View>
        <Button
          title="Checkout"
          onPress={() => {
            navigation.navigate("orderConfirmation");
          }}
        />
      </View>
    </View>
  );
};

export default Cart;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      paddingHorizontal: vs(spacing.lg),
    },
    removeAllWrapper: {
      flexDirection: "row",
      justifyContent: "flex-end",
      paddingVertical: vs(spacing.md),
    },
    removeAllButton: {
      paddingHorizontal: vs(spacing.sm),
    },
    removeAllBtn: {
      fontSize: fontSize.h3,
      fontFamily: typography.medium,
      color: colors.text,
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
    paragraph: {
      fontFamily: typography.regular,
      fontSize: fontSize.body2,
      color: colors.paragraph,
    },
    paragraphHighLight: {
      fontFamily: typography.regular,
      fontSize: fontSize.body2,
      color: colors.text,
    },
  });
