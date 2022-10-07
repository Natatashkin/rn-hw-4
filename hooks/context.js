import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import * as SequreStore from "expo-secure-store";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const saveUserData = async (key, data) => {
    try {
      await SequreStore.setItemAsync(key, JSON.stringify(data));
      setIsLoggedIn(true);
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = useCallback(async (key) => {
    try {
      const data = await SequreStore.getItemAsync(key);
      // console.log(data);
      if (data) {
        console.log("is data");
        setUserData(JSON.parse(data));
        setIsLoggedIn(true);
        return;
      }
      throw new Error("data is null");
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteUserData = async (key) => {
    try {
      await SequreStore.deleteItemAsync(key);
      setUserData(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      getUserData("userData");
    }
  }, [isLoggedIn]);
  console.log(isLoggedIn, "context");
  console.log(userData, "userData context");
  return (
    <UserContext.Provider
      value={{
        userData,
        isLoggedIn,
        deleteUserData,
        saveUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

// const [loading, setIsLoading] = useState(false);

// const getUserData = async (key) => {
//   setIsLoading(true);
//   const data = await SequreStore.getItemAsync(key);
//   setIsLoading(false);
//   return data;
// };

// const saveUserData = async (key, data) => {
//   try {
//     await SequreStore.setItemAsync(key, JSON.stringify(data));
//     setIsLoggedIn(true);
//     setUserData(data);
//   } catch (error) {
//     console.log(error);
//     setIsLoggedIn(false);
//   }
// };

const deleteUserData = async (key) => {
  try {
    await SequreStore.deleteItemAsync(key);
    setIsLoggedIn(false);
    setUserData(null);
  } catch (error) {
    console.log(error);
  }
};
