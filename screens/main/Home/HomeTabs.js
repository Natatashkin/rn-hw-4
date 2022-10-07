import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  Feather,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import Feather from "@expo/vector-icons/Feather";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import AntDesign from "@expo/vector-icons/AntDesign";
// import { PostsScreen, ProfileScreen, CreatePostsScreen } from "../";
import { useUser } from "../../../hooks/context";
import PostsScreen from "../PostsScreen/PostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import { IconButton, TabBarIconContainer } from "../../../components";
import { APP_COLORS } from "../../../components/constants";

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

const HomeStack = createBottomTabNavigator();
const { blue, transparentBlack, yellow, darkGrey } = APP_COLORS;

const HomeTabs = () => {
  const { deleteUserData } = useUser();
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
              onPress={async () => await deleteUserData("userData")}
            />
          ),
          headerRightContainerStyle: {
            marginRight: 15,
          },
        }}
        name="Posts"
        component={PostsScreen}
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
          title: "Профіль",
          tabBarAccessibilityLabel: "Профіль",
          tabBarIcon: (props) => (
            <Feather name="user" size={24} color={props.color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </HomeStack.Navigator>
  );
};

export default HomeTabs;
