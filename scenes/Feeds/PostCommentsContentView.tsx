import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { SendIcon } from "./extra/icons";

const PostCommentsContentView = ({ navigation }) => {
  const [message, setMessage] = React.useState("");

  return (
    <View style={styles.container}>
      <View>

      </View>
      <View style={styles.footer}>
        <TextInput
          style={styles.commentInput}
          onChangeText={(msgValue) => setMessage(msgValue)}
          value={message}
          placeholder="Write Comment"
          numberOfLines={2}
        />
         <Button
          appearance="ghost"
          status="basic"
          accessoryLeft={SendIcon}
        />
      </View>
    </View>
  );
};

export default PostCommentsContentView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#ccc",
    borderStyle: "solid",
    borderWidth: 1,
  },
  footer: {
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#ccc",
    borderStyle: "solid",
    borderWidth: 1,
    width: "100%",
    padding: 10,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
  },
  commentInput: {
    backgroundColor: "#EDEDED",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 16,
  },
});
