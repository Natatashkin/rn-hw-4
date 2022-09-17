import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { AppText } from "../../../components";

const MapScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <ScrollView>
        <AppText>MapScreen</AppText>
      </ScrollView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});
