import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { PrimaryScreenProps } from "src/navigation";
import { selectSelectedCategoryName, useAppSelector } from "src/store";
import { useTheme } from "@react-navigation/native";
import { Colors } from "src/theme";
import ProductListings from "src/components/productListings";

const ProductList: FC<PrimaryScreenProps<"productList">> = () => {
  const selectedCategory = useAppSelector(selectSelectedCategoryName);
  const { colors } = useTheme();
  const styles = makeStyle(colors);

  return (
    <>
      <View style={styles.container}>
        <ProductListings showTitle title={selectedCategory} />
      </View>
    </>
  );
};

export default ProductList;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });
