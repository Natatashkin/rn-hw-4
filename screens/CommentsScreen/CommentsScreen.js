import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { AppText } from "../../../components";

const CommentsScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <ScrollView>
        <AppText>Коментарі</AppText>
      </ScrollView>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});
