import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { APP_COLORS } from "../constants";

const { yellow, blue } = APP_COLORS;

const TabBarIconContainer = ({ children, isFocused }) => {
  return (
    <View style={[styles.container, isFocused && styles.containerInFocus]}>
      {children}
    </View>
  );
};

export default TabBarIconContainer;

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: yellow,
  },

  containerInFocus: {
    backgroundColor: blue,
  },
});
