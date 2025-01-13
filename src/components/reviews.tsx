import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { Colors, fontSize, spacing, typography } from "src/theme";
import { getDateTime, verticalScale as vs } from "src/utils";
import StarRating from "./starRating";
import Image from "./image";

const Reviews = ({ reviewList }: { reviewList: [] }) => {
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  return (
    <View style={styles.container}>
      {reviewList.map((review: any, id) => {
        return (
          <View key={review.date + id}>
            <View style={styles.reviewerDetails}>
              <View style={styles.profilePic}>
                <Image
                  source={require("assets/user.png")}
                  style={styles.userPic}
                />
              </View>
              <Text
                style={[
                  styles.name,
                  {
                    flex: 1,
                  },
                ]}
              >
                {review.reviewerName}
              </Text>
              <StarRating count={review.rating} total={5} />
            </View>
            <Text style={[styles.paragraph, { marginTop: vs(spacing.xxs) }]}>
              {review.comment}
            </Text>
            <Text
              style={[
                styles.name,
                {
                  fontFamily: typography.medium,
                },
              ]}
            >
              {getDateTime(review.date)}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default Reviews;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      marginTop: vs(spacing.xs),
      gap: vs(spacing.md),
    },
    profilePic: {
      height: vs(40),
      width: vs(40),
      backgroundColor: colors.backgroundSecondary,
      borderRadius: "100%",
      overflow: "hidden",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    userPic: {
      height: vs(40),
      width: vs(40),
    },
    name: {
      color: colors.text,
      fontFamily: typography.bold,
      fontSize: fontSize.h4,
      includeFontPadding: false,
    },
    reviewerDetails: {
      flexDirection: "row",
      gap: vs(spacing.xs),
      justifyContent: "space-between",
      alignItems: "center",
    },
    paragraph: {
      color: colors.paragraph,
      fontSize: fontSize.h4,
      fontFamily: typography.regular,
    },
  });
