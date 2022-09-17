import { TouchableOpacity, StyleSheet } from "react-native";
import { AppText } from "../AppText";

const Button = ({ title, onPress, margin = false }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.button, margin && styles.buttonMargin]}
      onPress={onPress}
    >
      <AppText textStyle={styles.buttonText}>{title}</AppText>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: "#0e3cd4",
    borderRadius: 100,
    elevation: 3,
  },

  buttonMargin: {
    marginTop: 43,
    marginBottom: 16,
  },

  buttonText: {
    color: "#ffffff",
  },
});
