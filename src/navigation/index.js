import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useEffect } from "react";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Dashboard from "../screens/Dashboard";
import Register from "../screens/Register";

import { getValueFor, setValueFor } from "../utils/helper/secureStore";
import { AuthContext } from "../context/AuthContext";
import AuthNavigator from "./AuthNavigator";

const AppNavigator = () => {
  const { Navigator, Screen } = createNativeStackNavigator();

  const { jwt, setJwt } = useContext(AuthContext);
  console.log(jwt);

  const fetchSecureStore = async () => {
    try {
      const jwtSecureStore = await getValueFor("jwt");
      setJwt(jwtSecureStore);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (jwt) {
      setValueFor("jwt", jwt);
    }
    fetchSecureStore();
  }, [jwt]);

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: true }}>
        {jwt ? (
          <Screen name="Dashboard" component={AuthNavigator}></Screen>
        ) : (
          <>
            <Screen name="Home" component={Home}></Screen>
            <Screen name="Login" component={Login}></Screen>
            <Screen name="Register" component={Register}></Screen>
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
