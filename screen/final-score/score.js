import React, { memo } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DeviceOs } from "../../config/common";
import { dynamicStyle } from "../user/styles";

const Score = ({ score, closeBoard }) => {
  const navigation = useNavigation();

  const closeButton = () => {
    navigation.navigate("Trivia Quiz");
    closeBoard();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={closeButton} style={styles.closeContainer}>
        <Text
          style={[styles.close, DeviceOs === "ios" ? dynamicStyle.f600 : null]}
        >
          X
        </Text>
      </TouchableOpacity>
      <Text
        style={[styles.title, DeviceOs === "ios" ? dynamicStyle.f600 : null]}
      >
        Final Score 🎉🎊
      </Text>
      <Text
        style={[styles.score, DeviceOs === "ios" ? dynamicStyle.f600 : null]}
      >
        {score}
      </Text>
    </SafeAreaView>
  );
};

export default memo(Score);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    height: "100%",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    alignSelf: "center",
    color: "#fff",
  },
  score: {
    fontSize: 30,
    alignSelf: "center",
    color: "#fff",
  },
  closeContainer: {
    position: "absolute",
    top: "2%",
    right: 20,
  },
  close: {
    color: "#fff",
    fontSize: 30,
    textAlign: "left",
    justifyContent: "flex-start",
  },
});
