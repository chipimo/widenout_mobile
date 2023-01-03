import React, { useEffect } from "react";
import { Text } from "@rneui/base";
import { View } from "react-native";
import { useSelector, useStore } from "react-redux";
import { useNetInfo, NetInfoState } from "@react-native-community/netinfo";
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
  const internetState: NetInfoState = useNetInfo();
  const [showNetMsg, setShowNetMsg] = React.useState(false)

  React.useEffect(() => {
    if (internetState.isConnected === false) {
      setShowNetMsg(true)
    }else{
      setShowNetMsg(false)
    }
  }, [internetState.isConnected]);

  return (  
    <NavigationContainer theme={navigatorTheme}>
      {
        showNetMsg? <View style={{height:50, padding:10}}>
          <Text style={{color:'#3b3b3b'}}>No Internet! ❌</Text>
          <Text>Sorry, we need an Internet connection for App to run correctly.</Text>
        </View>: null
      }
      {isLoggedIn ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
