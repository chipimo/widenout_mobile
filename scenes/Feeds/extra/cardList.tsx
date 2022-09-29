import React from "react";
import {
  Image,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Button, Divider, Text } from "@ui-kitten/components";
import moment from "moment";
import { HeartIcon, MessageCircleIcon, MoreHorizontalIcon } from "./icons";
import { GLOBALTYPES } from "../../../redux/globalTypes";

const CardList = (info: any, navigation: any): React.ReactElement => {
  const renderCommentHeader = (comment: any): React.ReactElement => (
    <View style={styles.commentHeader}>
      <Avatar source={{ uri: GLOBALTYPES.imageLink + comment.image }} />
      <TouchableOpacity
        onPress={() =>
          navigation.navigation.navigate("PostUserProfile", {
            userId: comment.uid,
          })
        }
        style={styles.commentAuthorContainer}
      >
        <Text category="h6">
          {comment.first_name + " " + comment.last_name}
        </Text>
        <Text appearance="hint" category="c1">
          {moment(comment.time).fromNow()}
        </Text>
      </TouchableOpacity>
      <Button
        style={styles.iconButton}
        appearance="ghost"
        status="basic"
        accessoryLeft={MoreHorizontalIcon}
      />
    </View>
  );

  return (
    <View style={styles.commentItem}>
      {renderCommentHeader(info.item)}
      <Divider />
      <View style={styles.postBody}>
        <Text>{info.item.message}</Text>
      </View>
      <View>
        {info.item.value !== "" ? (
          <Image
            resizeMode="contain"
            style={styles.stretch}
            source={{ uri: GLOBALTYPES.uploadsLink + info.item.value }}
          />
        ) : null}
      </View>
      <Divider />
      <View style={styles.commentReactionsContainer}>
        <Button
          style={styles.iconButton}
          appearance="ghost"
          status="basic"
          accessoryLeft={MessageCircleIcon}
        >
          {info.item.comments !== "0" ? `${info.item.comments}` : ``}
        </Button>
        <Button
          style={styles.iconButton}
          appearance="ghost"
          status="danger"
          accessoryLeft={HeartIcon}
        >
          {`${info.item.likes.length}`}
        </Button>
      </View>
    </View>
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

export default CardList;
