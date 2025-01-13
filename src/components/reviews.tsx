import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { Colors, fontSize, spacing, typography } from "src/theme";
import { getDateTime, verticalScale as vs } from "src/utils";
import { ProfileCircle } from "iconsax-react-native";

const Reviews = ({ reviewList }: { reviewList: [] }) => {
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  return (
    <View style={styles.container}>
      {reviewList.map((review: any, id) => {
        return (
          <View key={review.date + id}>
            <View style={styles.reviewerDetails}>
              <ProfileCircle
                size={vs(spacing.xl)}
                color={colors.textSecondary}
                variant="Bold"
              />
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
              <Text
                style={[styles.name, { color: colors.primary }]}
              >{`${review.rating}/5`}</Text>
            </View>
            <Text
              style={[
                styles.paragraph,
                { marginLeft: vs(spacing.xl + spacing.xs) },
              ]}
            >
              {review.comment}
            </Text>
            <Text
              style={[
                styles.name,
                {
                  marginLeft: vs(spacing.xl + spacing.xs),
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
    name: {
      color: colors.text,
      fontFamily: typography.bold,
      fontSize: fontSize.h4,
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
