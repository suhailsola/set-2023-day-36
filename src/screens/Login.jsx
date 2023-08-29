import React, { useContext, useState } from "react";
import { Text, View } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { useForm, Controller } from "react-hook-form";
import { postLoginUser } from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { EvilIcons } from "@expo/vector-icons";

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { setJwt } = useContext(AuthContext);
  const [loginState, setLoginState] = useState("pending");

  const onSubmit = async (data) => {
    try {
      // console.log(data);
      setLoginState("loading");
      const user = await postLoginUser({
        identifier: data.identifier,
        password: data.password,
      });
      setLoginState("success");
      setJwt(user?.jwt);
      console.log(user);
    } catch (error) {
      setLoginState("error");
      console.log(error);
    }
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
      {loginState !== "loading" ? (
        <View
          style={{
            gap: 20,
            width: "100%",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Username or Email"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                error={errors?.identifier?.message}
              />
            )}
            name="identifier"
            rules={{ required: "This is required" }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                error={errors?.password?.message}
              />
            )}
            name="password"
            rules={{ required: "This is required" }}
          />
          <Button
            variant="outline"
            style={{
              width: "100%",
              textAlign: "center",
              borderWidth: 1,
            }}
            onPress={handleSubmit(onSubmit)}
          >
            Login
          </Button>
        </View>
      ) : (
        <EvilIcons name="spinner-3" size={24} color="black" style={{}} />
      )}
    </View>
  );
};

export default Login;
