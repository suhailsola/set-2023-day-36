import React, { useCallback, useContext, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

import Button from "../components/Button";
import useGetAllLinks from "../utils/hooks/useGetAllLinks";
import { EvilIcons } from "@expo/vector-icons";
import { postCreateNewLink } from "../utils/api";
import { Controller, useForm } from "react-hook-form";
import Input from "../components/Input";
import { AuthContext } from "../context/AuthContext";

const Links = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const { linkState, data } = useGetAllLinks();
  const { jwt } = useContext(AuthContext);
  // create new link
  const [createLink, setCreateLink] = useState("pending");
  const [createLinkForm, setCreateLinkForm] = useState(false);

  const handleNewLinkForm = () => setCreateLinkForm(!createLinkForm);

  const onSubmit = async (data) => {
    try {
      setCreateLink("loading");
      const link = await postCreateNewLink(jwt, {
        link: data.link,
      });
      setTimeout(() => setCreateLink("success"), 2000);
      console.log(data.link);
    } catch (error) {
      setCreateLink("error");
      console.log(error);
    }
  };

  return (
    <View style={{ ...styles.background }}>
      {createLinkForm ? (
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
                label="Insert link URI"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                error={errors?.link?.message}
              />
            )}
            name="link"
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
            Add Link
          </Button>
          <Button variant="ghost" onPress={handleNewLinkForm}>
            Back
          </Button>
        </View>
      ) : linkState !== "loading" ? (
        <View
          style={{
            backgroundColor: "#75E6DA",
            height: "80%",
            width: "90%",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Text style={{ textAlign: "center", paddingTop: 10 }}>Links</Text>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={data}
            renderItem={({ item }) => {
              return (
                <Text style={{ color: "black", padding: 10 }}>{item.link}</Text>
              );
            }}
          />
          <Button
            onPress={handleNewLinkForm}
            style={{ marginBottom: 10, width: "80%" }}
          >
            + Link
          </Button>
        </View>
      ) : (
        <EvilIcons name="spinner-3" size={24} color="black" style={{}} />
      )}
    </View>
  );
};

export default Links;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#189AB4",
  },
  text: {
    color: "white",
  },
});
