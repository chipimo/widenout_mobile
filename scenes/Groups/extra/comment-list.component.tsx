import React from "react";
import { Image, ListRenderItemInfo, StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  List,
  ListProps,
  Text,
  Divider,
} from "@ui-kitten/components";
import moment from "moment";
import { HeartIcon, MessageCircleIcon, MoreHorizontalIcon } from "./icons";
import GroupCardList from "./cardList";
import { GLOBALTYPES } from "../../../redux/globalTypes";

export type CommentListProps = Omit<ListProps, "renderItem">;

export const CommentList = (props: any): React.ReactElement => {
  const renderCommentHeader = (comment: any): React.ReactElement => (
    <View style={styles.commentHeader}>
      <Avatar source={{ uri: GLOBALTYPES.imageLink + comment.image }} />
      <View style={styles.commentAuthorContainer}>
        <Text category="s2">
          {comment.first_name + " " + comment.last_name}
        </Text>
        <Text appearance="hint" category="c1">
          {moment(comment.time).fromNow()}
        </Text>
      </View>
      <Button
        style={styles.iconButton}
        appearance="ghost"
        status="basic"
        accessoryLeft={MoreHorizontalIcon}
      />
    </View>
  );

  return (
    <List
      {...props}
      renderItem={(info) => (
        <GroupCardList info={info} navigation={props.navigation} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  commentItem: {
    marginVertical: 4,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  commentHeader: {
    flexDirection: "row",
    padding: 16,
  },
  postBody: {
    marginHorizontal: 16,
    marginTop: 2,
    marginBottom: 2,
  },
  commentAuthorContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  commentReactionsContainer: {
    flexDirection: "row",
    padding: 8,
    marginHorizontal: -8,
    marginVertical: -8,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  stretch: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
});
