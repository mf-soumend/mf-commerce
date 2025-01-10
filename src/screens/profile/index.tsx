import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { logoutUser, useAppDispatch } from "src/store";
import Button from "src/components/button";

const Profile = () => {
  const dispatch = useAppDispatch();
  return (
    <View>
      <Text>Profile</Text>
      <Button
        title="Logout"
        onPress={() => {
          dispatch(logoutUser());
        }}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
