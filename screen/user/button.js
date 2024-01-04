import { Pressable, Text, StyleSheet } from "react-native";

const Button = (props) => {
  const { title, onClickHandler, buttonStyle } = props;

  return (
    <Pressable onPress={onClickHandler} style={[styles.container, buttonStyle]}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    backgroundColor: "#007FFF",
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 4,
    alignSelf: "center",
  },
  title: {
    letterSpacing: 1,
    color: "#fff",
    textTransform: "capitalize",
    textAlign: "center",
  },
});
export default Button;
