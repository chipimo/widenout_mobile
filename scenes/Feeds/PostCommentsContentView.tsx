import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Avatar, Button, List, Text } from "@ui-kitten/components";
import { SendIcon } from "./extra/icons";
import { GLOBALTYPES } from "../../redux/dist/globalTypes";
import moment from "moment";

const PostCommentsContentView = ({ navigation }) => {
  const [message, setMessage] = React.useState("");
  const [comment, setComment] = React.useState([]);
  const state = navigation.getState();

  React.useEffect(() => {
    if (state.routes[1].params.comments)
      setComment(state.routes[1].params.comments);
  }, []);

  const renderPostComment = (comment: any): React.ReactElement => (
    <View style={styles.PostComment}>
      <Avatar source={{ uri: GLOBALTYPES.imageLink + comment.item.image }} />
      <View style={styles.PostCommentBody}>
        <Text appearance="hint" category="c1">
          {moment(comment.item.time).fromNow()}
        </Text>
        <Text category="h6">
          {comment.item.first_name + " " + comment.item.last_name}
        </Text>
        <Text>{comment.item.message}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <List
          data={comment}
          renderItem={(info) => {
            return renderPostComment(info);
          }}
        />
      </View>
      <View style={styles.footer}>
        <TextInput
          style={styles.commentInput}
          onChangeText={(msgValue) => setMessage(msgValue)}
          value={message}
          placeholder="Write Comment"
          numberOfLines={2}
        />
        <Button appearance="ghost" status="basic" accessoryLeft={SendIcon} />
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
    backgroundColor: "#fff",
  },
  commentInput: {
    backgroundColor: "#EDEDED",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 16,
  },
  PostComment: {
    flexDirection: "row",
    padding: 6,
    margin: 1,
  },
  PostCommentBody: {
    backgroundColor: "#EDEDED",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 16,
  },
  list: {
    flex: 1,
  },
});
