import React, { useState, useEffect } from "react";
import { NativeModules } from "react-native";
import useWindowDimensions from "./useWindowDimensions";

const useAdaptiveHeight = () => {
  const { StatusBarManager } = NativeModules;
  const statusBarHeight = StatusBarManager.HEIGHT;
  const { width, height } = useWindowDimensions();
  const [adaptiveHeight, setAdaptiveHeight] = useState(height);

  useEffect(() => {
    if (height < width) {
      setAdaptiveHeight(height - statusBarHeight);
      return;
    }
    if (height > 750) {
      setAdaptiveHeight(height * 0.8);
      return;
    }

    setAdaptiveHeight(height * 0.9);
  }, [height, width]);

  return { adaptiveHeight };
};

export default useAdaptiveHeight;
