import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Loading = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.loading}>Loading...</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
  loading: {
    fontSize: 20,
    fontWeight: 400,
    color: "grey",
  },
});
