import "react-native-gesture-handler";
import React, { useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import useLoadedFonts from "./hooks/useLoadedFonts";
import { useRoute } from "./routing";
import { useEffect, useMemo } from "react/cjs/react.development";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { fontsLoaded } = useLoadedFonts();
  const [isAuth, setIsAuth] = useState(false);

  const currentRote = useMemo(() => useRoute(isAuth, setIsAuth), [isAuth]);

  if (!fontsLoaded) {
    return null;
  }

  return <NavigationContainer>{currentRote}</NavigationContainer>;
}
