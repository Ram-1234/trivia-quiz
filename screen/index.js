import React from "react";
import {
  View,
  Text,
  Platform,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import img from "./../assets/homepage.png";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image} />
      <Text style={styles.title}>Are You Ready?</Text>
      <TouchableOpacity
        style={styles.subtitleContainer}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.subtitle}>Let's begin</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.leaderBoardContainer}
        onPress={() => navigation.navigate("Leader Board")}
      >
        <Text style={styles.leaderBoardTitle}>Leader Board</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    zIndex: 10,
    backgroundColor: "#000000c0",
    top: (Platform.OS === 'android')? "40%":"45%",
  },
  subtitleContainer: {
    position: "absolute",
    bottom: "38%",
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    color: "white",
    fontSize: 20,
    lineHeight: 60,
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    bottom: "38%",
  },
  leaderBoardContainer:{
    position: "absolute",
    bottom: "33%",
    alignItems: "center",
    justifyContent: "center",
  },
  leaderBoardTitle:{
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    bottom: "38%",
  }
});
