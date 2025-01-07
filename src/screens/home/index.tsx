import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { logoutUser, useAppDispatch } from "src/store";

const Home = () => {
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          dispatch(logoutUser());
        }}
      >
        <Text
          style={{
            color: "#000",
            borderColor: "#000",
            padding: 10,
            backgroundColor: "#fff",
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
