import { useTheme } from "@react-navigation/native";
import React, { FC, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabScreenProps } from "src/navigation";
import { useAppDispatch } from "src/store";
import { fetchCategoriesThunk } from "src/store/slices/categorySlice";
import { Colors } from "src/theme";
import VerticalCategories from "src/components/verticalCategories";
import ProductListings from "src/components/productListings";

const Home: FC<TabScreenProps<"home">> = () => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const styles = makeStyle(colors);
  const fetchCategoryList = () => {
    dispatch(fetchCategoriesThunk());
  };
  useEffect(() => {
    fetchCategoryList();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <VerticalCategories />
      <ProductListings />
    </SafeAreaView>
  );
};

export default Home;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });
