import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Pressable, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { IconButton, TabBarIconContainer } from "./components";
import { LoginScreen, RegistrationScreen } from "./screens/auth";
import { PostsScreen, ProfileScreen, CreatePostsScreen } from "./screens/main";
import { APP_COLORS } from "./components/constants";

const MainStack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeStack = createBottomTabNavigator();
const { blue, transparentBlack, yellow, darkGrey } = APP_COLORS;

const HEADER_OPTIONS = {
  headerStyle: {
    elevation: 5,
    shadowOpacity: 0.3,
    borderBottomWidth: 1,
  },
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
  },
  headerShadowVisible: true,
};

function HomeTabs({ onAuth }) {
  return (
    <HomeStack.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: blue,
        tabBarInactiveTintColor: transparentBlack,
        ...HEADER_OPTIONS,
      }}
    >
      <HomeStack.Screen
        options={{
          title: "Профіль",
          tabBarAccessibilityLabel: "Профіль",
          tabBarIcon: (props) => (
            <Feather name="user" size={24} color={props.color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
      <HomeStack.Screen
        options={({ navigation }) => ({
          title: "Створити пост",
          headerBackVisible: true,
          tabBarAccessibilityLabel: "Створити пост",
          headerLeft: () => (
            <IconButton
              name="arrow-back"
              icon={Ionicons}
              color={blue}
              onPress={() => navigation.goBack()}
            />
          ),
          headerLeftContainerStyle: {
            marginLeft: 15,
          },
          tabBarIcon: ({ focused }) => {
            return (
              <TabBarIconContainer isFocused={focused}>
                <Feather
                  name="plus"
                  size={24}
                  color={focused ? yellow : blue}
                />
              </TabBarIconContainer>
            );
          },
        })}
        name="Create post"
        component={CreatePostsScreen}
      />

      <HomeStack.Screen
        options={{
          title: "Публікації",
          tabBarAccessibilityLabel: "Публікації",
          tabBarIcon: (props) => (
            <AntDesign name="appstore-o" size={24} color={props.color} />
          ),
          headerRight: () => (
            <IconButton
              icon={MaterialIcons}
              name="logout"
              color={darkGrey}
              onPress={() => onAuth(false)}
            />
          ),
          headerRightContainerStyle: {
            marginRight: 15,
          },
        }}
        name="Posts"
        component={PostsScreen}
      />
    </HomeStack.Navigator>
  );
}

function Authentication({}) {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen
        name="SignUp"
        children={(props) => <RegistrationScreen {...props} />}
      />
      <AuthStack.Screen
        name="SignIn"
        children={(props) => <LoginScreen {...props} />}
      />
    </AuthStack.Navigator>
  );
}

export const useRoute = (isAuth, authHandler) => {
  return (
    <MainStack.Navigator>
      {isAuth ? (
        <MainStack.Screen
          name="Home"
          children={(props) => <HomeTabs {...props} onAuth={authHandler} />}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Auth"
          children={(props) => (
            <Authentication {...props} onAuth={authHandler} />
          )}
        />
      )}
    </MainStack.Navigator>
  );
};
