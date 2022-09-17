import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { AppText } from "../../../components";

const ProfileScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <AppText>Профіль</AppText>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});
