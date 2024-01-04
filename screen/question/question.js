import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Hook } from "./hook";
import Loading from "../loader/loader";
import Score from "../final-score/score";
import { fetchUser } from "../user/hook";

const Question = ({route, navigation}) => {
  const { user } = route.params;
  const userData = fetchUser();

  const [loader, setLoader] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedAns, setSelectedAns] = useState("");
  const [showResult, setResult] = useState(false);
  const [count, setCount] = useState(0);

  //throw errors

  useEffect(() => {
    let timerId = null;
    if (count <= 30) {
      timerId = setTimeout(() => {
        setCount((old) => old + 1);
      }, 1000);
    }
    return () => clearTimeout(timerId);
  }, [currentQuestion, count]);

  useEffect(()=>{
    setCount(0);
  },[currentQuestion])

  const selectOpetion = (selected) => {
    setSelectedAns(selected);
    let anser = selected === questions[currentQuestion]?.correct_answer;
    if (!anser) {
      alert("Currect Answer: " + questions[currentQuestion]?.correct_answer);
    }
  };

  const onSubmit = () => {
    let anser = selectedAns === questions[currentQuestion]?.correct_answer;

    if (currentQuestion < questions?.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setResult(true);
      let newObject = {...user, score:score}
      const jsonValue = JSON.stringify([...userData, newObject]);
      AsyncStorage.setItem("users", jsonValue);
    }

    if (anser && count <= 30) {
      setScore((prev) => prev + 1);
    } else {
      // alert(questions[currentQuestion]?.correct_answer);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions?.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setResult(true);
      let newObject = {...user, score:score}
      const jsonValue = JSON.stringify([...userData, newObject]);
      AsyncStorage.setItem("users", jsonValue);
      //navigation.navigate("Questions")
    }
  };

  const handleProgress = (currLength, total) => {
    let widthPrecent = parseInt(((currLength + 1) / total) * 100);
    return {
      width: `${widthPrecent}%`,
    };
  };

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
      {!loader && (
        <SafeAreaView style={styles.container}>
          <Text style={styles.timer}>
            {" "}
            00 : {count} {count > 30 && "Time out!"}
          </Text>
          <Text style={styles.question}>
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
                    questions[currentQuestion]?.correct_answer ===
                      selectedAns && item === selectedAns
                      ? { borderColor: "green" }
                      : item === selectedAns && { borderColor: "red" },
                  ]}
                >
                  <Text style={styles.answerText}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          <View style={styles.buttonBox}>
            <TouchableOpacity onPress={onSubmit} style={styles.submitContainer}>
              <Text style={styles.submitButton}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNext}
              style={styles.submitContainer}
            >
              <Text style={styles.submitButton}>Next</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.score}>{score} 🎯</Text>
          <View style={[styles.progressContainer]}>
            <Text
              style={[
                styles.progress,
                handleProgress(currentQuestion, questions?.length),
              ]}
            ></Text>
          </View>
        </SafeAreaView>
      )}
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
    // borderWidth: 2,
  },
  question: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    padding: 10,
    marginHorizontal: 20,
    color: "red",
    // borderWidth:2,
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
    fontWeight: 400,
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
    fontWeight: 500,
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
    fontWeight: 600,
    position: "absolute",
    bottom: "-30%",
    left: "50%",
  },
  timer: {
    fontSize: 20,
    fontWeight: 400,
    color: "#000",
    textAlign: "center",
  },
});
