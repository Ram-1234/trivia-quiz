import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Error = ({msg}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.loading}>{msg||"Something went wrong!"}</Text>
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
    fontWeight: 400,
    color: "red",
  },
});
