import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Progress = ({ currentQuestion, questions }) => {
  /** progress handler */
  const handleProgress = (currLength, total) => {
    let widthPrecent = parseInt(((currLength + 1) / total) * 100);
    return {
      width: `${widthPrecent}%`,
    };
  };

  return (
    <View style={styles.progressContainer}>
      <Text
        style={[
          styles.progress,
          handleProgress(currentQuestion, questions?.length),
        ]}
      ></Text>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  progressContainer: {
    backgroundColor: "lightgrey",
    alignSelf: "center",
    width: "90%",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    position: "absolute",
    bottom: "-40%",
  },
  progress: {
    backgroundColor: "green",
    borderRadius: 10,
    borderRadius: 10,
  },
});
