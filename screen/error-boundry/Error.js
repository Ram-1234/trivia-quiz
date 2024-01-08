import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DeviceOs } from "../../config/common";
import { dynamicStyle } from "../user/styles";

const Error = ({ msg }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.loading, DeviceOs === "ios" ? dynamicStyle.f400 : null]}>{msg || "Something went wrong!"}</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
  loading: {
    fontSize: 20,
    color: "red",
  },
});
