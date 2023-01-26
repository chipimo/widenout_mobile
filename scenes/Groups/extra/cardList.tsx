import React, { useRef } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  ImageStyle,
  TextInput,
  ScrollView,
} from "react-native";
import {
  Avatar,
  Button,
  Divider,
  Text,
  ButtonElement,
  IndexPath,
  OverflowMenu,
  OverflowMenuElement,
  MenuItem,
  IconElement,
  Spinner,
} from "@ui-kitten/components";
import moment from "moment";
import Toast from "react-native-root-toast";
import {
  DeleteIcon,
  EditIcon,
  Like1,
  Like2,
  Like1light,
  Like2light,
  MessageCircleIcon,
  MoreHorizontalIcon,
  SendIcon,
} from "./icons";
import BottomSheet from "react-native-gesture-bottom-sheet";
import ImageViewer from "react-native-image-zoom-viewer";

import { GLOBALTYPES } from "../../../redux/globalTypes";
import {
  useGetPostCommentMutation,
  usePostLikeMutation,
  useDelete_postMutation,
} from "../../../services/fetch.user.service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/configureStore";
import {
  refreshDone,
  refreshFeeds,
} from "../../../redux/features/feeds/refresh";
import { userFeeds } from "../../../redux/features/feeds";
import {
  useFeedsMutation,
  useUpdate_postMutation,
} from "../../../services/fetch.user.service";
import { KeyboardAvoidingView } from "./keyboard-avoiding-view.component";

export interface OverflowMenuItemType {
  title: string;
  accessoryLeft?: (style: ImageStyle) => IconElement;
  disabled?: boolean;
}

