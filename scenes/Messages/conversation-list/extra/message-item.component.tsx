import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Avatar, ListItem, ListItemProps, Text } from "@ui-kitten/components";
import { DoneAllIcon } from "./icons";
import { GLOBALTYPES } from "../../../../redux/globalTypes";

export type MessageItemProps = ListItemProps & {
  message: any;
  navigation: any;
};

export const MessageItem = (props: MessageItemProps): React.ReactElement => {
  const { message, onPress, navigation, ...listItemProps } = props;
  const maxlimit = 5;

  const renderMessageDate = (style: ViewStyle): React.ReactElement => (
    <View style={styles.dateContainer}>
      {message.read !== "0" ? <DoneAllIcon /> : null}
      <Text style={styles.dateText} appearance="hint" category="c1">
        {message.date}
      </Text>
    </View>
  );

  const renderProfileAvatar = (): React.ReactElement => (
    <Avatar
      style={styles.avatar}
      source={{ uri: GLOBALTYPES.imageLink + message.image }}
    />
  );

  return (
    <ListItem
      {...listItemProps}
      onPress={() =>
        navigation && navigation.navigate("Chats", { senderId: message.idu })
      }
      title={message.first_name + " " + message.last_name}
      description={
        message.message.length > maxlimit
          ? message.message.substring(0, 100) + "..."
          : message.message
      }
      accessoryLeft={renderProfileAvatar}
      accessoryRight={renderMessageDate}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    tintColor: null,
    marginRight: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    textAlign: "right",
    minWidth: 64,
  },
});
