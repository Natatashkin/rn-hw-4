import { Text } from "react-native";
import { MAIN_TEXT_FONT } from "../constants";

const AppText = ({ children, textStyle, onPress }) => {
  return (
    <Text onPress={onPress} style={[MAIN_TEXT_FONT, textStyle]}>
      {children}
    </Text>
  );
};

export default AppText;
