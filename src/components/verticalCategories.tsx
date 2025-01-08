import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "src/store";
import {
  Category,
  selectCategories,
  selectCategoryError,
  selectCategoryLoading,
  selectSelectedCategory,
  setSelectedCategory,
} from "slices/categorySlice";
import { useTheme } from "@react-navigation/native";
import { Colors, fontSize, spacing, typography } from "src/theme";
import { verticalScale as vs } from "src/utils";
import Skeleton from "./skeleton";

const VerticalCategories = () => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  const loading = useAppSelector(selectCategoryLoading);
  const hasError = useAppSelector(selectCategoryError);
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const categories = useAppSelector<Category[]>(selectCategories);
  const selectCategory = (category: string) => {
    dispatch(setSelectedCategory(category));
  };
  const CategoryLoader = () => {
    return (
      <View>
        <FlatList
          data={Array.from({ length: 8 }, (_, i) => i)}
          renderItem={({ item }) => {
            return (
              <Skeleton
                background={colors.backgroundSecondary}
                highlight={colors.background}
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
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categories</Text>
      {loading || hasError ? (
        <CategoryLoader />
      ) : (
        <View>
          <FlatList
            data={categories}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    selectCategory(item.slug);
                  }}
                >
                  <View style={styles.category}>
                    <View
                      style={[
                        styles.categoryImageWrapper,
                        selectedCategory === item.slug
                          ? styles.categorySelected
                          : {},
                      ]}
                    >
                      <Image
                        source={require("assets/categorytemp.png")}
                        style={styles.categoryImage}
                      />
                    </View>
                    <Text numberOfLines={1} style={styles.categoryTitle}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewStyle}
            keyExtractor={(item) => item.slug + "-category"}
            horizontal
          />
        </View>
      )}
    </View>
  );
};

export default VerticalCategories;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      paddingLeft: vs(spacing.lg),
    },
    header: {
      fontFamily: typography.semiBold,
      fontSize: fontSize.h3,
      color: colors.text,
    },
    scrollViewStyle: {
      marginTop: vs(spacing.md),
      gap: vs(spacing.md),
    },
    loader: {
      height: vs(56),
      width: vs(56),
      backgroundColor: colors.transparent,
    },
    category: {
      gap: vs(spacing.md),
      alignItems: "center",
    },
    categoryImageWrapper: {
      overflow: "hidden",
      height: vs(56),
      width: vs(56),
      borderRadius: "100%",
    },
    categoryImage: {
      height: vs(56),
      width: vs(56),
      backgroundColor: colors.backgroundSecondary,
    },
    categoryTitle: {
      maxWidth: vs(56),
      fontFamily: typography.regular,
      fontSize: fontSize.body2,
      color: colors.textSecondary,
    },
    categorySelected: {
      borderWidth: vs(2),
      borderColor: colors.primary,
    },
  });
