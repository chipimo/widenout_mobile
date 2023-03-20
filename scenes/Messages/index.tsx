import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Divider,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { SafeAreaLayout } from "../../components/safe-area-layout.component";
import { ArrowIosBackIcon } from "../../components/icons";
import ContentView from "./conversation-list";
import { MessageIcon } from "./conversation-list/extra/icons";

const Messages = ({ navigation }): React.ReactElement => {
  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <ContentView navigation={navigation} />
      <TouchableOpacity style={styles.floatButton}>
        <MessageIcon />
      </TouchableOpacity>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatButton: {
    position: "absolute",
    bottom: 50,
    right: 20,
    backgroundColor: "teal",
    height: 50,
    width: 50,
    borderRadius: 50,
    shadowColor: "#000",
    elevation: 7,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Messages;
