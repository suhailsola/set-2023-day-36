import React from "react";
import { Pressable, Text, View } from "react-native";

const Button = ({ children = "Button", variant = "solid", ...rest }) => {
  let bgColor;
  if (variant === "solid") {
    bgColor = { backgroundColor: "white", color: "black" };
  } else if (variant === "outline") {
    bgColor = { backgroundColor: "#75E6DA", color: "black" };
  } else if (variant === "ghost") {
    bgColor = { backgroundColor: "#189AB4", color: "white" };
  }
  return (
    <Pressable
      {...rest}
      style={{
        padding: 10,
        borderRadius: 5,
        ...bgColor,
        ...rest.style,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "400",
          ...bgColor,
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
};

export default Button;
