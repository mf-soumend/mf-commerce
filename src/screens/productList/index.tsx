import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { PrimaryScreenProps } from "src/navigation";
import { selectSelectedCategoryName, useAppSelector } from "src/store";
import { useTheme } from "@react-navigation/native";
import { Colors, spacing } from "src/theme";
import ProductListings from "src/components/productListings";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductList: FC<PrimaryScreenProps<"productList">> = () => {
  const selectedCategory = useAppSelector(selectSelectedCategoryName);
  const { colors } = useTheme();
  const styles = makeStyle(colors);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ProductListings showTitle title={selectedCategory} />
      </SafeAreaView>
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
