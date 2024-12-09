import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import colors from "../../data/styling/colors";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../api/auth";
import * as ImagePicker from "expo-image-picker";
import UserContext from "../../context/UserContext";
const Register = () => {
  const navigation = useNavigation();
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    name: "",
  });
  // Adding the image picker
  const [image, setImage] = useState(null);
  const { mutate } = useMutation({
    mutationFn: () => register(userInfo, image),
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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleRegister = () => {
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
          Register
        </Text>
        <Text style={{ color: colors.white, fontSize: 16 }}>
          Create your account
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
          placeholder="Username"
          autoCapitalize="none"
          value={userInfo.name}
          onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
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

        <TouchableOpacity style={{ marginTop: 20 }} onPress={pickImage}>
          <Text style={{ color: colors.white, fontSize: 16 }}>
            Upload Profile Image
          </Text>
        </TouchableOpacity>
        {/* adding the image  */}
        {image && (
          <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
        )}
        <TouchableOpacity
          style={{
            backgroundColor: colors.white,
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
            alignItems: "center",
          }}
          onPress={handleRegister}
        >
          <Text
            style={{
              color: colors.primary,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Register
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: 20, alignItems: "center" }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: colors.white, fontSize: 16 }}>
            Already have an account?{" "}
            <Text style={{ color: colors.white, fontWeight: "bold" }}>
              Login
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
