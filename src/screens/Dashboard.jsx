import React, { useContext } from "react";
import { SafeAreaView, Text, View } from "react-native";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";
import { setValueFor } from "../utils/helper/secureStore";

const Dashboard = () => {
  const { jwt, setJwt } = useContext(AuthContext);

  const handleLogout = async () => {
    setJwt(null);
    await setValueFor("jwt", "");
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#189AB4",
      }}
    >
      <Button style={{ width: 100 }} onPress={handleLogout}>
        Logout
      </Button>
    </View>
  );
};

export default Dashboard;
