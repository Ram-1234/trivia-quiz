import * as yup from "yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "./button";
import { formLogStyle, formFiledStyle, labelTextStyle } from "./styles";
import common from "../../config/common";
import Error from "./error-msg";
import { fetchUser } from "./hook";

const validtaionSchema = yup.object().shape({
  fullname: yup
    .string()
    .matches(common.alphabets, {
      message: "Fullname must be alphabets",
      excludeEmptyString: true,
    })
    .min(2)
    .max(50)
    .required("Fullname Required"),
  email: yup
    .string()
    .email("must be a valid email or phone number")
    .matches(common.emailorphone.regex, {
      message: "must be a valid email or phone number",
    })
    .required("Please enter valid email or phone number"),
  password: yup
    .string()
    .matches(common.aplhaNumeric, {
      message: "Must conatain 5 char",
      excludeEmptyString: true,
    })
    .min(5)
    .required("Password Required"),
});

const Signup = ({ navigation }) => {
  const userData = fetchUser();
  console.log("userData", userData);

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validtaionSchema),
    defaultValues: {},
  });

  /**form save data handler */
  const signupHandler = (data) => {
    let findUser = userData?.some((item) => item.email === data.email);
    console.log('findUser', findUser);
    
    if (!findUser) {
      // alert("Successful!");
      let newObject = { ...data, score: 0 };
      const jsonValue = JSON.stringify([...userData, newObject]);
      AsyncStorage.setItem("users", jsonValue);
      navigation.navigate("Questions", { user: data });
    }

    if (findUser) {
      alert("Email id exist please login");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, flexDirection: "row" }}
    >
      <ScrollView bounces={true} style={styles.scrollView}>
        <Text style={formLogStyle}>Sign up</Text>
        <View>
          <Text style={labelTextStyle}>Full Name</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                style={formFiledStyle}
                onChangeText={onChange}
                placeholder="Enter fullname"
              />
            )}
            name="fullname"
          />
          {errors?.fullname && <Error title={errors?.fullname?.message} />}
        </View>
        <View>
          <Text style={labelTextStyle}>Email</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                required={true}
                type="email"
                errors={errors}
                value={value}
                // onLayout={()=> inputRef.current.focus()}
                // onSubmitEditing={Keyboard.dismiss}
                style={formFiledStyle}
                onChangeText={onChange}
                name="email"
                placeholder="Enter email or mobile number"
              />
            )}
            name="email"
          />
          {errors?.email && (
            <Error title={errors?.email?.message || "Enter valid email"} />
          )}
        </View>
        <View>
          <Text style={labelTextStyle}>Password</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={formFiledStyle}
                // onSubmitEditing={Keyboard.dismiss}
                placeholder="Your password"
                secureTextEntry={true}
                label="Password"
              />
            )}
            name="password"
          />
          {errors?.password && (
            <Error
              title={errors?.password.message || "Enter strong password"}
            />
          )}
        </View>
        <Button
          title={"Sing up"}
          onClickHandler={handleSubmit(signupHandler)}
          buttonStyle={{ marginBottom: 20 }}
        />
        <View style={styles.signupContainer}>
          <Text>Already have account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signup}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  scrollView: {
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    paddingTop: 30,
  },
  formText: {
    fontSize: 20,
    padding: 10,
    paddingLeft: 0,
  },
  signupContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 10,
  },
  signup: {
    color: "#1E90FF",
  },
});
