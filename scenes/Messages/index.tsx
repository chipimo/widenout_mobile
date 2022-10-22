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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/configureStore";
import { useGetChatsMutation } from "../../services/fetch.user.service";

const Messages = ({ navigation }): React.ReactElement => {
  const [getChats] = useGetChatsMutation();
  const { user } = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch();

  React.useEffect(() => {
    getChatsFunc();
  }, []);

  const getChatsFunc = async () => {
    let uid = user.idu;

    const chatsList = await getChats({
      uid,
      cid: null,
      start: null,
      type: 3,
    }).unwrap();
    console.log(chatsList);
  };

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation title="Messages" accessoryLeft={renderBackAction} />
      <Divider />
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
