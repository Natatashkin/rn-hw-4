import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserProvider, { useUser } from "./hooks/context";
import useLoadedFonts from "./hooks/useLoadedFonts";
import { LoginScreen, RegistrationScreen } from "./screens/auth";
import { HomeTabs } from "./screens/main";

SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

export default function App() {
  const { fontsLoaded } = useLoadedFonts();
  const { isLoggedIn } = useUser();

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  console.log(isLoggedIn);
  // console.log(userData);

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Screen
              name="Home"
              component={HomeTabs}
              options={{
                headerShown: false,
              }}
            />
          ) : (
            <>
              <Stack.Screen
                options={{ headerShown: false }}
                name="SignUp"
                component={RegistrationScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="SignIn"
                component={LoginScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
