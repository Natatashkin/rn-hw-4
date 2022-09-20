import React from "react";
import { Camera, WhiteBalance } from "expo-camera";
import { View, ScrollView, StyleSheet } from "react-native";
import { AppText, InputTextField } from "../../../components";
import { APP_COLORS } from "../../../components/constants";

const { white, darkGrey } = APP_COLORS;
const CreatePostsScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Camera style={styles.camera}></Camera>
      <AppText>Завантажте фото</AppText>
      <InputTextField variant="underlined" placeholder="Назва фото" />
      <InputTextField
        variant="underlined"
        placeholder="Де зроблене фото?"
        adornment={true}
      />
    </View>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: white,
    paddingHorizontal: 16,
    color: darkGrey,
  },
  camera: {
    height: 300,
    marginTop: 32,
    marginBottom: 8,
  },
});
