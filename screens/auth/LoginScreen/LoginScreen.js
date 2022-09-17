import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  ImageBackground,
} from "react-native";
import { AppText, InputTextField, Button } from "../../../components";
import { LOGIN_FORM_DEFAULT_FIELDS, FORM_FIELD_NAMES } from "../../constants";
import useLoadedFonts from "../../../hooks/useLoadedFonts";
import useKeyboardStatus from "../../../hooks/useKeyboardStatus";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { APP_COLORS } from "../../../components/constants";

const { blue, black, white, transparentBlack } = APP_COLORS;

export default function LoginScreen({ navigation, onAuth }) {
  console.log(navigation);
  const { width, height } = useWindowDimensions();
  const { keyboardStatus, setKeyboardStatus, handleKeyboardHide } =
    useKeyboardStatus();
  const [formValues, setFormValues] = useState(LOGIN_FORM_DEFAULT_FIELDS);
  const { onLayoutRootView } = useLoadedFonts();

  const handleInputChange = (value, keyField) => {
    setFormValues((prevData) => {
      return {
        ...prevData,
        [keyField]: value,
      };
    });
  };

  const handleGetFormData = () => {
    console.log(formValues);
    setFormValues(LOGIN_FORM_DEFAULT_FIELDS);
    onAuth(true);
  };

  return (
    <ImageBackground
      onLayout={onLayoutRootView}
      style={[styles.image, styles.fixed, { width, height }]}
      resizeMode="cover"
      resizeMethod="resize"
      source={require("../../../assets/images/podsolnuhi-rasteniya-16317.jpeg")}
    >
      <TouchableWithoutFeedback onPress={handleKeyboardHide}>
        <KeyboardAvoidingView behavior="height" style={styles.container}>
          <View
            style={[
              styles.form,
              keyboardStatus
                ? styles.formScrollPaddings
                : styles.formVerticalPaddings,
            ]}
          >
            <ScrollView style={keyboardStatus && styles.formScrollContainer}>
              <Text style={[styles.pageTitle]}>Увійти</Text>
              <InputTextField
                placeholder="Адреса електронної пошти"
                marginBottom
                value={formValues.email}
                onChangeText={(text) =>
                  handleInputChange(text, FORM_FIELD_NAMES.email)
                }
              />
              <InputTextField
                setKeyboardStatus={setKeyboardStatus}
                placeholder="Пароль"
                secureTextEntry
                value={formValues.password}
                onChangeText={(text) =>
                  handleInputChange(text, FORM_FIELD_NAMES.password)
                }
              />
              <Button title="Увійти" onPress={handleGetFormData} margin />
              <AppText textStyle={styles.noAccacuntText}>
                Немає аккаунта?{" "}
                <AppText
                  onPress={() => navigation.navigate("SignUp")}
                  textStyle={styles.noAccacuntLink}
                >
                  Зареєструватися
                </AppText>
              </AppText>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    zIndex: -1,
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  container: {
    flex: 1,
    justifyContent: "flex-end",
  },

  form: {
    height: "70%",
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: white,
  },

  formVerticalPaddings: {
    paddingVertical: 32,
  },

  formScrollPaddings: {
    paddingTop: 32,
    paddingBottom: 0,
  },

  formScrollContainer: {
    maxHeight: 230,
  },

  pageTitle: {
    marginBottom: 32,
    fontSize: 20,
    color: black,
    alignSelf: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
  },

  noAccacuntText: {
    alignSelf: "center",
    color: transparentBlack,
  },
  noAccacuntLink: {
    color: blue,
  },
});
