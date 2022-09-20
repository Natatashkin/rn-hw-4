import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import useLoadedFonts from "../../../hooks/useLoadedFonts";
import useAdaptiveHeight from "../../../hooks/useAdaptiveHeight";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import useKeyboardStatus from "../../../hooks/useKeyboardStatus";
import { InputTextField, Button, AppText } from "../../../components";
import {
  REGISTRATION_FORM_DEFAULT_FIELDS,
  FORM_FIELD_NAMES,
} from "../../constants";
import { APP_COLORS } from "../../../components/constants";

const { blue, yellow, transparentBlack, black, white } = APP_COLORS;

async function saveFormData(key, value) {
  await SecureStore.setItemAsync(key, value, {
    keychainService: SecureStore.AFTER_FIRST_UNLOCK,
  });
}

export default function RegistrationScreen({ navigation, onAuth }) {
  const { width, height } = useWindowDimensions();
  const { fontsLoaded, onLayoutRootView } = useLoadedFonts();
  const { keyboardStatus, handleKeyboardHide } = useKeyboardStatus();
  const { adaptiveHeight } = useAdaptiveHeight();
  const [formValues, setFormValues] = useState(
    REGISTRATION_FORM_DEFAULT_FIELDS
  );

  const formPaddings = keyboardStatus
    ? styles.formScrollPaddings
    : styles.formVerticalPaddings;

  const handleInputChange = (value, keyField) => {
    setFormValues((prevData) => {
      return {
        ...prevData,
        [keyField]: value,
      };
    });
  };

  const handleGetFormData = async () => {
    const formData = Object.entries(formValues);
    const newData = formData.reduce(
      (acc, [key, value]) => {
        return { ...acc, [key]: value };
      },
      { token: null }
    );
    await saveFormData("userData", JSON.stringify(newData));
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
        <KeyboardAvoidingView behavior={null} style={styles.container}>
          <View
            style={{
              height: adaptiveHeight,
            }}
          >
            <View style={styles.formAvatar}>
              <Feather
                name="user"
                size={90}
                color={blue}
                style={styles.defaultAvatarImage}
              />
              <AntDesign
                name="pluscircleo"
                size={25}
                color={blue}
                style={styles.iconPlus}
              />
            </View>
            <View
              style={[
                styles.form,
                formPaddings,
                keyboardStatus && styles.scrollFormView,
              ]}
            >
              <ScrollView>
                <Text style={styles.pageTitle}>Реєстрація</Text>
                <InputTextField
                  variant="outlined"
                  placeholder="Логін"
                  marginBottom
                  value={formValues.login}
                  onChangeText={(text) =>
                    handleInputChange(text, FORM_FIELD_NAMES.login)
                  }
                />
                <InputTextField
                  variant="outlined"
                  placeholder="Адреса електронної пошти"
                  marginBottom
                  value={formValues.email}
                  onChangeText={(text) =>
                    handleInputChange(text, FORM_FIELD_NAMES.email)
                  }
                />
                <InputTextField
                  variant="outlined"
                  placeholder="Пароль"
                  secureTextEntry
                  value={formValues.password}
                  onChangeText={(text) =>
                    handleInputChange(text, FORM_FIELD_NAMES.password)
                  }
                />
                <Button
                  title="Зареєструватися"
                  onPress={handleGetFormData}
                  margin
                />

                <AppText textStyle={styles.noAccacuntText}>
                  Вже є аккаунт?{" "}
                  <AppText
                    onPress={() => navigation.navigate("SignIn")}
                    textStyle={styles.noAccacuntLink}
                  >
                    Увійти
                  </AppText>
                </AppText>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },

  form: {
    height: "100%",
    paddingHorizontal: 16,
    marginTop: 60,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: white,
  },
  scrollFormView: {
    height: 300,
  },
  formVerticalPaddings: {
    paddingTop: 92,
    paddingBottom: 32,
  },

  formScrollPaddings: {
    paddingTop: 76,
    paddingBottom: 16,
  },

  formAvatar: {
    position: "absolute",
    top: 0,
    alignSelf: "center",
    backgroundColor: yellow,
    borderRadius: 16,
    width: 120,
    height: 120,
    justifyContent: "center",
    elevation: 4,
    zIndex: 1,
  },
  defaultAvatarImage: {
    alignSelf: "center",
  },
  iconPlus: {
    position: "absolute",
    right: -13,
    bottom: 14,
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
