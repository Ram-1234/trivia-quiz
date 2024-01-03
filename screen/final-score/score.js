import React, { memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

const Score = ({ score, closeBoard }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={closeBoard} style={styles.closeContainer}>
        <Text style={styles.close}>X</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Final Score 🎉🎊</Text>
      <Text style={styles.score}>{score}</Text>
    </SafeAreaView>
  );
};

export default memo(Score);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange",
    height: "120%",
    width: "100%",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: 600,
    alignSelf: "center",
    color: "#fff",
  },
  score: {
    fontSize: 30,
    fontWeight: 600,
    alignSelf: "center",
    color: "#fff",
  },
  closeContainer: {
    position: "absolute",
    top: "10%",
    right: 40,
  },
  close: {
    color: "#fff",
    fontSize: 30,
    fontWeight: 600,
    textAlign: "left",
    justifyContent: "flex-start",
  },
});
