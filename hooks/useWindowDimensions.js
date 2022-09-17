import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";

const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      const { width, height } = window;
      setDimensions({ width, height });
    });
    return () => subscription?.remove();
  });

  const { width, height } = dimensions;

  return { width, height };
};

export default useWindowDimensions;
