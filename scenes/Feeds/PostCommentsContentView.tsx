import React from "react";
import { View, StyleSheet, TextInput, Dimensions  } from "react-native";
import { Avatar, Button, List, Text } from "@ui-kitten/components";
import { SendIcon } from "./extra/icons";
import { GLOBALTYPES } from "../../redux/globalTypes";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/configureStore";
import {
  useGetPostCommentMutation,
  usePost_commentMutation,
} from "../../services/fetch.user.service";
import { PostComments } from "../../redux/features/feeds/comments";

const windowHeight = Dimensions.get('window').height;

const PostCommentsContentView = ({ navigation }) => {
  const [message, setMessage] = React.useState("");
  const [post_id, setPost_id] = React.useState("");
  const [comment, setComment] = React.useState([]);
  const { user } = useSelector((state: RootState) => state.user.user);
  const { list } = useSelector((state: RootState) => state.user.postComments);
  const [getPostComment, { isLoading, isError, status, error }] =
    useGetPostCommentMutation();
  const [post_comment] = usePost_commentMutation();
  const dispatch = useDispatch();
  const state = navigation.getState();

  React.useEffect(() => {
    if (state.routes[1].params.comments) {
      setComment(state.routes[1].params.comments);
      setPost_id(state.routes[1].params.post_id);
    }
    getPostCommments()
  }, []);

  const getPostCommments = async () => {
    const comment = await getPostComment({
      post_id: state.routes[1].params.post_id,
    }).unwrap();
    dispatch(PostComments(comment));
  };

  const PostComment = async () => {
    let user_id = user.idu;
    let id = post_id;

    const post = await post_comment({ user_id, id, comment: message }).unwrap();
    console.log(post);
    getPostCommments()
  };

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
        <List
        style={styles.list}
          data={list}
          renderItem={(info) => {
            return renderPostComment(info);
          }}
        />
      <View style={styles.footer}>
        <TextInput
          style={styles.commentInput}
          onChangeText={(msgValue) => setMessage(msgValue)}
          value={message}
          placeholder="Write Comment"
          numberOfLines={2}
        />
        <Button
          onPress={PostComment}
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
    maxHeight: windowHeight-210,
  },
});
