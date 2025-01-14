import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { verticalScale as vs } from "src/utils";
import { spacing } from "src/theme";

const StarRating = ({
  total,
  count,
  size = vs(spacing.md),
}: {
  total: number;
  count: number;
  size?: number;
}) => {
  const normal = Math.floor(total - count);
  const filled = Math.floor(count);
  const styles = makeStyle(size);
  return (
    <View style={styles.container}>
      {Array.from({ length: filled }).map((_, index) => (
        <Image
          key={`filled-${index}`}
          source={require("assets/starFill.png")}
          style={styles.star}
        />
      ))}
      {Array.from({ length: normal }).map((_, index) => (
        <Image
          key={`empty-${index}`}
          source={require("assets/star.png")}
          style={styles.star}
        />
      ))}
    </View>
  );
};

export default StarRating;

const makeStyle = (size: number) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: vs(spacing.xxs),
    },
    star: {
      width: size,
      height: size,
    },
  });
