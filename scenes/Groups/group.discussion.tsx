import React from "react";
import {
  ImageBackground,
  Platform,
  View,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Button,
  Divider,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { KeyboardAvoidingView } from "./extra/keyboard-avoiding-view.component";
import { CommentList } from "./extra/comment-list.component";
import { CameraIcon, Joined, VideoIcon } from "./extra/icons";
import { useGetGroupFeedsMutation } from "../../services/fetch.user.service";
import { useDispatch, useSelector } from "react-redux";
import { userFeeds } from "../../redux/features/feeds";
import { RootState } from "../../redux/configureStore";
import { GLOBALTYPES } from "../../redux/globalTypes";

const keyboardOffset = (height: number): number =>
  Platform.select({
    android: 0,
    ios: height,
  });

export default ({ navigation }): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const [getGroupFeeds, { isLoading, isError, status, error }] =
    useGetGroupFeedsMutation();
  const { list } = useSelector((state: RootState) => state.user.feeds);
  const [groupComments, setGroupComments]= React.useState([])

  const dispatch = useDispatch();

  const state = navigation.getState();
  const { title, privacy, posts, members, description, id, cover } =
    state.routes[1].params;

  React.useEffect(() => {
    getFeeds();
  }, []);

  const getFeeds = async () => {
    let group_id = id;

    const groupFeed = await getGroupFeeds({ group_id }).unwrap();
    // console.log(groupFeed);
    setGroupComments(groupFeed);
    // dispatch(userFeeds(groupFeed));
  };

  const renderHeader = (): React.ReactElement => (
    <Layout style={styles.header} level="1">
      <View>
        <ImageBackground
          source={{ uri: GLOBALTYPES.coversLink + cover }}
          resizeMode="cover"
          style={styles.image}
        ></ImageBackground>
        <Divider />
        <View style={styles.headerText}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.text} category="h6">
              {title}
            </Text>
            <View
              style={{ flexDirection: "row", marginLeft: 10, marginTop: 2 }}
            >
              <Text style={styles.text} appearance="hint">
                {members != 1 ? `${members} members` : `${members} member`}
              </Text>
            </View>
          </View>
          <Text style={styles.text}>{description}</Text>
          <View style={{ width: "40%" }}>
            <Button
              size="tiny"
              disabled={false}
              onPress={() => {
                getFeeds();
              }}
              accessoryLeft={Joined}
            >
              {"Joined"}
            </Button>
          </View>
        </View>
        <Divider />
        <Divider />
        <Divider />
      </View>
      <Text style={styles.descriptionLabel} category="s1">
        Post in {title}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("PostStatus")}>
        {/* <Avatar source={require("../../../assets/images/20210507_164638.jpg")} /> */}
        <View style={styles.commentInput}>
          <Text appearance="hint">What's on your mind?</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.cardIconsList}>
        <Button
          onPress={getFeeds}
          style={styles.iconButton}
          appearance="ghost"
          status="basic"
          accessoryLeft={CameraIcon}
        />
        <Button
          style={styles.iconButton}
          appearance="ghost"
          status="basic"
          accessoryLeft={VideoIcon}
        />
        <Button
          style={styles.iconButton}
          appearance="ghost"
          status="basic"
          accessoryLeft={CameraIcon}
        />
      </View>
    </Layout>
  );

  return (
    <KeyboardAvoidingView style={styles.container} offset={keyboardOffset}>
      <CommentList
        style={styles.list}
        data={groupComments}
        ListHeaderComponent={renderHeader()}
      />
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "background-basic-color-4",
    paddingBottom: 8,
  },
  list: {
    backgroundColor: "background-basic-color-4",
    flex: 1,
  },
  cardIconsList: {
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  text: {
    margin: 2,
  },
  headerText: {
    padding: 2,
    paddingLeft: 10,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  header: {
    marginBottom: 8,
    borderColor: "background-basic-color-4",
    borderWidth: 1,
  },
  image: {
    height: 240,
  },
  titleLabel: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
  descriptionLabel: {
    margin: 24,
    marginBottom: 2,
  },
  contentLabel: {
    margin: 24,
  },
  authoringContainer: {
    flexDirection: "row",
    marginHorizontal: 24,
  },
  dateLabel: {
    marginHorizontal: 8,
  },
  commentInputLabel: {
    fontSize: 16,
    marginBottom: 2,
    color: "text-basic-color",
  },
  commentInput: {
    backgroundColor: "background-basic-color-3",
    borderColor: "background-basic-color-4",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 24,
    marginTop: 2,
    marginBottom: 2,
  },
});
