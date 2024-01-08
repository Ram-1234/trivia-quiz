import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Hook } from "./hook";
import Loading from "../loader/loader";
import Score from "../final-score/score";
import { fetchUser } from "../user/hook";
import Progress from "./progress";
import { DeviceOs } from "../../config/common";
import { dynamicStyle } from "../user/styles";

const Question = ({ route, navigation }) => {
  const { user } = route.params;
  const userData = fetchUser() || [];

  const [loader, setLoader] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedAns, setSelectedAns] = useState("");
  const [showResult, setResult] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timerId = null;
    if (count <= 30) {
      timerId = setTimeout(() => {
        setCount((old) => old + 1);
      }, 1000);
    }
    return () => clearTimeout(timerId);
  }, [currentQuestion, count]);

  useEffect(() => {
    setCount(0);
  }, [currentQuestion]);

  /** select option handler */
  const selectOpetion = (selected) => {
    setSelectedAns(selected);
  };

  /** update the asyncstorage */
  const updateAsyncStorage = async (updateScore) => {
    const jsonValue = JSON.stringify(updateScore);
    await AsyncStorage.setItem("users", jsonValue);
  };

  /** update the userlist score  */
  const userLitsScore = (userData, user, score) => {
    return (
      userData &&
      userData.map((item) => {
        if (item.email === user.email) {
          return { ...item, score: score };
        } else return item;
      })
    );
  };

  /** submit output handler */
  const onSubmit = async () => {
    let anser = selectedAns === questions[currentQuestion]?.correct_answer;

    if (anser && count <= 30) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestion < questions?.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else if (currentQuestion === questions?.length - 1) {
      let updateScore = await userLitsScore(userData, user, score);
      updateAsyncStorage(updateScore);
      setResult(true);
    }
    setSelectedAns("");
  };

  /** next question hanlder */
  const handleNext = () => {
    if (currentQuestion < questions?.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else if (currentQuestion === questions?.length - 1) {
      let updateScore = userLitsScore(userData, user, score);
      updateAsyncStorage(updateScore);
      setResult(true);
    }
    setSelectedAns("");
  };

  /** final score close handler  */
  const closeScoreBoard = () => {
    setResult(false);
  };

  let answer = questions[currentQuestion]?.incorrect_answers;
  answer = questions[currentQuestion]?.correct_answer && [
    ...answer,
    questions[currentQuestion]?.correct_answer,
  ];

  Hook(setQuestions, setLoader);

  return !showResult ? (
    <>
      {!loader && questions.length > 0 && (
        <SafeAreaView style={styles.container}>
          <Text
            style={[
              styles.timer,
              DeviceOs === "ios" ? dynamicStyle.f400 : null,
            ]}
          >
            {" "}
            00 : {count} {count > 30 && "Time out!"}
          </Text>
          <Text
            style={[
              styles.question,
              DeviceOs === "ios" ? dynamicStyle.f600 : null,
            ]}
          >
            {questions[currentQuestion]?.question}
          </Text>
          {answer &&
            answer?.sort()?.map((item) => {
              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => selectOpetion(item)}
                  style={[
                    styles.answerContainer,
                    questions[currentQuestion]?.correct_answer === item &&
                    selectedAns?.length > 0
                      ? { borderColor: "green" }
                      : item === selectedAns && { borderColor: "red" },
                  ]}
                >
                  <Text
                    style={[
                      styles.answerText,
                      DeviceOs === "ios" ? dynamicStyle.f400 : null,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          <View style={styles.buttonBox}>
            <TouchableOpacity onPress={onSubmit} style={styles.submitContainer}>
              <Text
                style={[
                  styles.submitButton,
                  DeviceOs === "ios" ? dynamicStyle.f500 : null,
                ]}
              >
                Submit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNext}
              style={styles.submitContainer}
            >
              <Text style={styles.submitButton}>Next</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={[
              styles.score,
              DeviceOs === "ios" ? dynamicStyle.f600 : null,
            ]}
          >
            {score} 🎯
          </Text>
          {/* progress component */}
          {<Progress currentQuestion={currentQuestion} questions={questions} />}
        </SafeAreaView>
      )}
      {/* loading component */}
      {loader && <Loading />}
    </>
  ) : (
    showResult && <Score score={score} closeBoard={closeScoreBoard} />
  );
};

export default Question;

const styles = StyleSheet.create({
  container: {
    minHeight: 420,
  },
  question: {
    fontSize: 20,
    color: "#000",
    padding: 10,
    marginHorizontal: 20,
    color: "red",
  },
  answerContainer: {
    borderColor: "grey",
    borderWidth: 2,
    marginTop: 10,
    borderRadius: 5,
    marginHorizontal: 20,
  },
  answerText: {
    textAlign: "center",
    padding: 8,
    fontSize: 18,
  },
  buttonBox: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 20,
  },
  submitContainer: {
    backgroundColor: "rgb(33, 150, 243)",
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center",
    marginHorizontal: 10,
  },
  submitButton: {
    color: "#fff",
    paddingVertical: 10,
    minWidth: 150,
    fontSize: 16,
    textAlign: "center",
  },
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
  score: {
    color: "#000",
    textAlign: "center",
    fontSize: 35,
    position: "absolute",
    bottom: "-30%",
    left: "50%",
  },
  timer: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
  },
});
