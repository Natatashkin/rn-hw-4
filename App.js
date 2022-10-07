import "react-native-gesture-handler";
import React, { useState, useEffect, useContext } from "react";
// import * as SplashScreen from "expo-splash-screen";
import useLoadedFonts from "./hooks/useLoadedFonts";

import UserProvider from "./hooks/context";
import Navigator from "./components/Navigator/Navigator";

export default function App() {
  const { fontsLoaded } = useLoadedFonts();

  if (!fontsLoaded) {
    return null;
  }
  return (
    <UserProvider>
      <Navigator />
    </UserProvider>
  );
}