const GroupCardList = (props: any): React.ReactElement => {
  const { info, navigation } = props;
  const { user } = useSelector((state: RootState) => state.user.user);

  const [postLike, {}] = usePostLikeMutation();
  const [comments, setComments] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [likeing, setLikeing] = React.useState(false);

  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath>(null);
  const [getPostComment, { isLoading, isError, status, error }] =
    useGetPostCommentMutation();
  const [feeds] = useFeedsMutation();
  const [update_post] = useUpdate_postMutation();
  const [delete_post] = useDelete_postMutation();
  const bottomSheet = useRef();
  const dispatch = useDispatch();

  const toggleMenu = (): void => {
    setMenuVisible(!menuVisible);
  };

  const showToastMsg = (msg) => {
    let toast = Toast.show(msg, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };

  const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size="small" />
    </View>
  );

  const keyboardOffset = (height: number): number =>
    Platform.select({
      android: 0,
      ios: height,
    });

  React.useEffect(() => {
    getComment();
  }, []);

  const LightBoxHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Text style={styles.closeButton}>×</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const getFeeds = async () => {
    let user_id = user.idu;
    dispatch(refreshFeeds);

    const feedList = await feeds({ user_id }).unwrap();

    dispatch(userFeeds(feedList));
    dispatch(refreshDone);
  };

  const getComment = async () => {
    const post_id = info.item.id;
    const comment = await getPostComment({ post_id }).unwrap();

    setComments(comment);

    setImages([
      {
        url: GLOBALTYPES.uploadsLink + info.item.value,
        props: {
          // headers: ...
        },
      },
    ]);
  };

  const LikePost = async (id) => {
    setLikeing(true);
    let user_id = user.idu;
    let post = id;
    let type = 0;

    const like = await postLike({ user_id, post, type }).unwrap();

    getFeeds();

    setLikeing(false);
  };

  const UpdatePost = async () => {
    const id = info.item.id;
    let user_id = user.idu;

    const updatedPost = await update_post({ user_id, message, id }).unwrap();
    // console.log(updatedPost);
    if (updatedPost) {
      bottomSheet.current.close();
    showToastMsg('Updated')
  } else {
      showToastMsg('Error failed to updated')
    }
    getFeeds();
  };

  const DeletePost = async () => {
    const id = info.item.id;
    let user_id = user.idu;
    let type = 1;
    
    const updatedPost = await delete_post({ user_id, id, type }).unwrap();
    // console.log(updatedPost);
    
    getFeeds();
    showToastMsg('Deleted successfully')
  };

  const onSelect = (index: IndexPath, comment: any): void => {
    if (index.row === 0) {
      bottomSheet.current.show();
      setMessage(comment.message);
    } else if (1) {
      DeletePost();
    }
    setSelectedIndex(index);
    toggleMenu();
  };

  const renderButton = (): ButtonElement => (
    <Button
      onPress={toggleMenu}
      style={styles.iconButton}
      appearance="ghost"
      status="basic"
      accessoryLeft={MoreHorizontalIcon}
    />
  );

  const friendWithIconMenuItems: OverflowMenuItemType[] = [
    {
      title: "Report",
      accessoryLeft: EditIcon,
    },
  ];

  const withIconMenuItems: OverflowMenuItemType[] = [
    {
      title: "Edit",
      accessoryLeft: EditIcon,
    },
    {
      title: "Delete",
      accessoryLeft: DeleteIcon,
    },
  ];

  const renderData = withIconMenuItems.map((el, index) => (
    <MenuItem key={index} {...el} />
  ));

  const renderFriendData = friendWithIconMenuItems.map((el, index) => (
    <MenuItem key={index} {...el} />
  ));

  const renderCommentHeader = (comment: any): React.ReactElement => (
    <View style={styles.commentHeader}>
      <Avatar source={{ uri: GLOBALTYPES.imageLink + comment.image }} />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PostUserProfile", {
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

      <OverflowMenu
        visible={menuVisible}
        selectedIndex={selectedIndex}
        onSelect={(index) => onSelect(index, comment)}
        onBackdropPress={toggleMenu}
        anchor={renderButton}
      >
        {user.idu === comment.idu ? renderData : renderFriendData}
      </OverflowMenu>

      <BottomSheet hasDraggableIcon ref={bottomSheet} height={270}>
        <ScrollView style={styles.container}>
          <KeyboardAvoidingView offset={keyboardOffset}>
            <Text style={{ width: 200, paddingLeft: 15, paddingBottom: 6 }}>
              Edit Post
            </Text>
            <TextInput
              style={styles.commentInput}
              onChangeText={(msgValue) => setMessage(msgValue)}
              value={message}
              placeholder="Write Comment"
              multiline={true}
              numberOfLines={4}
            />
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={{ width: 200, padding: 15 }}>
          <Button
            accessoryLeft={loading ? LoadingIndicator : null}
            disabled={loading}
            onPress={UpdatePost}
            appearance="outline"
            status="basic"
          >
            <Text>Save Edit</Text>
          </Button>
        </View>
      </BottomSheet>
    </View>
  );

  const renderPostHeader = (comment: any): React.ReactElement => (
    <View style={styles.commentHeader}>
      <Avatar source={{ uri: GLOBALTYPES.imageLink + comment.image }} />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PostComments", {
            comments,
            post_id: info.item.id,
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

  const renderPostComment = (comment: any, index): React.ReactElement => (
    <View key={index} style={styles.PostComment}>
      <Avatar source={{ uri: GLOBALTYPES.imageLink + comment.image }} />
      <View
        style={styles.PostCommentBody}
      >
        <Text appearance="hint" category="c1">
          {moment(comment.time).fromNow()}
        </Text>
        <Text category="h6">
          {comment.first_name + " " + comment.last_name}
        </Text>
        <Text>{comment.message}</Text>
      </View>
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
          <TouchableOpacity
            activeOpacity={0.89}
            onPress={() => setVisible(true)}
          >
            <Image
              resizeMode="contain"
              style={styles.stretch}
              source={{ uri: GLOBALTYPES.uploadsLink + info.item.value }}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <Modal visible={visible} transparent={true}>
        <ImageViewer
          enableImageZoom
          onSaveToCamera={true}
          enableSwipeDown
          onSwipeDown={() => setVisible(false)}
          renderFooter={() => <LightBoxHeader />}
          imageUrls={images}
        />
      </Modal>
      <Divider />
      <View style={styles.commentReactionsContainer}>
        <Button
          onPress={() =>
            navigation.navigate("PostComments", {
              comments,
              post_id: info.item.id,
            })
          }
          style={styles.iconButton}
          appearance="ghost"
          status="basic"
          accessoryLeft={MessageCircleIcon}
        >
          {comments.length !== 0 ? `${comments.length}` : ``}
        </Button>
        <Button
          onPress={() => LikePost(info.item.id)}
          disabled={likeing}
          style={styles.iconButton}
          appearance="ghost"
          status="basic"
          accessoryLeft={
            info.item.likes != "0" ? (likeing ? Like1light : Like1) : Like2
          }
        >
          {info.item.likes != "0" ? `${info.item.likes}` : ``}
        </Button>
      </View>
      {comments.length !== 0 ? <Divider /> : null}
      <View>
        {comments.map((list: any, index) => {
          if (index < 2) return renderPostComment(list, index);
        })}
      </View>
      <Divider />
      <View>{renderPostHeader(user)}</View>
      {comments.length !== 0 ? (
        <View>
          <Button
            onPress={() =>
              navigation.navigate("PostComments", {
                comments,
              })
            }
            appearance="ghost"
            size="tiny"
          >
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
  commentInput: {
    backgroundColor: "#EDEDED",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 16,
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "background-basic-color-4",
    paddingBottom: 8,
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

export default GroupCardList;
