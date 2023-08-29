import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React from "react";
import Dashboard from "../screens/Dashboard";
import Links from "../screens/Links";
import Account from "../screens/Account";
import {
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const AuthNavigator = () => {
  const { Navigator, Screen } = createBottomTabNavigator();
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="Analytics"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="analytics"
              size={24}
              color={focused ? "#189AB4" : "black"}
            />
          ),
        }}
      ></Screen>
      <Screen
        name="Links"
        component={Links}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="link"
              size={24}
              color={focused ? "#189AB4" : "black"}
            />
          ),
        }}
      ></Screen>
      <Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account-box"
              size={24}
              color={focused ? "#189AB4" : "black"}
            />
          ),
        }}
      ></Screen>
    </Navigator>
  );
};

export default AuthNavigator;
