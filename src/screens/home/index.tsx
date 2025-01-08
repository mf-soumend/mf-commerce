import { useTheme } from "@react-navigation/native";
import React, { FC, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabScreenProps } from "src/navigation";
import { useAppDispatch } from "src/store";
import { fetchCategoriesThunk } from "src/store/slices/categorySlice";
import { Colors, spacing } from "src/theme";
import { verticalScale as vs } from "src/utils";
import VerticalCategories from "src/components/verticalCategories";

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
    </SafeAreaView>
  );
};

export default Home;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollViewStyle: {
      paddingHorizontal: vs(spacing.lg),
    },
  });
