import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";

const OverlayActivityIndicator = ({ loading }: { loading: boolean }) => {
  return (
    loading && (
      <BlurView intensity={20} style={styles.container}>
        <ActivityIndicator size={"large"} />
      </BlurView>
    )
  );
};

export default OverlayActivityIndicator;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 99,
  },
});
