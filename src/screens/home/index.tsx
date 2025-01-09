import { useTheme } from "@react-navigation/native";
import React, { FC, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { TabScreenProps } from "src/navigation";
import { useAppDispatch } from "src/store";
import { fetchCategoriesThunk } from "src/store/slices/categorySlice";
import VerticalCategories from "src/components/verticalCategories";
import ProductListings from "src/components/productListings";

const Home: FC<TabScreenProps<"home">> = () => {
  const dispatch = useAppDispatch();
  const styles = makeStyle();
  const fetchCategoryList = () => {
    dispatch(fetchCategoriesThunk());
  };
  useEffect(() => {
    fetchCategoryList();
  }, []);
  return (
    <View style={styles.container}>
      <VerticalCategories />
      <ProductListings />
    </View>
  );
};

export default Home;

const makeStyle = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });
