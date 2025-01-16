import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import {
  logoutUser,
  selectUser,
  useAppDispatch,
  useAppSelector,
} from "src/store";
import Button from "src/components/button";
import { useTheme } from "@react-navigation/native";
import { Colors, fontSize, spacing, typography } from "src/theme";
import Image from "src/components/image";
import { verticalScale as vs } from "src/utils";

const Profile = () => {
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyle(colors), []);
  const fullAddress = useMemo(() => {
    const { address, city, state, stateCode, postalCode } = user?.address;
    return `${address}, ${city}, ${state} (${stateCode}) ${postalCode}`;
  }, [user]);
  const logout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", onPress: () => dispatch(logoutUser()) },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileImageCard}>
        <View style={styles.profileImageWrapper}>
          <Image
            source={require("assets/user.png")}
            style={styles.profilePicture}
          />
        </View>
      </View>
      <View style={styles.cardsWrapper}>
        <View style={styles.card}>
          <Text style={styles.title}>{`${user?.firstName ?? ""} ${
            user?.lastName ?? ""
          }`}</Text>
          {user?.email && <Text style={styles.description}>{user?.email}</Text>}
          {user?.phone && <Text style={styles.description}>{user?.phone}</Text>}
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Address</Text>
          <Text style={styles.description}>{fullAddress}</Text>
        </View>
      </View>
      <View style={styles.buttonCard}>
        <Button
          title="Sign Out"
          onPress={logout}
          style={styles.buttonStyle}
          titleStyle={styles.btnText}
        />
      </View>
    </View>
  );
};

export default Profile;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: vs(spacing.lg),
    },
    profileImageCard: {
      justifyContent: "flex-end",
      alignItems: "center",
      paddingBottom: vs(spacing.xl),
      paddingTop: vs(130),
    },
    profileImageWrapper: {
      overflow: "hidden",
      height: vs(80),
      width: vs(80),
      borderRadius: "100%",
    },
    profilePicture: {
      height: vs(80),
      width: vs(80),
      objectFit: "contain",
    },
    cardsWrapper: {
      gap: vs(spacing.xs),
    },
    card: {
      padding: vs(spacing.md),
      borderRadius: vs(spacing.xs),
      backgroundColor: colors.backgroundSecondary,
    },
    title: {
      fontSize: fontSize.h3,
      fontFamily: typography.bold,
      color: colors.text,
    },
    description: {
      fontSize: fontSize.h3,
      fontFamily: typography.regular,
      color: colors.paragraph,
    },
    buttonCard: {
      flexGrow: 1,
      paddingTop: vs(spacing.lg),
      justifyContent: "flex-end",
      alignItems: "center",
    },
    buttonStyle: {
      backgroundColor: colors.background,
      paddingVertical: 0,
    },
    btnText: {
      color: colors.danger,
    },
  });
