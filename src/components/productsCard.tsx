import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { Product } from "src/service";
import { verticalScale as vs } from "src/utils";
import { Colors, fontSize, spacing, typography } from "src/theme";

const ProductsCard = ({ product }: { product: Product }) => {
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageWrapper}>
        {product.thumbnail ? (
          <Image style={styles.productImage} src={product.thumbnail} />
        ) : (
          <Image
            style={styles.productImage}
            source={require("assets/dummyProduct.png")}
          />
        )}
      </View>
      <View style={styles.details}>
        <Text numberOfLines={1} style={styles.title}>
          {product.title}
        </Text>
        <Text style={styles.price}>{`$ ${product.price}`}</Text>
      </View>
    </View>
  );
};

export default ProductsCard;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    cardContainer: {
      flex: 1,
      marginHorizontal: vs(spacing.xs),
      backgroundColor: colors.card,
      borderRadius: vs(spacing.xs),
      gap: vs(spacing.xs),
      paddingBottom: vs(spacing.md),
      overflow: "hidden",
    },
    imageWrapper: {
      height: vs(220),
      width: "100%",
      overflow: "hidden",
      backgroundColor: colors.card,
    },
    productImage: {
      height: vs(220),
      objectFit: "contain",
    },
    details: {
      paddingHorizontal: vs(spacing.xs),
      gap: vs(spacing.xs),
    },
    title: {
      fontFamily: typography.regular,
      fontSize: fontSize.body2,
      color: colors.text,
    },
    price: {
      fontFamily: typography.bold,
      fontSize: fontSize.body2,
      color: colors.text,
    },
  });
