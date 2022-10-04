import React from "react";
import {
  Image,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
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
import { GLOBALTYPES } from "../../../redux/globalTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/configureStore";
import { refreshFeeds } from "../../../redux/features/feeds/refresh";

export type CommentListProps = Omit<ListProps, "renderItem">;

export const CommentList = (props: any): React.ReactElement => {
  const [onRefreshing, setOnRefreshing] = React.useState(false);
  
  const { refresh } = useSelector(
    (state: RootState) => state.user.refreshFeeds
  );
  const dispatch = useDispatch();

  const renderCommentHeader = (comment: any): React.ReactElement => (
    <View style={styles.commentHeader}>
      <Avatar source={{ uri: GLOBALTYPES.imageLink + comment.image }} />
      <TouchableOpacity
        onPress={() => props.navigation.navigate("PostUserProfile")}
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

  const renderItem = (info: any): React.ReactElement => (
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

  return (
    <List
      onRefresh={() => dispatch(refreshFeeds)}
      refreshing={refresh}
      {...props}
      renderItem={renderItem}
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
