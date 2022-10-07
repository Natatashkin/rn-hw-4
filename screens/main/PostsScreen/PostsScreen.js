import "react-native-gesture-handler";
import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { AppText } from "../../../components";

export default function PostsScreen() {
  return (
    <View style={styles.screenContainer}>
      <AppText>Ви ще не додавали публікації</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
  },
});
