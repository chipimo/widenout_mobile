import React from "react";
import { ImageSourcePropType, Keyboard, Platform } from "react-native";
import {
  Button,
  Input,
  StyleService,
  useStyleSheet,
  Divider,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { KeyboardAvoidingView } from "./extra/keyboard-avoiding-view.component";
import { Chat } from "./extra/chat.component";
import { AttachmentsMenu } from "./extra/attachments-menu.component";
import { MicIcon, PaperPlaneIcon, PlusIcon } from "./extra/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/configureStore";
import {
  useGetChatsMutation,
  useSetChatMessageMutation,
} from "../../../services/fetch.user.service";
import { Message } from "./extra/data";
import {
  HideTopBar,
  ShowTopBar,
} from "../../../redux/features/drawer/showTopBar";
import { ArrowIosBackIcon } from "../conversation-list/extra/icons";

const galleryAttachments: ImageSourcePropType[] = [
  require("./assets/image-attachment-1.png"),
  require("./assets/image-attachment-2.jpg"),
  require("./assets/image-attachment-1.png"),
  require("./assets/image-attachment-2.jpg"),
];

const keyboardOffset = (height: number): number =>
  Platform.select({
    android: 0,
    ios: height,
  });

export default ({ navigation }): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  const [messages, setMessages] = React.useState<Message[]>([]);
  const [message, setMessage] = React.useState<string>();
  const [attachmentsMenuVisible, setAttachmentsMenuVisible] =
    React.useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.user.user);
  const [chatListArray, setChatListArray] = React.useState<[]>();
  const state = navigation.getState();
  const [getChats] = useGetChatsMutation();
  const [setChatMessage] = useSetChatMessageMutation();
  const dispatch = useDispatch();
  // const [uid, setUid] = React.useState<string>('');

  React.useEffect(() => {
    dispatch(HideTopBar(""));
    getUserChats();
    // setUid(user.idu)

    const interval = setInterval(() => getUserChats(), 1000);

    return () => {
      dispatch(ShowTopBar(""));
      clearInterval(interval);
    };
  }, []);

  const getUserChats = async () => {
    let uid = user.idu;

    const chatsList = await getChats({
      uid,
      cid: state.routes[1].params.senderId,
      start: 0,
      type: 3,
    }).unwrap();

    let initialMessages: Message[] = [];

    chatsList.map((list) => {
      let msg_type = false;
      if (uid === list.idu) msg_type = true;

      initialMessages.push(
        Message.setChart(list.message, list.date, msg_type, null)
      );
    });
    setMessages(initialMessages);
    setChatListArray(chatsList);
  };

  const sendButtonEnabled = (): boolean => {
    return message && message.length > 0;
  };

  const toggleAttachmentsMenu = (): void => {
    setAttachmentsMenuVisible(!attachmentsMenuVisible);
  };

  const onSendButtonPress = async (): void => {
    setMessages([...messages, new Message(message, "now", true, null)]);
    setMessage(null);
    Keyboard.dismiss();

    let uid = user.idu;

    const chatMsg = await setChatMessage({
      uid,
      ToId: state.routes[1].params.senderId,
      msg: message,
    }).unwrap();

    console.log(chatMsg);
  };

  const renderAttachmentsMenu = (): React.ReactElement => (
    <AttachmentsMenu
      attachments={galleryAttachments}
      onSelectPhoto={toggleAttachmentsMenu}
      onSelectFile={toggleAttachmentsMenu}
      onSelectLocation={toggleAttachmentsMenu}
      onSelectContact={toggleAttachmentsMenu}
      onAttachmentSelect={toggleAttachmentsMenu}
      onCameraPress={toggleAttachmentsMenu}
      onDismiss={toggleAttachmentsMenu}
    />
  );

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  return (
    <React.Fragment>
      <TopNavigation title="Messages" accessoryLeft={renderBackAction} />
      <Divider />
      <Chat
        style={styles.chat}
        contentContainerStyle={styles.chatContent}
        followEnd={true}
        data={messages}
      />
      <KeyboardAvoidingView
        style={styles.messageInputContainer}
        offset={keyboardOffset}
      >
        <Button
          style={[styles.iconButton, styles.attachButton]}
          accessoryLeft={PlusIcon}
          onPress={toggleAttachmentsMenu}
        />
        <Input
          style={styles.messageInput}
          placeholder="Message..."
          value={message}
          onChangeText={setMessage}
          accessoryRight={MicIcon}
        />
        <Button
          appearance="ghost"
          style={[styles.iconButton, styles.sendButton]}
          accessoryLeft={PaperPlaneIcon}
          disabled={!sendButtonEnabled()}
          onPress={onSendButtonPress}
        />
      </KeyboardAvoidingView>
      {attachmentsMenuVisible && renderAttachmentsMenu()}
    </React.Fragment>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  chat: {
    flex: 1,
  },
  chatContent: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  messageInputContainer: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 16,
    backgroundColor: "background-basic-color-1",
  },
  attachButton: {
    borderRadius: 24,
    marginHorizontal: 8,
  },
  messageInput: {
    flex: 1,
    marginHorizontal: 8,
  },
  sendButton: {
    marginRight: 4,
  },
  iconButton: {
    width: 24,
    height: 24,
  },
});
