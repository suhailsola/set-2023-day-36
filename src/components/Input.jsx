import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Input = ({ label = "Input", error, ...rest }) => {
  return (
    <View
      style={{
        alignItems: "start",
        width: "100%",
      }}
    >
      <Text
        style={{
          paddingLeft: 5,
          paddingBottom: 10,
          color: "white",
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
      <TextInput {...rest} style={{ ...styles.input, ...rest.style }} />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
});

export default Input;
