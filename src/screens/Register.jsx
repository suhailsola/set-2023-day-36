import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/Input";
import Button from "../components/Button";
import { useForm, Controller } from "react-hook-form";
import { postRegisterUser } from "../utils/api";
import { EvilIcons } from "@expo/vector-icons";

const Register = ({ navigation }) => {
  // const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const handleRegistration = () => {
  //   console.log({ email, username, password });
  // };

  const handleNavigation = (path) => {
    navigation.navigate(path);
  };

  const [registerState, setRegisterState] = useState("pending");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // rename method from packages
  const {
    handleSubmit: handleSubmit2,
    control: control2,
    formState: { errors: errors2 },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setRegisterState("loading");
      const newUser = await postRegisterUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      setRegisterState("success");
      console.log(newUser.data);
    } catch (error) {
      setRegisterState("error");
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
      {registerState !== "loading" ? (
        <View
          style={{
            gap: 10,
            width: "100%",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          {/* <Input label="Email" onChangeText={setEmail} value={email} />
        <Input label="Username" onChangeText={setUsername} value={username} />
        <Input label="Password" onChangeText={setPassword} value={password} />
        <Button
          style={{ width: "100%", textAlign: "center" }}
          onPress={handleRegistration}
        >
          Register
        </Button> */}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                error={errors?.email?.message}
              />
            )}
            name="email"
            rules={{ required: "This is required" }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Username"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                error={errors?.username?.message}
              />
            )}
            name="username"
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
          <View style={{ width: "100%", gap: 10, marginTop: 10 }}>
            <Button
              variant="outline"
              style={{ width: "100%", textAlign: "center" }}
              onPress={handleSubmit(onSubmit)}
            >
              Register
            </Button>

            <Button
              variant="ghost"
              style={{
                width: "100%",
                textAlign: "center",
                borderWidth: 1,
                borderColor: "white",
              }}
              onPress={() => handleNavigation("Login")}
            >
              Login as an existing user
            </Button>
          </View>
        </View>
      ) : (
        <EvilIcons name="spinner-3" size={24} color="black" style={{}} />
      )}
    </View>
  );
};

export default Register;
