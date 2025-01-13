import { useNavigation, useTheme } from "@react-navigation/native";
import React, { FC, useEffect } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
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
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, vs(100));
  const translateY = diffClamp.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
  });
  useEffect(() => {
    fetchCategoryList();
  }, []);
  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ translateY: translateY }],
          position: "absolute",
          zIndex: 1,
          backgroundColor: colors.background,
        }}
      >
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
      </Animated.View>
      <ProductListings
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
        clamped={vs(220)}
      />
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
