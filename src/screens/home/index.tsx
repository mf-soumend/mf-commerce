import { useNavigation, useTheme } from "@react-navigation/native";
import React, { FC, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { PrimaryScreenProps, TabScreenProps } from "src/navigation";
import { useAppDispatch } from "src/store";
import { fetchCategoriesThunk } from "src/store/slices/categorySlice";
import VerticalCategories from "src/components/verticalCategories";
import ProductListings from "src/components/productListings";
import Input from "src/components/input";
import { verticalScale as vs } from "src/utils";
import { Colors, fontSize, spacing } from "src/theme";
import { SearchNormal1 } from "iconsax-react-native";

const Home: FC<TabScreenProps<"home">> = () => {
  const navigation = useNavigation<PrimaryScreenProps<"shopHome">>();
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
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("search");
          }}
          activeOpacity={1}
        >
          <Input
            placeholder="Search"
            readOnly
            containerStyle={styles.inputContainer}
            style={styles.input}
            leftIcon={() => (
              <SearchNormal1
                size={spacing.md}
                color={colors.tertiary}
                variant="Broken"
              />
            )}
          />
        </TouchableOpacity>
      </View>
      <VerticalCategories />
      <ProductListings />
    </View>
  );
};

export default Home;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    searchWrapper: {
      paddingHorizontal: vs(spacing.lg),
      paddingVertical: vs(spacing.md),
    },
    inputContainer: {
      borderRadius: 100,
      overflow: "hidden",
      height: vs(40),
    },
    input: {
      fontSize: fontSize.h4,
    },
  });
