import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Pressable, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { IconButton } from "./components";
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
      screenOptions={{
        tabBarShowLabel: false,
        ...HEADER_OPTIONS,
      }}
    >
      <HomeStack.Screen
        options={{
          title: "Публікації",
          tabBarIcon: () => (
            <AntDesign name="appstore-o" size={24} color={transparentBlack} />
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
            marginRight: 10,
          },
        }}
        name="Posts"
        component={PostsScreen}
      />
      <HomeStack.Screen
        options={({ navigation }) => ({
          title: "Створити пост",
          headerBackVisible: true,
          headerLeft: () => (
            <IconButton
              name="arrow-back"
              icon={Ionicons}
              color={blue}
              onPress={() => navigation.goBack()}
            />
          ),
          headerLeftContainerStyle: {
            marginLeft: 10,
          },
          tabBarIcon: () => (
            <View
              style={{
                backgroundColor: yellow,
                width: 70,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <Feather name="plus" size={24} color={blue} />
            </View>
          ),
        })}
        name="Create post"
        component={CreatePostsScreen}
      />
      <HomeStack.Screen
        options={{
          title: "Профіль",
          tabBarIcon: () => (
            <Feather name="user" size={24} color={transparentBlack} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </HomeStack.Navigator>
  );
}

function Authentication({ onAuth }) {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen
        name="SignIn"
        children={(props) => <LoginScreen {...props} onAuth={onAuth} />}
      />
      <AuthStack.Screen
        name="SignUp"
        children={(props) => <RegistrationScreen {...props} onAuth={onAuth} />}
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
