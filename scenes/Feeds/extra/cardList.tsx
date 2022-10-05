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
import Lightbox from "react-native-lightbox-v2";
import { HeartIcon, MessageCircleIcon, MoreHorizontalIcon } from "./icons";
import { GLOBALTYPES } from "../../../redux/globalTypes";
import { useGetPostCommentMutation } from "../../../services/dist/fetch.user.service";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/configureStore";
import { MaterialIcons } from "@expo/vector-icons";

const CardList = (props: any): React.ReactElement => {
  const { info, navigation } = props;
  const { user } = useSelector((state: RootState) => state.user.user);
  const [getPostComment, { isLoading, isError, status, error }] =
    useGetPostCommentMutation();
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    // console.log(user)
    getComment();
  }, []);

  const LightBoxHeader = ({ close }) => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={close}>
          <Text style={styles.closeButton}>×</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reportButton}>
          <MaterialIcons
            name="report"
            color="#ffff00"
            style={{ fontSize: 20 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const activeProps = {
    resizeMode: "contain",
    flex: 1,
    width: null,
  };

  const LightBoxImage = ({ source, style, ...others }) => (
    <Lightbox
      activeProps={activeProps}
      renderHeader={(close) => <LightBoxHeader close={close} {...others} />}
    >
      <Image style={style} source={source} resizeMode="contain" />
    </Lightbox>
  );

  const getComment = async () => {
    const post_id = info.item.id;
    const comment = await getPostComment({ post_id }).unwrap();

    setComments(comment);
    // console.log(comment);
  };

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

  const renderPostHeader = (comment: any): React.ReactElement => (
    <View style={styles.commentHeader}>
      <Avatar source={{ uri: GLOBALTYPES.imageLink + comment.image }} />
      <TouchableOpacity
        onPress={() =>
          navigation.navigation.navigate("PostUserProfile", {
            userId: comment.uid,
          })
        }
        style={styles.PostCommentContainer}
      >
        <Text appearance="hint" category="c1">
          Write a comment
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderPostComment = (comment: any): React.ReactElement => (
    <View style={styles.PostComment}>
      <Avatar source={{ uri: GLOBALTYPES.imageLink + comment.image }} />
      <TouchableOpacity
        onPress={() =>
          navigation.navigation.navigate("PostUserProfile", {
            userId: comment.uid,
          })
        }
        style={styles.PostCommentBody}
      >
        <Text appearance="hint" category="c1">
          {moment(comment.time).fromNow()}
        </Text>
        <Text category="h6">
          {comment.first_name + " " + comment.last_name}
        </Text>
        <Text>{comment.message}</Text>
      </TouchableOpacity>
      {/* <Button
        style={styles.iconButton}
        appearance="ghost"
        status="basic"
        accessoryLeft={MoreHorizontalIcon}
      /> */}
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
          <LightBoxImage
            style={styles.stretch}
            source={{
              uri: GLOBALTYPES.uploadsLink + info.item.value,
            }}
          />
        ) : // <Image
        //   resizeMode="contain"
        //   style={styles.stretch}
        //   source={{ uri: GLOBALTYPES.uploadsLink + info.item.value }}
        // />
        null}
      </View>
      <Divider />
      <View style={styles.commentReactionsContainer}>
        <Button
          style={styles.iconButton}
          appearance="ghost"
          status="basic"
          accessoryLeft={MessageCircleIcon}
        >
          {comments.length !== 0 ? `${comments.length}` : ``}
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
      {comments.length !== 0 ? <Divider /> : null}
      <View>
        {comments.map((list: any) => {
          return renderPostComment(list);
        })}
      </View>
      <Divider />
      <View>{renderPostHeader(user)}</View>
      {comments.length !== 0 ? (
        <View>
          <Button appearance="ghost" size="tiny">
            Show more comments
          </Button> 
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  commentItem: {
    marginVertical: 4,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  commentHeader: {
    flexDirection: "row",
    padding: 16,
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
  PostCommentContainer: {
    backgroundColor: "#EDEDED",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 16,
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reportButton: {
    color: "white",
    borderWidth: 1,
    borderColor: "white",
    padding: 4,
    borderRadius: 3,
    textAlign: "center",
    margin: 10,
    alignSelf: "flex-end",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 1.5,
    shadowColor: "black",
    shadowOpacity: 0.8,
  },
  closeButton: {
    fontSize: 35,
    color: "white",
    lineHeight: 40,
    width: 40,
    textAlign: "center",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 1.5,
    shadowColor: "black",
    shadowOpacity: 0.8,
  },
});

export default CardList;
