import React from "react";
import { Text, View } from "react-native";
import Button from "../components/Button";

const Home = ({ navigation }) => {
  const handleNavigation = (path) => {
    navigation.navigate(path);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
        backgroundColor: "#189AB4",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 40,
          // fontFamily: "Helvetica",
          fontWeight: "bold",
        }}
      >
        Welcome
      </Text>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <Button
          variant="solid"
          style={{ width: 100 }}
          onPress={() => handleNavigation("Register")}
        >
          Register
        </Button>
        <Button
          style={{ width: 100 }}
          onPress={() => handleNavigation("Login")}
        >
          Login
        </Button>
      </View>
    </View>
  );
};

export default Home;
