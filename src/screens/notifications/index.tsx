import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { verticalScale as vs } from "src/utils";
import { useTheme } from "@react-navigation/native";
import { Colors, fontSize, spacing, typography } from "src/theme";
import ResultNotFound from "src/components/resultNotFound";

const Notifications = () => {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyle(colors), []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      <ResultNotFound
        title="No Notification yet."
        source={require("assets/notification.png")}
      />
    </View>
  );
};

export default Notifications;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      height: vs(100),
      justifyContent: "flex-end",
    },
    headerTitle: {
      fontSize: fontSize.h3,
      fontFamily: typography.bold,
      color: colors.text,
      textAlign: "center",
      marginBottom: vs(spacing.sm),
    },
  });
