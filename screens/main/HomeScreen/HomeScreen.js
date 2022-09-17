import React from "react";
import { View, StyleSheet } from "react-native";
import { AppText } from "../../../components";

const HomeScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <AppText>HomeScreen</AppText>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});
