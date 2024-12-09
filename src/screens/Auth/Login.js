import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import colors from "../../data/styling/colors";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../navigation";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth";
import UserContext from "../../context/UserContext";
const Login = () => {
  const navigation = useNavigation();
  // add the Global Variable
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  //Mutation to send data to the backend
  const { mutate } = useMutation({
    mutationFn: () => login(userInfo),
    onSuccess: () => {
      setAuthenticated(true);
    },
    onError: (error) => {
      console.log(error);
      if (error.request._response) console.log(error.request._response);
      if (error.response) console.log(error.response);
      else if (error.request) console.log(error.request);
    },
  });
  const handleLogin = () => {
    // console.log(userInfo);
    mutate();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ width: "100%", padding: 20 }}>
        <Text
          style={{
            color: colors.white,
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Login
        </Text>
        <Text style={{ color: colors.white, fontSize: 16 }}>
          Login to your account
        </Text>

        <TextInput
          style={{
            backgroundColor: colors.white,
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
          }}
          placeholder="Email"
          value={userInfo.email}
          onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
        />

        <TextInput
          style={{
            backgroundColor: colors.white,
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
          }}
          placeholder="Password"
          secureTextEntry={true}
          value={userInfo.password}
          onChangeText={(text) => setUserInfo({ ...userInfo, password: text })}
        />

        <TouchableOpacity
          style={{
            backgroundColor: colors.white,
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
            alignItems: "center",
          }}
          onPress={handleLogin}
        >
          <Text
            style={{
              color: colors.primary,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={{ color: colors.white, fontSize: 16 }}>
            Don't have an account?{" "}
            <Text
              style={{ color: colors.white, fontWeight: "bold" }}
              onPress={() => navigation.navigate(ROUTES.AUTH.REGISTER)}
            >
              Register
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
