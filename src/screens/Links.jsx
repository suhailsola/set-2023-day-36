import React, { useCallback, useContext, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

import Button from "../components/Button";
import useGetAllLinks from "../utils/hooks/useGetAllLinks";
import { EvilIcons } from "@expo/vector-icons";
import { postCreateNewLink } from "../utils/api";
import { Controller, useForm } from "react-hook-form";
import Input from "../components/Input";
import { AuthContext } from "../context/AuthContext";
import useRefresh from "../utils/hooks/useRefresh";
import { ActivityIndicator, DataTable, MD2Colors } from "react-native-paper";

const Links = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { linkState, data, fetchData } = useGetAllLinks();

  const { jwt } = useContext(AuthContext);
  // create new link
  const [createLink, setCreateLink] = useState("pending");
  const [createLinkForm, setCreateLinkForm] = useState(false);

  const handleNewLinkForm = () => setCreateLinkForm(!createLinkForm);

  const { onRefresh, refreshing } = useRefresh();

  const onSubmit = async (data) => {
    try {
      setCreateLink("loading");
      const link = await postCreateNewLink(jwt, {
        link: data.link,
      });
      setTimeout(() => setCreateLink("success"), 2000);
      setCreateLinkForm(false);
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
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{ justifyContent: "center" }}>
                Links
              </DataTable.Title>
              <DataTable.Title style={{ justifyContent: "center" }}>
                Slug
              </DataTable.Title>
            </DataTable.Header>

            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={data}
              renderItem={({ item }) => {
                return (
                  <DataTable.Row style={{ borderWidth: 1 }} key={item.key}>
                    <DataTable.Cell style={{ justifyContent: "flex-start" }}>
                      {item.link}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ justifyContent: "center" }}>
                      {item.slug}
                    </DataTable.Cell>
                  </DataTable.Row>
                  // <Text style={{ color: "black", padding: 10 }}>{item.link}</Text>
                );
              }}
            />
          </DataTable>
          <Button
            onPress={handleNewLinkForm}
            style={{ marginBottom: 10, width: "80%" }}
          >
            + Link
          </Button>
        </View>
      ) : (
        <ActivityIndicator animating={true} />
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
