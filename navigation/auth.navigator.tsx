import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../scenes/auth/sign-in.component";
import SignUpScreen from "../scenes/auth/sign-up.component";

const Stack = createStackNavigator();

const AuthNavigator = (): React.ReactElement => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);
export default AuthNavigator;
