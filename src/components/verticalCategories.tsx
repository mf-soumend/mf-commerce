import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppSelector } from "src/store";
import {
  selectCategoryError,
  selectCategoryLoading,
} from "src/store/slices/categorySlice";
import { useTheme } from "@react-navigation/native";
import { Colors, spacing } from "src/theme";
import { verticalScale as vs } from "src/utils";
import Skeleton from "./skeleton";

const VerticalCategories = () => {
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  const loading = useAppSelector(selectCategoryLoading);
  const hasError = useAppSelector(selectCategoryError);
  if (loading || hasError) {
    return (
      <View>
        <FlatList
          data={Array.from({ length: 8 }, (_, i) => i)}
          renderItem={({ item }) => {
            return (
              <Skeleton
                background={colors.backgroundSecondary}
                highlight={colors.white}
                borderRadius={"100%"}
              >
                <View style={styles.loader} />
              </Skeleton>
            );
          }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewStyle}
          keyExtractor={(item) => item + "-category"}
          horizontal
        />
      </View>
    );
  }
  return (
    <View>
      <Text>VerticalCategories</Text>
    </View>
  );
};

export default VerticalCategories;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollViewStyle: {
      paddingHorizontal: vs(spacing.lg),
      gap: vs(spacing.md),
    },
    loader: {
      height: vs(56),
      width: vs(56),
      backgroundColor: colors.transparent,
    },
  });
