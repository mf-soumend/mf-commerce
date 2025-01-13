import { StyleSheet, View } from "react-native";
import React from "react";
import { Colors, fontSize, spacing } from "src/theme";
import { verticalScale as vs } from "src/utils";
import { useTheme } from "@react-navigation/native";
import Skeleton from "./skeleton";

const ProductDetailsPageLoader = () => {
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  return (
    <View style={styles.containerLoader}>
      <Skeleton background={colors.card} highlight={colors.background}>
        <View style={{ height: vs(248) }} />
      </Skeleton>
      <View style={{ marginTop: vs(spacing.sm) }}>
        <Skeleton background={colors.card} highlight={colors.background}>
          <View style={{ height: fontSize.h3 }} />
        </Skeleton>
      </View>
      <Skeleton
        width={vs(50)}
        background={colors.card}
        highlight={colors.background}
      >
        <View style={{ height: fontSize.h3 }} />
      </Skeleton>
      <View style={{ marginTop: vs(spacing.md), gap: vs(spacing.xs) }}>
        <Skeleton background={colors.card} highlight={colors.background}>
          <View style={{ height: fontSize.h4 }} />
        </Skeleton>
        <Skeleton background={colors.card} highlight={colors.background}>
          <View style={{ height: fontSize.h4 }} />
        </Skeleton>
        <Skeleton background={colors.card} highlight={colors.background}>
          <View style={{ height: fontSize.h4 }} />
        </Skeleton>
        <Skeleton
          width={vs(100)}
          background={colors.card}
          highlight={colors.background}
        >
          <View style={{ height: fontSize.h4 }} />
        </Skeleton>
      </View>
    </View>
  );
};

export default ProductDetailsPageLoader;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    containerLoader: {
      flex: 1,
      paddingTop: vs(spacing.md),
      paddingHorizontal: vs(spacing.lg),
      gap: vs(spacing.md),
    },
  });
