import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Question from "./screen/question/question";
import ErrorBoundary from "./screen/error-boundry/error-boundary";
import Error from "./screen/error-boundry/Error";
import LoginForm from "./screen/user/login";
import Signup from "./screen/user/signup";

export default function App() {
  return (
    <ErrorBoundary fallback={<Error msg={""} />}>
      <SafeAreaView style={styles.container}>
        {/* <Question /> */}
        {/* <LoginForm/> */}
        <Signup/>
      </SafeAreaView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "center",
  },
});
