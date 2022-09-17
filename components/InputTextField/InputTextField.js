import React, { useEffect, useState, useMemo, useRef } from "react";
import { TextInput, View, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MAIN_TEXT_FONT, APP_COLORS } from "../constants";

const InputText = ({
  setKeyboardStatus,
  placeholder,
  marginBottom,
  secureTextEntry = false,
  onChangeText,
  value,
}) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [activeIcon, setActiveIcon] = useState(false);
  const currentInput = useRef(null);

  const toggleIconPress = () => {
    setActiveIcon(!activeIcon);
  };

  const handleIconPress = () => {
    toggleIconPress();
  };
  const handleInputBlur = (e) => {
    if (activeIcon) {
      setActiveIcon(false);
    }
    setInputFocus(false);
  };
  const isInputOnFocus = useMemo(
    () => (inputFocus ? styles.inputOnFocus : styles.inputWhithoutFocus),
    [inputFocus]
  );
  const isMarginBottom = useMemo(
    () => marginBottom && styles.marginInput,
    [marginBottom]
  );

  const isHorizontalPaddings = secureTextEntry
    ? { paddingLeft: 16 }
    : { paddingHorizontal: 16 };

  return (
    <View style={[styles.inputContainer, isInputOnFocus, isMarginBottom]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        ref={currentInput}
        secureTextEntry={!activeIcon && secureTextEntry}
        placeholder={placeholder}
        style={[styles.input, isHorizontalPaddings]}
        onFocus={(e) => setInputFocus(true)}
        onBlur={handleInputBlur}
      />
      {secureTextEntry && (
        <Pressable style={styles.icon} onPress={handleIconPress}>
          {activeIcon ? (
            <Ionicons
              name="eye-off-outline"
              size={24}
              color={styles.iconActiveColor.color}
            />
          ) : (
            <Ionicons
              name="eye-outline"
              size={24}
              color={styles.iconColor.color}
            />
          )}
        </Pressable>
      )}
    </View>
  );
};

export default InputText;
const { blue, white, grey, lightGrey, darkGrey, black, transparentBlack } =
  APP_COLORS;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    ...MAIN_TEXT_FONT,
  },
  inputOnFocus: {
    borderColor: blue,
    backgroundColor: white,
    color: black,
  },
  inputWhithoutFocus: {
    borderColor: grey,
    backgroundColor: lightGrey,
    color: darkGrey,
  },

  marginInput: {
    marginBottom: 16,
  },

  icon: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  iconColor: {
    color: darkGrey,
  },
  iconActiveColor: {
    color: blue,
  },
});
