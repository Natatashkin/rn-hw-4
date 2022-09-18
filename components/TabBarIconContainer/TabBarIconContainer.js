import React from "react";
import { View, StyleSheet } from "react-native";
import { APP_COLORS } from "../constants";

const TabBarIconContainer = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default TabBarIconContainer;

const { yellow } = APP_COLORS;
const styles = StyleSheet.create({
  container: {
    backgroundColor: yellow,
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
