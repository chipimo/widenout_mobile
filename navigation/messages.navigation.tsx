import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PostStatus from "../scenes/Feeds/PostStatus";
import Messages from "../scenes/Messages";
import Chat from "../scenes/Messages/chat-1";

const Stack = createStackNavigator();
const Feeds = createStackNavigator();

export const MessagesNavigator = (): React.ReactElement => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="MessagesList" component={Messages} />
    <Stack.Screen name="Chats" component={Chat} />
  </Stack.Navigator>
);
