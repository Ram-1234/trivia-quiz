import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ErrorBoundary from "./screen/error-boundry/error-boundary";
import Error from "./screen/error-boundry/Error";
import Home from "./screen";

import Question from "./screen/question/question";
import LoginForm from "./screen/user/login";
import Signup from "./screen/user/signup";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <ErrorBoundary fallback={<Error msg={""} />}>
        <SafeAreaView style={styles.container}>
          <Stack.Navigator>
            <Stack.Screen name="Trivia Quiz" component={Home}></Stack.Screen>
            <Stack.Screen name="Login" component={LoginForm}></Stack.Screen>
            <Stack.Screen name="Signup" component={Signup}></Stack.Screen>
            <Stack.Screen name="Questions" component={Question}></Stack.Screen>
          </Stack.Navigator>
        </SafeAreaView>
      </ErrorBoundary>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
