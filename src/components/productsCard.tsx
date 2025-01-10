import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Product } from "src/service";
import { verticalScale as vs } from "src/utils";
import { Colors, fontSize, spacing, typography } from "src/theme";
import { PrimaryScreenProps } from "src/navigation";

const ProductsCard = ({ product }: { product: Product }) => {
  const navigation = useNavigation<PrimaryScreenProps<"productDetails">>();
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate("productDetails", { id: product.id });
      }}
    >
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
    </TouchableOpacity>
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
