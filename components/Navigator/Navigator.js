import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useUser } from "../../hooks/context";
import { LoginScreen, RegistrationScreen } from "../../screens/auth";
import { HomeTabs } from "../../screens/main";

const Stack = createStackNavigator();

export default function Navigator() {
  // const { isLoggedIn } = useUser();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{
            headerShown: false,
          }}
        />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
