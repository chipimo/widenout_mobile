import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FeedsScreen from "../scenes/Feeds";
import PostStatus from "../scenes/Feeds/PostStatus";
import UserProfile from "../scenes/Profile";
import PostComments from "../scenes/Feeds/PostComments";
import SettingsScreen from "../scenes/Profile/settings";

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
    <Stack.Screen name="LayoutFeeds" component={FeedsNavigator} />
    <Stack.Screen name="PostStatus" component={PostStatus} />
    <Stack.Screen name="PostUserProfile" component={UserProfile} />
    <Stack.Screen
      options={{ headerShown: true }}
      name="UserSettings"
      component={SettingsScreen}
    />
    <Stack.Screen name="PostComments" component={PostComments} />
  </Stack.Navigator>
);
