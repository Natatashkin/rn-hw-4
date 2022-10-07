import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import * as SequreStore from "expo-secure-store";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getUserData = useCallback(async (key) => {
    try {
      const data = await SequreStore.getItemAsync(key);
      console.log(data);
      setUserData(JSON.parse(data));
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    // if (!isLoggedIn) {
    getUserData("userData").catch(console.log);
    // }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        isLoggedIn,
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

// const deleteUserData = async (key) => {
//   try {
//     await SequreStore.deleteItemAsync(key);
//     setIsLoggedIn(false);
//     setUserData(null);
//   } catch (error) {
//     console.log(error);
//   }
// };
