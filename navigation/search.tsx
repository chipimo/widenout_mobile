import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "../scenes/Search";

const Stack = createStackNavigator();

export const SearchNavigator = (): React.ReactElement => (
  <Stack.Navigator
    screenOptions={{ presentation: "modal", headerShown: false }}
  >
    <Stack.Screen name="Search" component={Search} />
  </Stack.Navigator>
);
