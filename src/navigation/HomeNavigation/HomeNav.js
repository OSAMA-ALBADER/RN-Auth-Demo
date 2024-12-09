import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ROUTES from "../index";
import Notes from "../../screens/Home/Notes";
import colors from "../../data/styling/colors";
import NoteDetails from "../../screens/Home/NoteDetails";
import { deleteToken } from "../../api/storage";
import UserContext from "../../context/UserContext";

const Stack = createNativeStackNavigator();

const HomeNav = () => {
  //Add Global Variable
  const [authenticated, setAuthenticated] = useContext(UserContext);
  return (
    //add logout icon with delete Auth onPress
    <Stack.Navigator
      screenOptions={{
        headerRight: () => {
          <TouchableOpacity
            onPress={async () => {
              await deleteToken();
              setAuthenticated(false);
            }}
          >
            <MaterialIcons name="logout" size={24} color="red" />;
          </TouchableOpacity>;
        },
      }}
    >
      <Stack.Screen
        name={ROUTES.HOME.NOTES}
        component={Notes}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitle: "All Notes",
          headerTitleStyle: {
            color: colors.white,
            fontWeight: "bold",
            fontSize: 20,
          },
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.HOME.NOTE_DETAILS}
        component={NoteDetails}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitle: "Note Details",
          headerTitleStyle: {
            color: colors.white,
            fontWeight: "bold",
            fontSize: 20,
          },
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNav;

const styles = StyleSheet.create({});
