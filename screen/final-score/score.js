import React, { memo } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Score = ({ score, closeBoard }) => {
  const navigation = useNavigation();

  const closeButton = () => {
    navigation.navigate("Trivia Quiz");
    closeBoard();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={closeButton} style={styles.closeContainer}>
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
    flex: 1,
    backgroundColor: "orange",
    height: "100%",
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
    top: "2%",
    right: 20,
  },
  close: {
    color: "#fff",
    fontSize: 30,
    fontWeight: 600,
    textAlign: "left",
    justifyContent: "flex-start",
  },
});
