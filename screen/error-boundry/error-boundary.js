import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.warn(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.text}>{this.props?.fallback}</Text>
        </SafeAreaView>
      );
    }
    return this.props?.children;
  }
}

export default ErrorBoundary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "red",
    textAlign: "center",
    textTransform: "lowercase",
    fontSize: 20,
    fontWeight: 400,
  },
});
