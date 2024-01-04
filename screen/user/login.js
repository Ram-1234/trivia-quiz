import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import React, { useEffect, useRef } from "react";
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

import Button from "./button";
import { formLogStyle, formFiledStyle, labelTextStyle } from "./styles";
import common from "../../config/common.js";
import Error from "./error-msg";

const validtaionSchema = yup.object().shape({
  email: yup
    .string()
    .email("must be a valid email or phone number")
    .matches(common.emailorphone.regex, { message: "must be a valid email or phone number" })
    .required("Please enter valid email or phone number"),
  password: yup
    .string()
    .matches(common.password.regex, {
      message:
        "Must contain min 2 capital letters, 2 small letter, 2 numbers and 2 special characters",
      excludeEmptyString: true,
    })
    .min(8)
    .required("Password Required"),
});

const ScreenOne = (props) => {
  const { step, nextStep, saveButton, backStep, state } = props;

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validtaionSchema), defaultValues: state?.user_info });

  const saveData = () => {
    let email = watch("email");
    let password = watch("password");
    saveButton(step, { email: email, password: password });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, flexDirection: "row" }}
    >
      <ScrollView bounces={true} style={styles.scrollView}>
        <Text style={formLogStyle}>Login</Text>
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
        <TouchableOpacity style={styles.forgot}>
          <Text style={styles.forgotTitle}>Forgot your password?</Text>
        </TouchableOpacity>
        <Button
          title={"Login"}
          onClickHandler={saveData}
          buttonStyle={{ marginBottom: 20 }}
        />
        <View style={styles.signupContainer}>
          <Text>Don't have account?  </Text>
          <TouchableOpacity>
            <Text style={styles.signup}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    // paddingTop: 30
  },
  formText: {
    fontSize: 20,
    // padding: 10,
    // paddingLeft: 0
  },
  forgot: {
    color: "lighgrey",
  },
  forgotTitle: {
    color: "grey",
    alignSelf: "center",
    marginTop: 10,
  },
  signupContainer:{
    flexDirection:"row",
    alignSelf:'center',
    marginBottom:10,
  },
  signup:{
    color:"#1E90FF"
  }
});

export default ScreenOne;
