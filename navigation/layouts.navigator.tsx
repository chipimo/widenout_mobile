import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FeedsScreen from "../scenes/Feeds";
import PostStatus from "../scenes/Feeds/PostStatus";

const Stack = createStackNavigator();
const Feeds = createStackNavigator();

export const FeedsNavigator = (): React.ReactElement => (
  <Feeds.Navigator screenOptions={{ headerShown: false }}>
    <Feeds.Screen name="HomeFeeds" component={FeedsScreen} />
  </Feeds.Navigator>
);

export const LayoutsNavigator = (): React.ReactElement => (
  <Stack.Navigator
    screenOptions={{ presentation: "modal", headerShown: false }}
  >
    <Stack.Screen name="Feeds" component={FeedsNavigator} />
    <Stack.Screen name="PostStatus" component={PostStatus} />
  </Stack.Navigator>
);
