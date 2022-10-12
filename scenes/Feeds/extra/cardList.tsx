import React from "react";
import {
  Image,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  ImageStyle,
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
} from "@ui-kitten/components";
import moment from "moment";
import {
  DeleteIcon,
  EditIcon,
  Like1,
  Like2,
  Like1light,
  Like2light,
  MessageCircleIcon,
  MoreHorizontalIcon,
} from "./icons";
import { MaterialIcons } from "@expo/vector-icons";
import ImageViewer from "react-native-image-zoom-viewer";

import { GLOBALTYPES } from "../../../redux/globalTypes";
import {
  useGetPostCommentMutation,
  usePostLikeMutation,
} from "../../../services/dist/fetch.user.service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/configureStore";
import {
  refreshDone,
  refreshFeeds,
} from "../../../redux/features/feeds/refresh";
import { userFeeds } from "../../../redux/features/feeds";
import { useFeedsMutation } from "../../../services/fetch.user.service";

export interface OverflowMenuItemType {
  title: string;
  accessoryLeft?: (style: ImageStyle) => IconElement;
  disabled?: boolean;
}

const CardList = (props: any): React.ReactElement => {
  const { info, navigation } = props;
  const { user } = useSelector((state: RootState) => state.user.user);

  const [getPostComment, { isLoading, isError, status, error }] =
    useGetPostCommentMutation();
  const [postLike, {}] = usePostLikeMutation();
  const [comments, setComments] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [likeing, setLikeing] = React.useState(false);

  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath>(null);
  const [feeds] = useFeedsMutation();
  const dispatch = useDispatch();

  const toggleMenu = (): void => {
    setMenuVisible(!menuVisible);
  };

  const onSelect = (index: IndexPath): void => {
    setSelectedIndex(index);
    toggleMenu();
  };

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
    {
      title: "Public",
      accessoryLeft: DeleteIcon,
    },
    {
      title: "Friends",
      accessoryLeft: DeleteIcon,
    },
    {
      title: "Private",
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
        onSelect={onSelect}
        onBackdropPress={toggleMenu}
        anchor={renderButton}
      >
        {user.idu === comment.idu ? renderData : renderFriendData}
      </OverflowMenu>
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
        // onPress={() =>
        //   navigation.navigate("PostComments", {
        //     userId: comment.uid,
        //   })
        // }
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
      {/* <Button
        style={styles.iconButton}
        appearance="ghost"
        status="basic"
        accessoryLeft={MoreHorizontalIcon}
      /> */}
    </View>
  );

  const LikePost = async (id) => {
    setLikeing(true);
    let user_id = user.idu;
    let post = id;
    let type = 0;

    const like = await postLike({ user_id, post, type }).unwrap();

    dispatch(refreshFeeds);

    const feedList = await feeds({ user_id }).unwrap();

    dispatch(userFeeds(feedList));
    dispatch(refreshDone);

    setLikeing(false);
  };

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
