import React from "react";
import { Pressable } from "react-native";

const IconButton = ({ icon, name, color, onPress }) => {
  const Icon = icon;

  return (
    <Pressable onPress={onPress}>
      <Icon name={name} size={24} color={color} />
    </Pressable>
  );
};

export default IconButton;
