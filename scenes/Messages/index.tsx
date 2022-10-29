import React from "react";
import { StyleSheet } from "react-native";
import {
  Divider,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { SafeAreaLayout } from "../../components/safe-area-layout.component";
import { ArrowIosBackIcon } from "../../components/icons";
import ContentView from "./conversation-list";


const Messages = ({ navigation }): React.ReactElement => {
 
  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <ContentView navigation={navigation} />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Messages;
