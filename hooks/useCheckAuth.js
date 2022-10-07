// import * as SecureStore from "expo-secure-store";
// import { useState, useEffect } from "react";

// const useCheckAuth = () => {
//   const [isAuth, setIsAuth] = useState(false);
//   const [userData, setUserData] = useState({});

//   const saveFormData = async (key, value) => {
//     await SecureStore.setItemAsync(key, value);
//   };

//   const logout = async () => {
//     console.log("logout");
//     await SecureStore.deleteItemAsync("userData");
//     setIsAuth(false);
//     setUserData(null);
//   };

//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const userData = await SecureStore.getItemAsync("userData");
//         setUserData(userData);
//         setIsAuth(true);
//       } catch (error) {
//         console.log(error);
//         setIsAuth(false);
//       }
//     };
//     getUserData();
//   }, []);
//   console.log(isAuth);

//   return { isAuth, userData, saveFormData, logout };
// };

// export default useCheckAuth;
