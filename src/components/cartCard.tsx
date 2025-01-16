import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { Colors, fontSize, spacing, typography } from "src/theme";
import Image from "./image";
import { Add, Minus } from "iconsax-react-native";
import { verticalScale as vs } from "src/utils";
import { useAppDispatch } from "src/store";
import { removeFromCart, updateCart } from "src/store/slices/cartSlice";

const CartCard = ({ item }: { item: any }) => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const styles = makeStyle(colors);

  const updateCartFn = (data: any, remove = false) => {
    const payload = { ...data };
    if (remove) {
      payload.quantity -= 1;
      if (
        payload.quantity < 1 ||
        payload.quantity < payload.minimumOrderQuantity
      ) {
        dispatch(removeFromCart(payload));
        return;
      }
    } else {
      payload.quantity += 1;
    }
    dispatch(updateCart(payload));
  };
  return (
    <View key={item.productId} style={styles.cartCardContainer}>
      <View style={styles.imageWrapper}>
        {item.thumbnail ? (
          <Image style={styles.productImage} src={item.thumbnail} />
        ) : (
          <Image
            style={styles.productImage}
            source={require("assets/dummyProduct.png")}
          />
        )}
      </View>
      <View style={styles.detailsWrapper}>
        <View style={styles.details}>
          <Text numberOfLines={1} style={styles.title}>
            {item.name}
          </Text>
          <Text style={styles.totalPrice}>
            {`$${(item.price * item.quantity).toFixed(2)}`}
          </Text>
        </View>
        <View style={styles.quantity}>
          <Text style={styles.title}>Min : {item.minimumOrderQuantity}</Text>
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => updateCartFn(item, true)}
            >
              <Minus
                size={vs(spacing.sm)}
                color={colors.white}
                variant="Broken"
              />
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => updateCartFn(item)}
            >
              <Add
                size={vs(spacing.sm)}
                color={colors.white}
                variant="Broken"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartCard;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    cartCardContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: vs(spacing.sm),
      padding: vs(spacing.xs),
      backgroundColor: colors.backgroundSecondary,
      borderRadius: vs(spacing.xs),
    },
    imageWrapper: {
      height: vs(spacing.xxxl),
      width: vs(spacing.xxxl),
      overflow: "hidden",
      backgroundColor: colors.card,
    },
    productImage: {
      height: vs(spacing.xxxl),
      objectFit: "contain",
    },
    detailsWrapper: {
      flex: 1,
      gap: vs(spacing.xs),
    },
    details: {
      flexDirection: "row",
      gap: vs(spacing.lg),
    },
    quantity: {
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      flex: 1,
      fontSize: fontSize.h4,
      fontFamily: typography.regular,
      color: colors.text,
    },
    totalPrice: {
      fontSize: fontSize.h4,
      fontFamily: typography.semiBold,
      color: colors.text,
    },
    controls: {
      flexDirection: "row",
      alignItems: "center",
      gap: vs(spacing.sm),
    },
    controlButton: {
      padding: vs(6),
      backgroundColor: colors.primary,
      borderRadius: vs(spacing.sm),
    },
    quantityValue: {
      fontSize: fontSize.h4,
      fontFamily: typography.medium,
      color: colors.text,
    },
  });
