import React, { useEffect } from "react";
import { Text } from "@rneui/base";
import { View } from "react-native";
import { useSelector, useStore } from "react-redux";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { startAppListening } from "../redux/listenerMiddleware";
import { RootState } from "../redux/configureStore";
import { userLoggedIn } from "../redux/features/auth/userAuth";
import HomeNavigator from "./home.navigator";
import AuthNavigator from "./auth.navigator";

const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: "transparent",
  },
};

const AppNavigator = (): React.ReactElement => {

  const { isLoggedIn } = useSelector((state: RootState) => state.user.user);

  return (  
    <NavigationContainer theme={navigatorTheme}>
      {isLoggedIn ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
