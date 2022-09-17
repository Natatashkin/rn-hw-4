import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { AppText } from "../../../components";

const CreatePostsScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <AppText>Створити пост</AppText>
    </View>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});
