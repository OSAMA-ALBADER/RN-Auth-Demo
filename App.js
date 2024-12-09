import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./src/navigation/MainNavigation/MainNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthNav from "./src/navigation/AuthNavigation/AuthNav";
import { useEffect, useState } from "react";
import UserContext from "./src/context/UserContext";
import { getToken } from "./src/api/storage";
export default function App() {
  const queryClient = new QueryClient();

  //configer the authenticaated
  const [authenticated, setAuthenticated] = useState(false);

  //check the token
  useEffect(() => {
    // check if the token exisit
    const checkToken = async () => {
      const token = await getToken();
      // if token exisit ? setAuth to true : null
      if (token) setAuthenticated(true);
    };
    checkToken();
  }, []);

  return (
    <UserContext.Provider value={[authenticated, setAuthenticated]}>
      <NavigationContainer>
        <StatusBar style="light" />
        <QueryClientProvider client={queryClient}>
          {/* add the context and the condition */}
          {authenticated ? <MainNavigation /> : <AuthNav />}
        </QueryClientProvider>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

// after adding the auth go to login page
