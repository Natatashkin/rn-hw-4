import React, { useEffect, useState, useMemo, useRef } from "react";
import { TextInput, View, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MAIN_TEXT_FONT, APP_COLORS } from "../constants";

const InputText = ({
  adornment = false,
  variant = "outlined",
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

  const inputVariant = useMemo(
    () => (variant === "outlined" ? styles.outlined : styles.underlined),
    [variant]
  );

  const isInputOnFocus = useMemo(
    () =>
      inputFocus
        ? styles.inputOnFocus
        : variant === "outlined"
        ? styles.inputWhithoutFocus
        : styles.inputWhithoutFocusUnderlined,
    [inputFocus, variant]
  );
  const isMarginBottom = useMemo(
    () => marginBottom && styles.marginInput,
    [marginBottom]
  );

  const isHorizontalPaddings = useMemo(
    () =>
      secureTextEntry
        ? { paddingLeft: 16 }
        : variant === "outlined"
        ? { paddingHorizontal: 16 }
        : adornment
        ? { paddingRight: 8 }
        : null,
    [secureTextEntry, variant, adornment]
  );

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

  return (
    <View
      style={[
        styles.inputContainer,
        inputVariant,
        isInputOnFocus,
        isMarginBottom,
      ]}
    >
      {adornment && (
        <SimpleLineIcons
          name="location-pin"
          size={24}
          color={styles.iconColor.color}
        />
      )}
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
  },
  outlined: {
    borderWidth: 1,
    borderRadius: 10,
  },
  underlined: {
    borderBottomWidth: 1,
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

  inputWhithoutFocusUnderlined: {
    borderColor: grey,
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
