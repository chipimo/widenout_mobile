import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Groups from "../scenes/Groups";
import GroupDiscussion from "../scenes/Groups/group.discussion";

const Stack = createStackNavigator();

export const GroupNavigator = (): React.ReactElement => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="GroupList" component={Groups} />
    <Stack.Screen name="GroupDiscussion" component={GroupDiscussion} /> 
  </Stack.Navigator>
);
