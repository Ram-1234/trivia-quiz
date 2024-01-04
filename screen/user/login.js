import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Async,
} from "react-native";

import Button from "./button";
import { formLogStyle, formFiledStyle, labelTextStyle } from "./styles";
import common from "../../config/common.js";
import Error from "./error-msg";
import { fetchUser } from "./hook";

const validtaionSchema = yup.object().shape({
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
      message: "Must containe 5 char",
      excludeEmptyString: true,
    })
    .min(5)
    .required("Password Required"),
});

const LoginForm = ({ navigation }) => {
  const userData = fetchUser();

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validtaionSchema), defaultValues: {} });

  const loginHandler = (data) => {
    let userInfo = {};
    for (let i of userData) {
      if (i.email === data.email) {
        userInfo = i;
      }
    }

    /*** email & password check */
    let emailCheck = data.email === userInfo.email;
    let passwordCheck = data.password === userInfo.password;

    if (!emailCheck) {
      alert("user not found plz signup");
    } else if (emailCheck && passwordCheck) {
      navigation.navigate("Questions", { user: userInfo });
    } else if (emailCheck && !passwordCheck) {
      alert("Incorrect password");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoid}
    >
      <ScrollView bounces={true} style={[styles.scrollView]}>
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
          onClickHandler={handleSubmit(loginHandler)}
          buttonStyle={{ marginBottom: 20 }}
        />
        <View style={styles.signupContainer}>
          <Text>Don't have account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
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
  signupContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 10,
  },
  signup: {
    color: "#1E90FF",
  },
  keyboardAvoid: {
    flex: 1,
    flexDirection: "row",
  },
});

export default LoginForm;
